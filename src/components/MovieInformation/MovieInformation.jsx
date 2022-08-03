import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useGetMovieQuery } from "../../services/TMDB";
import Spinner from "../Spinner/Spinner";
import StarRatings from "react-star-ratings";
import genreIcons from "../../assets/genres";
import { selectGenre } from "../../features/CurrentGenre";

const MovieInformation = () => {
	const { id } = useParams();
	const { data, isFetching, error } = useGetMovieQuery(id);
	const dispatch = useDispatch();

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
				<div className="flex flex-col sm:flex-row justify-between gap-2  mb-[30px]">
					<div>
						{" "}
						<img
							src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
							alt={data?.original_title}
							className="rounded-2xl shadow-3xl w-40 h-auto  sm:w-[80%] mx-auto "
						/>
					</div>
					<div className="mx-auto w-10/12">
						<div className="text-center ">
							{/* Movie title and Tagline */}
							<div>
								<h1 className="text-4xl ">
									{data?.original_title} ({data?.release_date.split("-")[0]})
								</h1>
								<p className="mt-4">{data?.tagline}</p>
							</div>
							<div className="max-w-sm mx-auto mt-2">
								{/* Movie Rating , Runtime and Language */}
								<div className="flex items-center justify-between my-6">
									<div
										className="flex items-center flex-col justify-center
                   gap-0 sm:flex-row sm:gap-2 sm:items-end"
									>
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
							{/* genres  */}
							<div className="max-w-lg mx-auto ">
								<div className="flex flex-wrap items-center justify-evenly  gap-4 my-6">
									{data?.genres.map((genre) => {
										return (
											<Link
												key={genre.id}
												to="/"
												onClick={() => dispatch(selectGenre(genre.id))}
											>
												<div className="flex gap-2 items-center">
													<img
														src={genreIcons[genre.name.toLowerCase()]}
														alt={genre.name}
														className="w-8 "
													/>
													<p className="text-md underline-offset-2 underline decoration-cyan-500">
														{genre.name}
													</p>
												</div>
											</Link>
										);
									})}
								</div>
							</div>
							{/* overview */}
							<div className="max-w-2xl mx-auto my-4">
								<h1 className="text-2xl text-left py-2">Overview</h1>
								<p className="text-left text-sm">{data?.overview}</p>
							</div>
							{/* Cast */}
							<div className="max-w-2xl mx-auto mt-2">
								<h1 className="text-2xl my-4 text-left">Top Cast</h1>
								<div className="grid grid-cols-6 gap-x-2 gap-y-3">
									{data &&
										data?.credits?.cast
											.map(
												(item) =>
													item.profile_path && (
														<Link
															key={item.id}
															to={`/actors/${item.id}`}
														>
															<img
																src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
																alt={item.name}
																className=" max-w-[7em] h-[9em] w-full object-cover rounded-xl hover:scale-105 duration-150"
															/>
															<p className="text-sm">{item?.name}</p>
															<p className="text-sm text-gray-500">
																({item?.character.split("/")[0]})
															</p>
														</Link>
													)
											)
											.slice(0, 6)}
								</div>
								{/* Misc */}
								<div></div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default MovieInformation;
