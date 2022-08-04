import React from "react";
import { BsGlobe, BsHeartFill, BsHeart, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { FaImdb } from "react-icons/fa";
import { MdExposurePlus1, MdOutlineRemove } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useGetMovieQuery, useGetRecommendationsQuery } from "../../services/TMDB";
import Spinner from "../Spinner/Spinner";
import StarRatings from "react-star-ratings";
import genreIcons from "../../assets/genres";
import { selectGenre } from "../../features/CurrentGenre";
import moment from "moment";
import MovieList from "../MovieList/MovieList";

const MovieInformation = () => {
	const { id } = useParams();
	const { data, isFetching, error } = useGetMovieQuery(id);
	const {
		data: recommendations,
		isFetching: fetchingRecommendations,
		error: recommendationError,
	} = useGetRecommendationsQuery({ list: "/recommendations", movieId: id });
	const dispatch = useDispatch();

	const isMovieFavorited = true; //! dummy variable remove it later
	const isMovieWatchListed = true; //! dummy variable remove it later

	const addToFavorites = () => {};
	const addToWatchList = () => {};
	console.log(recommendations);
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
				<div>
					<div className="flex flex-col sm:flex-row justify-between gap-2 ">
						<div>
							{" "}
							<img
								src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
								alt={data?.original_title}
								className="rounded-2xl shadow-3xl w-full h-auto sm:w-[90%] mx-auto "
							/>
						</div>
						<div className="mx-auto w-full md:w-9/12">
							<div className="text-center ">
								{/* Movie title and Tagline */}
								<div>
									<h1 className="text-5xl mt-2">
										{data?.original_title} ({data?.release_date.split("-")[0]})
									</h1>
									<p className="mt-4 text-lg">{data?.tagline}</p>
								</div>
								<div className="max-w-lg mx-auto mt-2">
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
										<div className="italic text-lg">
											{data?.runtime} mins /
											{moment(data?.release_date).format("MMM Do YYYY")} /
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
															src={
																genreIcons[genre.name.toLowerCase()]
															}
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
								<div className="max-w-3xl mx-auto my-4">
									<h1 className="text-2xl text-left py-2">Overview</h1>
									<p className="text-left text-sm">{data?.overview}</p>
								</div>
								{/* Cast */}
								<div className="max-w-3xl mx-auto mt-2">
									<h1 className="text-2xl my-4 text-left">Top Cast</h1>
									<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-3">
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
																<p className="text-sm">
																	{item?.name}
																</p>
																<p className="text-sm text-gray-500">
																	({item?.character.split("/")[0]}
																	)
																</p>
															</Link>
														)
												)
												.slice(0, 6)}
									</div>
									{/* Misc */}
									<div className="max-w-4xl w-full mx-auto mt-6 flex flex-col sm:flex-row justify-between">
										<div className="grid grid-cols-1 ">
											<div className=" btn-group">
												<button className="btn btn-sm  btn-accent btn-outline gap-2">
													<a
														href={data?.homepage}
														target="blank"
														rel="noopener noreferrer"
													>
														Website
													</a>
													<BsGlobe />
												</button>
												<button className="btn btn-sm  btn-accent btn-outline gap-2">
													<a
														href={`https://www.imdb.com/title/${data?.imdb_id}`}
														target="blank"
														rel="noopener noreferrer"
													>
														IMDB
													</a>
													<FaImdb />
												</button>
												<button
													className="btn btn-sm  btn-accent btn-outline gap-2"
													onClick={() => {
														document.getElementById(
															"my-modal-4"
														).checked = true;
													}}
												>
													Trailer
													<BiCameraMovie />
												</button>
											</div>
										</div>
										<div className="grid grid-cols-1 ">
											<div className="btn-group">
												<button
													className="btn btn-sm  btn-accent btn-outline gap-2"
													onClick={addToFavorites}
												>
													{isMovieFavorited ? "UnFavorite" : "Favorite"}
													{isMovieFavorited ? (
														<BsHeart />
													) : (
														<BsHeartFill />
													)}
												</button>
												<button
													className="btn btn-sm  btn-accent btn-outline gap-2"
													onClick={addToWatchList}
												>
													Watchlist
													{isMovieWatchListed ? (
														<MdOutlineRemove />
													) : (
														<MdExposurePlus1 />
													)}
												</button>
												<button
													className="btn btn-sm  btn-accent btn-outline gap-2"
													onClick={() => {}}
												>
													<Link
														to="/"
														className="flex items-center gap-2"
													>
														<p>Back</p>
														<BsFillArrowLeftCircleFill />
													</Link>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full mt-10 ">
						<h1 className="text-center text-4xl"> You might also like</h1>
						{/* Loop through recommended movies. */}
						{recommendationError ? (
							<h1 className="text-2xl text-red-500">
								{" "}
								Something went wrong <br /> No movies to recomment at this moment ,
								Please try again later{" "}
							</h1>
						) : fetchingRecommendations ? (
							<Spinner />
						) : recommendations ? (
							<MovieList movies={recommendations} numberOfMovies={12} />
						) : null}
					</div>

					{/* <!-- Put this part before </body> tag --> */}
					<input type="checkbox" id="my-modal-4" className="modal-toggle" />
					<label for="my-modal-4" className="modal cursor-pointer">
						<label
							className="modal-box relative w-full max-w-4xl h-1/2 sm:h-2/3 p-0 "
							for=""
						>
							{data?.videos?.results.length > 0 ? (
								<iframe
									autoPlay
									title="Trailer"
									src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}`}
									allow="autplay"
									className="w-full h-full"
									allowFullScreen
								/>
							) : (
								<p className="text-3xl text-center font-semibold mt-32">
									{" "}
									Sorry No Movie trailers were listed for{" "}
									<span className="underline text-blue-500">
										{data?.title}
									</span>{" "}
									in our Database
								</p>
							)}
						</label>
					</label>
				</div>
			) : null}
		</div>
	);
};

export default MovieInformation;
