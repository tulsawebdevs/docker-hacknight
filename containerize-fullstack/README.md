# Docker Compose Sample Project

## Project Structure

### Frontend: 
The Frontend is a simple VueJS app that has two functions:
1) Sends a message to the `api/sayhi` endpoint
2) Logs requests to `api/sayhi` at the `/requests` route

To start the frontend app: 
- navigate to the `/frontend` folder 
- run `npm run dev`.

This will launch the Vite dev server and expose the client at the default address - `localhost:5173`
** Note: the Vite dev server is configured to proxy all requests to `/api/*` to `localhost:3001`

### Backend:
The Backend is a simple Express/NodeJS server that:
- logs all incoming requests to `stdout`
- returns a message in response to POST requests to `/sayhi`
- attempts to add a db record for all requests to `/sayhi`
- returns an array of all logged requests to `/sayhi` in response to a GET request to `/requests`
	
To start the server: 
- navigate to the `/backend` folder 
- run `npm run dev`

This will launch the express server in watch mode using `nodemon` to respond at `localhost:3001`

## Advanced Challenge Suggestions:
- Currently all the environment config (ports, proxy, database host, etc) are all hard coded in the hinted Dockerfiles and Docker Compose config. Can you reconfigure the project to use environment variables instead of the hard coded values? 
- Currently the 'completed' project only utilizes a single database instance. Can you add a second db container or db instance for testing purposes that can be refreshed on each test run and toggle which db is used based on an environment variable ? (eg. APP_ENV = 'local' vs 'testing' or similar)
- The project is setup with Cypress for e2e testing and Vitest for unit/integration testing. Can you add some tests? 
- This project was kept super simple to focus on the container orchestration rather than the app itself. Feel free to add some features or hack on it in any way you find fun/educational! 
