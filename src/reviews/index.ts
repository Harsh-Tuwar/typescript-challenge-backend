import express from "express";
import { Collection, Db } from "mongodb";

const router = express.Router();

// @desc Get All Reviews by id
// @route POST /reviews
// @access Public
router.post('/', async (req, res) => {
	const id = req.body.id;

	if (id === undefined || id === '') {
		return res.status(500).json({
			data: "Please provide an ID to get all the reviews."
		});
	}

	const db: Db = req.app.locals.db;
	const collection: Collection = db.collection("listingsAndReviews");

	const listingData = await collection.find({ "_id": id }).toArray();
	
	res.status(200).json({ reviews: listingData[0]?.reviews ?? [] });
});

export default router;