import {configureStore} from "@reduxjs/toolkit";
import {tmdbApi} from "../services/TMDB";
import genreReducer from "../features/CurrentGenre";
import userReducer from '../features/auth.js'

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenre: genreReducer,
    user: userReducer
  },
});
