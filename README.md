# Docker Compose Sample Project

## Project Structure

### Frontend: 
	The Frontend is a simple VueJS app that has two functions:
	1) Sends a message to the `api/sayhi` endpoint
	2) Logs requests to `api/sayhi` at the `/requests` route

	To start the frontend app, navigate to the `/frontend` folder and run `npm run dev`.
	This will launch the Vite dev server and expose the client at the default address - `localhost:5173`
	** Note: the Vite dev server is configured to proxy all requests to `/api/*` to `localhost:3001`

### Backend:
	The Backend is a simple Express/NodeJS server that:
		- logs all incoming requests to `stdout`
		- returns a message in response to POST requests to `/sayhi`
		- attempts to add a db record for all requests to `/sayhi`
		- returns an array of all logged requests to `/sayhi` in response to a GET request to `/requests`
	
	To start the server, navigate to the `/backend` folder and run `npm run dev`
	This will launch the express server in watch mode using `nodemon` to respond at `localhost:3001`
