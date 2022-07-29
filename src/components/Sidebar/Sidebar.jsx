import React from "react";
import Logo from "../../assets/logo.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
	{ label: "Popular", value: "popular" },
	{ label: "Top Rated", value: "top_rated" },
	{ label: "Upcoming", value: "upcoming" },
];
const demoCategories = [
	{ label: "Comedy", value: "comedy" },
	{ label: "Action", value: "action" },
	{ label: "Adventure", value: "adventure" },
	{ label: "Horror", value: "horror" },
	{ label: "Romance", value: "romance" },
];

const Sidebar = () => {
	return (
		<div>
			<label for="my-drawer-2" className="drawer-overlay"></label>
			<ul className="menu overflow-y-auto p-2 w-60 bg-base-100 text-base-content">
				{/* //! SIDBAR CONTENT HERE */}

				<Link
					to="/"
					className="flex items-center justify-center pt-4 hover:scale-105 duration-200 "
					onClick={() => {
						document.getElementById("my-drawer-2").click();
					}}
				>
					<motion.div
						animate={{ rotate: 360 }}
						transition={{
							type: "spring",
							damping: 10,
							mass: 0.75,
							stiffness: 100,
						}}
					>
						<img src={Logo} alt="logo" />
					</motion.div>
				</Link>

				<div class="divider"></div>

				<p className="text-md  tracking-wide">Categories</p>

				{categories.map((item) => {
					return (
						<Link key={item.value} to="/">
							<motion.li
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={() => {}}
								className="py-3 px-2 hover:bg-[#5bb5bce0] "
							>
								{item.label}
							</motion.li>
						</Link>
					);
				})}
				<div class="divider"></div>
				<p className="text-md  tracking-wide">Genres</p>

				{demoCategories.map((item) => {
					return (
						<Link key={item.value} to="/">
							<motion.li
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={() => {}}
								className="py-3 px-2 hover:bg-base-300 "
							>
								{item.label}
							</motion.li>
						</Link>
					);
				})}
			</ul>
		</div>
	);
};

export default Sidebar;
