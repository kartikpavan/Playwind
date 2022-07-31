import { createSlice } from "@reduxjs/toolkit";

export const genre = createSlice({
	name: "genre",
	initialState: {
		genreName: "",
		page: 1,
		searchQuery: "",
	},
	reducers: {
		selectGenre: (state, action) => {
			console.log(action.payload); // Payload here is the genre id
			state.genreName = action.payload;
			state.searchQuery = "";
		},
		searchMovie: (state, action) => {
			console.log(action.payload); // here the payload is the search query
			state.searchQuery = action.payload;
		},
	},
});

export const { selectGenre, searchMovie } = genre.actions;
export default genre.reducer;
