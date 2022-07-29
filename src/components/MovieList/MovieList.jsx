import React from "react";
import Movie from "../Movie/Movie";

const MovieList = ({ movies }) => {
	return (
		<div className="w-full m-2 flex items-center justify-center sm:justify-between flex-wrap overflow-auto gap-4">
			{movies.results.map((movie, index) => {
				return <Movie key={index} movie={movie} index={index} />;
			})}
		</div>
	);
};

export default MovieList;
