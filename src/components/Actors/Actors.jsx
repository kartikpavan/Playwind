import React, { useState } from "react";
import { useGetActorQuery, useGetMoviesByActorIdQuery } from "../../services/TMDB";
import { Link, useParams, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { BiArrowBack } from "react-icons/bi";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";

const Actors = () => {
	const [page, setPage] = useState(1);
	const { id } = useParams();
	const navigate = useNavigate();

	const { data, isFetching, error } = useGetActorQuery(id);
	const {
		data: ActorMovieData,
		isFetching: ActorMovieFetching,
		error: ActorMovieError,
	} = useGetMoviesByActorIdQuery({ id, page });

	console.log("ActorMovieData", ActorMovieData);
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
					<div className="flex flex-col sm:flex-row justify-between gap-2 mt-10">
						{/* Image div  */}
						<div>
							<img
								src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
								alt={data?.original_title}
								className="rounded-2xl shadow-3xl w-full h-auto sm:w-[90%] mx-auto "
							/>
						</div>
						{/* Title and Content Div */}
						<div className="w-full md:w-9/12 flex justify-center flex-col gap-2">
							<h1
								className="text-center mt-4 sm:mt-0 
                     sm:text-left text-4xl "
							>
								{data?.name}
							</h1>
							<h2 className="text-xl pl-1">Born: {data?.birthday} </h2>
							{data?.place_of_birth && (
								<h2 className="text-xl pl-1">Origin: {data?.place_of_birth} </h2>
							)}
							<p className="text-sm pl-1">{data?.biography}</p>
							<div className="mt-10 flex flex-col sm:flex-row items-center justify-around gap-4">
								<a
									href={`https://www.imdb.com/name/${data?.imdb_id}`}
									target="_blank"
									rel="noreferrer"
									className="btn btn-primary w-32"
								>
									IMDB
								</a>

								<Link to={{}}>
									<button className="btn btn-ghost" onClick={() => navigate(-1)}>
										<BiArrowBack />
										Go back
									</button>
								</Link>
							</div>
						</div>
					</div>
					{/* Movies the actor was part of  */}
					<div>
						{ActorMovieError ? (
							<h1 className="text-2xl text-red-500">
								{" "}
								Something went wrong <br /> No movies to recomment at this moment ,
								Please try again later{" "}
							</h1>
						) : ActorMovieFetching ? (
							<Spinner />
						) : ActorMovieData ? (
							<MovieList movies={ActorMovieData} numberOfMovies={12} />
						) : null}
					</div>
				</div>
			) : null}

			<Pagination
				currentPage={page}
				setPage={setPage}
				totalPages={ActorMovieData?.total_pages}
			/>
		</div>
	);
};

export default Actors;
