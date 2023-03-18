import express from 'express';
import cors from 'cors';
import { sql, createPool, NotFoundError } from 'slonik'
//INIT EXPRESS
const app = express();
const port = 3001;

// INIT DATABASE
const dbPool = await createPool('postgresql://postgres:password@database:5432/postgres');

dbPool.connect(async (connection) => {
	try {
		const result = await connection.query(sql.unsafe`CREATE TABLE IF NOT EXISTS requests (id SERIAL PRIMARY KEY, method TEXT, path TEXT, timestamp TIMESTAMP, uastring TEXT)`);
	} catch (e) {
		console.log(`Error initializing db: ${e}`)
	}
});

// MIDDLEWARE
app.use(cors());

// ROUTES
/**
 * Writes a new 'greeting' request to db 
 */
app.get('/sayhi', (req, res) => {
	// log request
	console.log(`${req.method} ${req.url}`);

	// persist request 
	if (dbPool) {
		dbPool.query(
			sql.type('int')`INSERT INTO requests(method, path, timestamp) 
		VALUES(${req.method}, ${req.url}, ${new Date().toISOString()})`
		);
	}

	// response
	res.send(`Hey There!`);
})

/**
 * Returns all stored sayHi requests
 */
app.get('/requests', async (req, res) => {
	console.log(`${req.method} ${req.url}`);
	try {
		let requests = await dbPool.many(sql.type('array')`SELECT * FROM requests`)
		res.json(requests);
	} catch (e) {
		if (e instanceof NotFoundError) {
			res.json([]);
		} else {
			res.json({ "error": e })
		}
	}
})

// START SERVER
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
