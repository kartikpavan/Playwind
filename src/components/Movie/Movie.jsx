import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";

const Movie = ({ movie, index }) => {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0, duration: 0.5 }}
				exit={{ opacity: 0 }}
				whileHover={{
					scale: 1.05,
				}}
				className="w-[200px] text-ellipsis whitespace-nowrap overflow-hidden mt-10 mb-0 text-center"
			>
				<div className="relative">
					<Link to={`/movie/${movie?.id}`}>
						{movie?.poster_path && (
							<img
								src={
									movie.poster_path
										? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
										: "https://www.fillmurray.com/200/300"
								}
								alt={movie.title}
								className="rounded-2xl "
							/>
						)}
						<p className="text-lg mt-2">{movie?.title}</p>
						<p className="text-sm text-gray-400">
							{moment(movie.release_date).format("MMMM Do, YYYY")}
						</p>
						{/* <div>
						<div class="rating rating-sm flex items-center justify-center gap-1">
							<input type="radio" class="mask mask-star-2 bg-orange-400" />
							<p className="text-lg">{movie?.vote_average} </p>
						</div>
					</div> */}
						<div className="absolute top-0 right-0">
							<div className=" text-black badge-md bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 rounded-full rounded-br-none">
								{movie?.vote_average} &#9733;
							</div>
						</div>
					</Link>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Movie;
