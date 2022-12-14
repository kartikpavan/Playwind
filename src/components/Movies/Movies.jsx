import React, { useState, useEffect } from "react";
import { Spinner, MovieList, Pagination } from "../../components";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { selectGenre } from "../../features/CurrentGenre";

const Movies = () => {
	const [page, setPage] = useState(1);
	const { genreName, searchQuery } = useSelector((state) => state.currentGenre);
	const { data, error, isFetching } = useGetMoviesQuery({ genreName, page, searchQuery });
	console.log(data);

	if (!data?.results.length) {
		return (
			<div className="w-full flex item justify-center m-2">
				{isFetching ? <Spinner /> : <h1>No movies that match the name</h1>}
			</div>
		);
	}

	return (
		<div className="m-2">
			<h1 className="text-2xl ">
				{error ? (
					<h1 className="text-2xl text-red-400">There was an Error</h1>
				) : isFetching ? (
					<Spinner />
				) : data ? (
					<>
						<MovieList movies={data} />
					</>
				) : null}
			</h1>
			<div className=" my-6">
				<Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
			</div>
		</div>
	);
};

export default Movies;
