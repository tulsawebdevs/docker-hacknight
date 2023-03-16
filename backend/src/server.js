import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors);

const port = 3001;

app.get('/', (req, res) => {
	console.log(req);
	res.send(`Hey There!`);
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
