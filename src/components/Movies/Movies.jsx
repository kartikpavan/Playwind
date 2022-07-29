import React, { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";

const Movies = () => {
	const { data, error, isLoading } = useGetMoviesQuery();

	console.log(data);
	return (
		<div className="m-2">
			<h1 className="text-2xl ">
				{error ? (
					<h1 className="text-2xl text-red-400">There was an Error</h1>
				) : isLoading ? (
					<Spinner />
				) : data ? (
					<>
						<h1 className="text-xl">
							{data.results.map((item) => {
								return <div key={item.id}>{item.title}</div>;
							})}
						</h1>
					</>
				) : null}
			</h1>
		</div>
	);
};

export default Movies;
