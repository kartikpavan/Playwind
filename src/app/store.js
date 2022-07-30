import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
import genreReducer from "../features/CurrentGenre";
export default configureStore({
	reducer: {
		[tmdbApi.reducerPath]: tmdbApi.reducer,
		currentGenre: genreReducer,
	},
});
