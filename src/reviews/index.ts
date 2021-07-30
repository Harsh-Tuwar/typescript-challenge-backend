import express from "express";
import { Collection, Db } from "mongodb";
import { Listing } from "../interfaces";

const router = express.Router();

// @desc Get All Reviews by id
// @route POST /reviews
// @access Public
router.post('/', async (req, res) => {
	const id: number | string = req.body.id;

	if (id === undefined || id === '') {
		return res.status(500).json({
			data: "Please provide an ID to get all the reviews."
		});
	}

	let db: Db;

	if (req.app.locals?.db) {
		db = req.app.locals.db;
	} else {
		return res.status(500).json({ error: 'Coundn\'t connect to the Database' });
	}
	
	const collection: Collection = db.collection("listingsAndReviews");

	const listingData: Listing[] = await collection.find({ "_id": id }).toArray();
	
	res.status(200).json({ reviews: listingData[0]?.reviews ?? [] });
});

export default router;