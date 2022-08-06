import React from "react";
import {Link} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import moment from "moment";
import StarRatings from "react-star-ratings";

const Movie = ({movie}) => {
  const {poster_path, vote_average, release_date, title} = movie
  return (
    <AnimatePresence>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0, duration: 1}}
        exit={{opacity: 0}}
        className="w-[150px] sm:w-[200px] text-ellipsis whitespace-nowrap overflow-hidden mt-10 mb-0 text-center hover:scale-105 duration-200"
      >
        <div className="relative">
          <Link to={`/movie/${movie?.id}`}>
            {poster_path && (
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                    : "https://www.fillmurray.com/200/300"
                }
                alt={movie.title}
                className="rounded-2xl "
              />
            )}
            <p className="text-lg mt-2">{title}</p>
            <p className="text-xs text-gray-400">
              <StarRatings
                rating={vote_average / 2}
                starRatedColor={"rgb(255, 165, 0)"}
                starDimension={"20px"}
                starSpacing={"2px"}
              />
              <p className="mt-1">
                {moment(release_date).format("MMMM Do, YYYY")}
              </p>
            </p>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Movie;
