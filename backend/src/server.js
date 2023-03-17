import express from 'express';
import cors from 'cors';

const app = express(cors());

const port = 3001;

app.get('/sayhi', (req, res) => {
	// TODO: INSERT INTO requests (method, path, timestamp) VALUES (req.method, req.url, new Date().toISOString())
	console.log(`${req.method} ${req.url}`);
	res.send(`Hey There!`);
})

app.get('/requests', async (req, res) => {
	console.log(`${req.method} ${req.url}`);
	let requests = [
		{ method: 'GET', path: "/sayhi", timestamp: new Date().toISOString() },
		{ method: 'GET', path: "/sayhi", timestamp: new Date().toISOString() }
	];
	// TODO: SELECT * FROM requests;
	res.json(requests);
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
