import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Movie = ({ movie, index }) => {
	return (
		<motion.div
			whileHover={{
				scale: 1.01,
				borderBottom: "3px solid #41a79c",
				borderRadius: "5px",
			}}
			className="w-[200px] text-ellipsis whitespace-nowrap overflow-hidden mt-10 mb-0 text-center"
		>
			<div>
				<Link to={`/movie/${movie?.id}`}>
					{movie?.poster_path && (
						<img
							src={
								movie.poster_path
									? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
									: "https://www.fillmurray.com/200/300"
							}
							alt={movie.title}
							className="rounded-2xl"
						/>
					)}
					<p className="text-lg">{movie?.title}</p>
					<div>
						<div class="rating rating-sm flex items-center justify-center gap-1">
							<input type="radio" class="mask mask-star-2 bg-orange-400" />

							<p className="text-lg">{movie?.vote_average} </p>
						</div>
					</div>
				</Link>
			</div>
		</motion.div>
	);
};

export default Movie;
