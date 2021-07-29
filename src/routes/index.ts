import { Express } from 'express';
import * as Home from '../home';

// Usually I like to add all my routes in this file and access/debug their corresponding functions (just like line 11-16)
// from this one file only

export const InitRoutes = (app: Express) => {
	// Home
	app.get('/', Home.Init);

	// Stays
	// app.post('/stays', Stays.GetAllListings);
	// app.get('/stays/:pageID', Stays.GetListsings_ByPageID);
	// app.post('/stays/filter/:pageID', Stays.GetFilteredListings_ByPageID);
	
	// Reviews
	// app.post('/'reviews', Reviews.GetReviews_ByPageID);
}