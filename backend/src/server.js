const express = require('express');
const cors = require('cors');

const app = express(cors());

const port = 3001;

app.get('/sayhi', (req, res) => {
	console.log(`${req.method} ${req.url}`);
	res.send(`Hey There!`);
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
