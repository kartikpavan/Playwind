import React, { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill, BsGlobe, BsHeart, BsHeartFill } from "react-icons/bs";
import { FaImdb } from "react-icons/fa";
import { MdExposurePlus1, MdOutlineRemove } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetListQuery, useGetMovieQuery, useGetRecommendationsQuery } from "../../services/TMDB";
import Spinner from "../Spinner/Spinner";
import StarRatings from "react-star-ratings";
import genreIcons from "../../assets/genres";
import { selectGenre } from "../../features/CurrentGenre";
import moment from "moment";
import MovieList from "../MovieList/MovieList";
import axios from "axios";
import { userSelector } from "../../features/auth.js";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MovieInformation = () => {
	const { id } = useParams();
	const { user } = useSelector(userSelector);
	const dispatch = useDispatch();

	const { data, isFetching, error } = useGetMovieQuery(id);

	const {
		data: recommendations,
		isFetching: fetchingRecommendations,
		error: recommendationError,
	} = useGetRecommendationsQuery({ list: "/recommendations", movieId: id });

	const { data: favoriteMovies } = useGetListQuery({
		listName: "favorite/movies",
		session_id: localStorage.getItem("session_id"),
		accountId: user.id,
		page: 1,
	});
	const { data: watchlistMovies } = useGetListQuery({
		listName: "watchlist/movies",
		session_id: localStorage.getItem("session_id"),
		accountId: user.id,
		page: 1,
	});

	// Making api calls to the TMBD Account
	const [isMovieFavorite, setIsMovieFavorite] = useState(false);
	const [isMovieWatchlist, setIsMovieWatchlist] = useState(false);
	const addToFavorites = async () => {
		await axios.post(
			`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
				import.meta.env.VITE_MOVIE_API_KEY
			}&session_id=${localStorage.getItem("session_id")}`,
			{
				media_type: "movie",
				media_id: id,
				favorite: !isMovieFavorite,
			}
		);
		setIsMovieFavorite((toggle) => !toggle);
	};
	const addToWatchList = async () => {
		await axios.post(
			`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
				import.meta.env.VITE_MOVIE_API_KEY
			}&session_id=${localStorage.getItem("session_id")}`,
			{
				media_type: "movie",
				media_id: id,
				watchlist: !isMovieWatchlist,
			}
		);
		setIsMovieWatchlist((toggle) => !toggle);
	};

	useEffect(() => {
		setIsMovieFavorite(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
	}, [favoriteMovies, data]);

	useEffect(() => {
		setIsMovieWatchlist(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
	}, [watchlistMovies, data]);

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
							<LazyLoadImage
								src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
								alt={data?.original_title}
								className="rounded-2xl shadow-3xl w-full h-auto sm:w-[90%] mx-auto "
								placeholderSrc="https://www.popcorn.app/assets/app/images/placeholder-movieimage.png"
								effect="blur"
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
											{data?.runtime} minutes /
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
													<motion.div
														whileTap={{ scale: 0.9 }}
														className="flex gap-2 items-center"
													>
														<LazyLoadImage
															src={
																genreIcons[genre.name.toLowerCase()]
															}
															alt={genre.name}
															className="w-8 "
															id="invertImg"
															placeholderSrc="https://www.popcorn.app/assets/app/images/placeholder-movieimage.png"
															effect="blur"
														/>
														<p className="text-md ">{genre.name}</p>
													</motion.div>
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
																<LazyLoadImage
																	src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
																	alt={item.name}
																	className=" max-w-[7em] h-[9em] w-full object-cover rounded-xl hover:scale-105 duration-150"
																	placeholderSrc="https://www.popcorn.app/assets/app/images/placeholder-movieimage.png"
																	effect="blur"
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
									<div className="max-w-4xl w-full mx-auto mt-6 flex flex-col sm:flex-row justify-evenly">
										<div className="grid grid-cols-1 ">
											<div className=" btn-group">
												<button className="btn btn-sm btn-info btn-outline gap-2">
													<a
														href={data?.homepage}
														target="blank"
														rel="noopener noreferrer"
													>
														Website
													</a>
													<BsGlobe />
												</button>
												<button className="btn btn-sm  btn-info btn-outline gap-2">
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
													className="btn btn-sm  btn-info btn-outline gap-2"
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
													className={`btn btn-sm ${
														isMovieFavorite ? "btn-error" : "btn-info"
													} btn-outline gap-2`}
													onClick={addToFavorites}
												>
													{isMovieFavorite ? "UnFavorite" : "Favorite"}
													{isMovieFavorite ? (
														<BsHeart />
													) : (
														<BsHeartFill />
													)}
												</button>
												<button
													className={`btn btn-sm ${
														isMovieWatchlist ? "btn-error" : "btn-info"
													} btn-outline gap-2`}
													onClick={addToWatchList}
												>
													Watchlist
													{isMovieWatchlist ? (
														<MdOutlineRemove />
													) : (
														<MdExposurePlus1 />
													)}
												</button>
												<button
													className="btn btn-sm  btn-info btn-outline gap-2"
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
								Something went wrong <br /> No movies to Recommend at this moment ,
								Please try again later{" "}
							</h1>
						) : fetchingRecommendations ? (
							<Spinner />
						) : recommendations ? (
							<MovieList movies={recommendations} numberOfMovies={14} />
						) : null}
					</div>
					{/* <!-- Put this part before </body> tag --> */}
					<input type="checkbox" id="my-modal-4" className="modal-toggle" />
					<label htmlFor="my-modal-4" className="modal cursor-pointer">
						<label className="modal-box relative w-full max-w-4xl h-1/2 sm:h-2/3 p-0 ">
							{data?.videos?.results.length > 0 ? (
								<iframe
									title="Trailer"
									src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}`}
									allow="autoplay"
									className="w-full h-full"
									allowFullScreen
								/>
							) : (
								<p className="text-3xl text-center font-semibold mt-32">
									Sorry No Movie trailers were listed for{" "}
									<span className="underline text-blue-500">{data?.title}</span>
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
