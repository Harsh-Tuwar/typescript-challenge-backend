// Dep imports
import express from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';

import { connect } from "./db";

// File imports
import { InitRoutes } from "./routes";
import Stays from "./stays";
import Reviews from "./reviews";

// config env
dotenv.config();

// good to use process.env.PORT as not all servers runs on 3000, for example Heroku uses 5000
const port = process.env.PORT || 3000;
const app = express();

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
// convert req.body in json
app.use(bodyParser.json());

// Connect once and store the db instance in app.locals
connect()
	.then((db) => {
		console.info('Mongo connection established!');
		app.locals.db = db;
	})
	.catch((err) => console.log('Error connecting Mongo', err))
	.finally(() => {
		// DB error
		// Init all routes :-> I prefer this way as this keeps my index.ts clean but Tyler's way is cool too :)
		InitRoutes(app); // Using it for Home route that will render README.md file...

		// Endpoints for Stays and Reviews
		app.use("/stays", Stays);
		app.use("/reviews", Reviews);

		app.listen(port, () => {
			console.info(`server started at http://localhost:${port}`);
		});
	});
