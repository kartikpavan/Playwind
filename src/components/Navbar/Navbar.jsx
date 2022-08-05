import React from "react";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import Avatar from "../../assets/avatar.png";
import { motion } from "framer-motion";
import Search from "../Search/Search";

const Navbar = () => {
	console.log("Navbar");
	const isAuthenticated = true;
	return (
		<main>
			<nav className="w-full h-[80px] bg-primary flex items-center justify-between px-2 md:px-8 py-4">
				<div className="lg:hidden">
					<label className="swap swap-rotate" htmlFor="my-drawer-2">
						{/* <!-- this hidden checkbox controls the state --> */}
						<input type="checkbox" />
						{/* <!-- hamburger icon --> */}
						<svg
							className="swap-off fill-current"
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 512 512"
						>
							<path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
						</svg>
					</label>
				</div>
				<div className="relative flex items-center justify-center ">
					<Search />

					<BiSearch size={22} className="absolute top-3 left-1" color={"white"} />
				</div>
				<div className="flex items-center justify-center gap-4 ">
					{!isAuthenticated ? (
						<button className="btn-sm btn-outline">Login</button>
					) : (
						<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
							<Link to={`/profile/:id`}>
								<img src={Avatar} alt="s" className=" w-10 h-10 drop-shadow-lg" />
							</Link>
						</motion.button>
					)}
				</div>
			</nav>
		</main>
	);
};

export default Navbar;
