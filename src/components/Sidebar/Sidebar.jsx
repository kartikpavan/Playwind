import React from "react";
import Logo from "../../assets/logo3.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGetGenresQuery } from "../../services/TMDB";
import Spinner from "../Spinner/Spinner";
import genreIcons from "../../assets/genres";
import { useDispatch } from "react-redux";
import { selectGenre } from "../../features/CurrentGenre";
import { Scrollbars } from "react-custom-scrollbars";

const categories = [
	{ label: "Popular", value: "popular" },
	{ label: "Top Rated", value: "top_rated" },
	{ label: "Upcoming", value: "upcoming" },
];

const Sidebar = () => {
	const { data, error, isFetching } = useGetGenresQuery();
	const dispatch = useDispatch();

	// console.log(data);
	return (
		<Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
			<Link
				to="/"
				className="flex items-center justify-center pt-4 hover:scale-105 duration-200 "
				onClick={() => {
					document.getElementById("my-drawer-2").click();
				}}
			>
				<div>
					<img src={Logo} alt="logo" className="w-11/12 " />
				</div>
			</Link>

			<div className="divider"></div>

			<p className="text-md font-semibold text-info tracking-wide">Categories</p>

			{categories.map((item) => {
				return (
					<Link key={item.value} to="/">
						<motion.div
							whileHover={{ scale: 1.07 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => {
								dispatch(selectGenre(item.value));
								document.getElementById("my-drawer-2").click();
							}}
							className="py-3 px-2 hover:bg-[#5bb5bce0]  "
						>
							<div className="flex items-center gap-2">
								<img
									src={genreIcons[item.label.toLowerCase()]}
									alt="/"
									className="w-6 md:w-8 "
									color={"white"}
									id="invertImg"
								/>
								<p>{item.label}</p>
							</div>
						</motion.div>
					</Link>
				);
			})}
			<div className="divider"></div>
			<p className="text-md font-semibold text-info tracking-wide">Genres</p>
			{error ? (
				<h1 className="text-2xl text-red-400">There was an Error</h1>
			) : isFetching ? (
				<Spinner />
			) : data ? (
				data.genres.map((genre) => {
					return (
						<Link key={genre.id} to="/">
							<motion.div
								whileHover={{ scale: 1.07 }}
								whileTap={{ scale: 0.9 }}
								onClick={() => {
									dispatch(selectGenre(genre.id));
									document.getElementById("my-drawer-2").click();
								}}
								className="py-3 px-2 hover:bg-base-300 w-full "
							>
								<div className="flex items-center gap-2">
									<img
										src={genreIcons[genre.name.toLowerCase()]}
										alt="/"
										className="w-6 md:w-8"
										id="invertImg"
									/>
									<p>{genre.name}</p>
								</div>
							</motion.div>
						</Link>
					);
				})
			) : null}
		</Scrollbars>
	);
};

export default Sidebar;
