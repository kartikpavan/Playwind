//RTK Query
// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_MOVIE_API_KEY;

// https://api.themoviedb.org/3/movie/popular?api_key=API_KEY&language=en-US&page=1

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({baseUrl: "https://api.themoviedb.org/3"}),
  endpoints: (builder) => ({
    // Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    // Get Movies by [type]
    getMovies: builder.query({
      query: ({genreName, page, searchQuery}) => {
        // get Movies by search
        if (searchQuery) {
          return `search/movie?api_key=${tmdbApiKey}&page=${page}&query=${searchQuery}`;
        }

        // get Movies by category like popular , trending etc
        if (genreName && typeof genreName === "string") {
          return `movie/${genreName}?api_key=${tmdbApiKey}&page=${page}}`;
        }
        // Get movies by genre like comedy, thriller etc
        if (genreName && typeof genreName === "number") {
          return `discover/movie?api_key=${tmdbApiKey}&with_genres=${genreName}&page=${page}`;
        }
        // we need this to fetch popular movies coz at start no genre/category is selected by the user hence it will be our home page
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    //Get A particular movie
    getMovie: builder.query({
      query: (id) => {
        return `movie/${id}?api_key=${tmdbApiKey}&append_to_response=videos,credits`;
      },
    }),
    // Get movie recommended list
    getRecommendations: builder.query({
      query: ({movieId, list}) => {
        return `movie/${movieId}/recommendations?api_key=${tmdbApiKey}`;
      },
    }),
    // get Actor
    getActor: builder.query({
      query: (actorId) => {
        return `person/${actorId}?api_key=${tmdbApiKey}`;
      },
    }),
    // get Movies by Actor
    getMoviesByActorId: builder.query({
      query: ({id, page}) => {
        return `discover/movie?api_key=${tmdbApiKey}&page=${page}&with_cast=${id}`;
      },
    }),
    // Get list of Favorite movies and Watchlist items
    getList: builder.query({
      query({listName, session_id, accountId, page}) {
        return `account/${accountId}/${listName}?api_key=${tmdbApiKey}&page=${page}&session_id=${session_id}`
      }
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery
} = tmdbApi;
