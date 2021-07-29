import express from "express";
import { Collection, Db, Filter } from 'mongodb';
import { Filters, Listing } from '../interfaces';

const PER_PAGE: number = 25;
const FILTER_ITEMS = ['bedrooms', 'beds', 'bathrooms', 'amenities'];

const router = express.Router();

// All task can be completed in just one `router.post(...)` but I did it both the ways :) 
// You guys can literally ignore the last two `router(...)` if you just wanted me to do it one `router(...)`

// @desc Get All Listings and Reviews
// @route POST /stays
// @access Public
router.post("/", async (req, res) => {
	const db: Db = req.app.locals.db;
	const col: Collection<Document> = db.collection("listingsAndReviews");
	const { bedrooms, beds, bathrooms, amenities }: Filters = req.body;
	let { page = 1 } = req.body;
	const filterObject: Filter<Document> = {
		bedrooms: bedrooms,
		beds: beds,
		bathrooms: bathrooms,
		amenities: { $all: amenities }
	};
	
	// const results = await col.find({}, { limit: 10 });
	
	FILTER_ITEMS.forEach((item) => {
		if (!req.body[`${item}`]) {
			delete filterObject[`${item}`];
		}
	});

	if (Number(page) < 0) {
		page = 1;
	}

	const results: Listing[] = await col
		.find(filterObject)
		.skip((PER_PAGE * +page) - PER_PAGE)
		.limit(PER_PAGE).toArray();

  	res.json(results);
});


//  Did it to show you guys how I add an additional endpoint

// @desc Get Listings with pagination
// @route GET /stays/:page-number
// @access Public
router.get('/:pageID', async (req, res) => {
	const db: Db = req.app.locals.db;
	const collection: Collection = db.collection("listingsAndReviews");
	const page: number = +req.params.pageID || 1;
	
	const payload: Listing[] = await collection
		.find({})
		.skip((PER_PAGE * +page) - PER_PAGE)
		.limit(PER_PAGE).toArray();
	
	res.json(payload);
});

// @desc Get filtered listings
// @route GET /stays/filter/:page
// @access Public
router.post('/filter/:page', async (req, res) => {
	const db: Db = req.app.locals.db;
	const page: number = +req.params.page || 1;
	const collection: Collection = db.collection("listingsAndReviews");
	const { bedrooms, beds, bathrooms, amenities }: Filters = req.body;
	const filterObject: Filter<Document> = {
		bedrooms: bedrooms,
		beds: beds,
		bathrooms: bathrooms,
		amenities: { $all: amenities }
	};

	FILTER_ITEMS.forEach((item) => {
		if (!req.body[`${item}`]) {
			delete filterObject[`${item}`];
		}
	});

	const listings: Listing[]= await collection.find(filterObject).skip((PER_PAGE * +page) - PER_PAGE).limit(PER_PAGE).toArray();

	res.json(listings);
});

export default router;
