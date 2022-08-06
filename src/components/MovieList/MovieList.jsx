import React from "react";
import Movie from "../Movie/Movie";

const MovieList = ({movies, numberOfMovies}) => {
  return (
    <div className="w-full  flex items-center justify-center  flex-wrap gap-8">
      {movies?.results.slice(0, numberOfMovies).map((movie, index) => {
        return <Movie key={index} movie={movie} index={index}/>;
      })}
    </div>
  );
};

export default MovieList;
