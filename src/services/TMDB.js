//RTK Query
// Need to use the React-specific entry point to import createApi

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_MOVIE_API_KEY;
const page = 1; //! dummy variable

// https://api.themoviedb.org/3/movie/popular?api_key=API_KEY&language=en-US&page=1

export const tmdbApi = createApi({
	reducerPath: "tmdbApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
	endpoints: (builder) => ({
		//* Get Movies by [type]
		getMovies: builder.query({
			query: () => `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMoviesQuery } = tmdbApi;
