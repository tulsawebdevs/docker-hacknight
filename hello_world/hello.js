import chalk from 'chalk'
import { setMaxIdleHTTPParsers } from 'http';
import pg from 'pg';

async function main() {
	const client = new pg.Client({
		connectionString: `postgres://postgres:password@${process.env.DB_HOST}:5432/postgres`
	});
	await client.connect();	

	setInterval(async () => {
		const res = await client.query(`SELECT message from messages ORDER BY random() LIMIT 1`)
		const msg = res.rows[0].message
		console.log(chalk.blue(msg));
	}, 2000)
}

await main();
