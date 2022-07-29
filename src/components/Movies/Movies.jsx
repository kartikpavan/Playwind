import React, { useState, useEffect } from "react";
import { Spinner, MovieList } from "../../components";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";

const Movies = () => {
	const { data, error, isLoading } = useGetMoviesQuery();

	console.log(data);

	// if (data.results.length) {
	// 	return (
	// 		<div className="w-full flex item justify-center m-2">
	// 			<h1>No movies that match the name</h1>
	// 			<br />
	// 		</div>
	// 	);
	// }

	return (
		<div className="m-2">
			<h1 className="text-2xl ">
				{error ? (
					<h1 className="text-2xl text-red-400">There was an Error</h1>
				) : isLoading ? (
					<Spinner />
				) : data ? (
					<>
						<MovieList movies={data} />
					</>
				) : null}
			</h1>
		</div>
	);
};

export default Movies;
