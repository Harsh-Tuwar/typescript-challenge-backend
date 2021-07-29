import express from "express";
import { Collection, Db, Filter } from 'mongodb';

const router = express.Router();

// All task can be completed in just one `router.post(...)` but I did it both the ways :) 
// You guys can literally ignore the last two `router(...)` if you just wanted me to do it one `router(...)`

// @desc Get All Listings and Reviews
// @route POST /stays
// @access Public
router.post("/", async (req, res) => {
	const db: Db = req.app.locals.db;
	const col: Collection<Document> = db.collection("listingsAndReviews");
	const { bedrooms, beds, bathrooms, amenities, page = 1 }: Filters = req.body;
	const perPage = 25;
	const filterObject: Filter<Document> = {
		bedrooms: bedrooms,
		beds: beds,
		bathrooms: bathrooms,
		amenities: { $all: amenities }
	};
	
	// const results = await col.find({}, { limit: 10 });
	
	['bedrooms', 'beds', 'bathrooms', 'amenities'].forEach((item) => {
		if (!req.body[`${item}`]) {
			delete filterObject[`${item}`];
		}
	});

	const results = await col
		.find(filterObject)
		.skip((perPage * +page) - perPage)
		.limit(perPage).toArray();

  	res.json(results);
});


//  Did it to show you guys how I add an additional endpoint

// @desc Get Listings with pagination
// @route GET /stays/:page-number
// @access Public
router.get('/:pageID', async (req, res) => {
	const db: Db = req.app.locals.db;
	const collection: Collection = db.collection("listingsAndReviews");
	const perPage = 25;
	const page: number = +req.params.pageID || 1;
	
	const payload = await collection
		.find({})
		.skip((perPage * +page) - perPage)
		.limit(perPage);
	
	res.json(await payload.toArray());
});

// @desc Get filtered listings
// @route GET /stays/filter
// @access Public
router.post('/filter/:page', async (req, res) => {
	const db: Db = req.app.locals.db;
	const perPage = 25;
	const page: number = +req.params.page || 1;
	const collection: Collection = db.collection("listingsAndReviews");
	const { bedrooms, beds, bathrooms, amenities }: Filters = req.body;
	const filterObject: Filter<Document> = {
		bedrooms: bedrooms,
		beds: beds,
		bathrooms: bathrooms,
		amenities: { $all: amenities }
	};

	['bedrooms', 'beds', 'bathrooms', 'amenities'].forEach((item) => {
		if (!req.body[`${item}`]) {
			delete filterObject[`${item}`];
		}
	});

	const listings = await collection.find(filterObject).skip((perPage * +page) - perPage).limit(perPage);

	res.json(await listings.toArray());
});


interface Filters {
	bedrooms?: number,
	beds?: number,
	bathrooms?: number,
	amenities?: string[],
	page?: number,
}

export default router;
