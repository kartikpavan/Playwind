import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useGetMovieQuery } from "../../services/TMDB";
import Spinner from "../Spinner/Spinner";

const MovieInformation = () => {
	const { id } = useParams();
	const { data, isFetching, error } = useGetMovieQuery(id);

	return (
		<div className="p-6">
			{error ? (
				<h1 className="text-2xl text-red-400">
					<Link to="/">
						Something went Wrong
						<span className="text-blue-600 italic font-semibold text-xl underline-offset-2 underline">
							Go back ?
						</span>
					</Link>
				</h1>
			) : isFetching ? (
				<Spinner />
			) : data ? (
				<div className="flex flex-col justify-around my-5 sm:flex-row flex-wrap">
					<div className="grid grid-cols-1 lg:grid-cols-3">
						<img
							src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
							alt={data?.original_title}
							className="rounded-2xl shadow-3xl w-[80%]"
						/>
						{data?.original_title}
					</div>
				</div>
			) : null}
		</div>
	);
};

export default MovieInformation;
