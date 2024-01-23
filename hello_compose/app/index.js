import express from "express";
import * as redis from "redis";
import * as db from "mariadb";

/** Use the `env` section in `docker-compose.yml` to configure these values */
const DB_URL = process.env.DB_URL;
const REDIS_URL = process.env.REDIS_URL;
const PORT = process.env.PORT || 3000;

/** @type {import("redis").RedisClientType} */
let redisClient;

/** @type {import("mariadb").Connection} */
let dbClient;

const app = express().use(express.urlencoded({ extended: true }));

/** @type {import("express-serve-static-core").Handler} */
const assertDb = (req, res, next) => {
  if (!dbClient) {
    console.log("I need a Database to work!");
    res.status(500).send("DB not connected");
    return;
  }

  next();
};

app.get("/", async (req, res) => {
  const contacts = [];
  const dbConnected = !!dbClient;

  console.log("Hello, visitor!");

  /** @type {Error} */
  let error;

  if (dbConnected) {
    await dbClient.query("SELECT name FROM phonebook").then(
      /** @param {{ name: string }[]} rows  */
      (rows) => {
        for (const { name } of rows) {
          contacts
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
            .push(`<li><a href="/${name}">${name}</a></li>`);
        }
      },
      (err) => {
        console.log(err);
        error = err;
      }
    );
  }

  if (error) {
    res.status(500).send(`Error: ${error.message}`);
    return;
  }

  const html = dbConnected
    ? `<ul>${contacts.join("")}</ul>`
    : "DB not connected";

  return res.send(
    render({
      title: "phonebook",
      body: `<h1>Phonebook</h1>
    <form>
      <label for="name">Name:</label>
      <br />
      <input type="text" id="name" name="name" value="John" />
      <br />
      <label for="phone">Phone:</label>
      <br />
      <input type="text" id="phone" name="phone" value="555-555-5555" />
      <br />
      <br />
      <button type="button" id="submit">Submit</button>
    </form>
    <h2>Contacts</h2>
    ${html}`,
      script: `const submit = async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const response = await fetch(\`/\${name}\`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: \`phone=\${phone}\`,
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert(
          \`Error: \${response.status} \${
            response.statusText
          }\\\n\\\n\${await response.text()}\`
        );
      }
    };

    window.addEventListener("load", () => {
      document.getElementById("submit").addEventListener("click", submit);
    });`,
    })
  );
});

app.use(assertDb).get("/:name", async (req, res) => {
  const { name } = req.params;

  /** @type {Error} */
  let error;
  let value;
  let isFromCache = false;

  if (redisClient) {
    // get the value from the cache, if available
    const cachedValue = await redisClient.get(name);

    if (cachedValue !== null) {
      isFromCache = true;
      value = cachedValue;
    }
  }

  value ??= await dbClient
    .query("SELECT * FROM phonebook WHERE name=?", [name])
    .then(
      /** @param {{ name: string; phone: string }[]} rows  */
      (rows) => {
        if (rows.length) {
          const { name, phone } = rows[0];

          if (redisClient && !isFromCache) {
            redisClient.set(name, phone);
          }

          return phone;
        }
      },
      (err) => {
        console.log(err);
        error = err;
      }
    );

  // if we have an error, send it
  if (error) {
    res.status(500).send(`Error: ${error.message}`);
    return;
  }

  if (!value) {
    res.status(404).send("Not found");
    return;
  }

  const timeout = setTimeout(
    () =>
      res.send(
        render({
          title: `${name} - phonebook`,
          body: `<h1>Phonebook</h1>
          <h2>${name}</h2>
          <p>Phone: ${value}</p>
          <p>Served from cache: ${isFromCache}</p>
          <a href="/">
            <button type="button">Home</button>
          </a>`,
        })
      ),
    isFromCache ? 0 : 3000
  );

  function cleanup() {
    clearTimeout(timeout);
    error = undefined;
    value = undefined;
    isFromCache = false;
    res.removeListener("close", cleanup);
    res.removeListener("finish", cleanup);
    res.removeListener("error", cleanup);
    res.removeListener("end", cleanup);
  }

  res.on("close", cleanup);
  res.on("finish", cleanup);
  res.on("error", cleanup);
  res.on("end", cleanup);
});

app.use(assertDb).post("/:name", async (req, res) => {
  const { name } = req.params;
  const { phone } = req.body;

  dbClient
    .query(
      "INSERT INTO phonebook (name, phone) VALUES (?, ?) ON DUPLICATE KEY UPDATE phone=?",
      [name, phone, phone]
    )
    .then(() => {
      console.log(`Added ${name} with phone ${phone}`);
      res.send("OK");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Error: ${err.message}`);
    });
});

app.listen(PORT, async () => {
  if (REDIS_URL) {
    redisClient = redis.createClient({ url: REDIS_URL });

    redisClient.on("error", (err) => {
      console.log("Error " + err);
    });

    redisClient.on("ready", () => {
      console.log("Redis is ready");
    });

    await redisClient.connect();
  } else {
    console.log("REDIS_URL not set, skipping Redis connection");
  }

  if (DB_URL) {
    while (!dbClient) {
      let timeout;
      try {
        dbClient = await db.createConnection(DB_URL);
      } catch (err) {
        console.log("DB not ready, retrying in 5s");
        timeout = await new Promise((resolve) => setTimeout(resolve, 5000));
      } finally {
        clearTimeout(timeout);
      }
    }

    dbClient.on("error", (err) => {
      console.log("Error " + err);
    });

    console.log("DB is ready");

    await dbClient.query(
      "CREATE TABLE IF NOT EXISTS phonebook (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), phone VARCHAR(255))"
    );
  } else {
    console.log("DB_URL not set, skipping DB connection");
  }

  console.log("Example app listening on port 3000!");
});

/**
 *
 * @param {object} param0
 * @param {string} param0.title
 * @param {string} param0.body
 * @param {string} [param0.script=""]
 * @returns {string}
 */
function render({ title, body, script = "" }) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>${title}</title>
    </head>
    <body>
      <script>${script}</script>
      ${body}
    </body>
    <style>
      body {
        font-family: sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      input {
        margin-bottom: 10px;
      }
      button {
        margin-bottom: 10px;
      }
      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      ul {
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      li {
        list-style: none;
      }
    </style>
  </html>
  `;
}
