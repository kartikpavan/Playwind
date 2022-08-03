import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useGetMovieQuery } from "../../services/TMDB";
import Spinner from "../Spinner/Spinner";
import StarRatings from "react-star-ratings";

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
				<div className="flex flex-col justify-around  sm:flex-row flex-wrap">
					<div className="grid grid-cols-1 lg:grid-cols-4 mb-[30px]">
						<img
							src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
							alt={data?.original_title}
							className="rounded-2xl shadow-3xl w-52 h-auto  sm:h-full sm:w-[80%] mx-auto "
						/>
						<div className="col-span-3 text-center">
							<div>
								<h1 className="text-4xl ">
									{data?.original_title} ({data?.release_date.split("-")[0]})
								</h1>
								<p className="mt-2">{data?.tagline}</p>
							</div>
							<div className="max-w-sm mx-auto mt-2">
								<div className="flex items-center justify-between">
									<div className="flex items-end gap-2 ">
										<StarRatings
											rating={data?.vote_average / 2}
											starRatedColor={"rgb(255, 165, 0)"}
											starDimension={"25px"}
											starSpacing={"0px"}
										/>
										<p className=" text-gray-600">
											{data?.vote_average.toFixed(1)}/10
										</p>
									</div>
									<div className="font-semibold">
										{data?.runtime} mins /{" "}
										{data?.spoken_languages.length > 0
											? data?.spoken_languages[0].name
											: "N/a"}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default MovieInformation;
