import React from "react";
import { BiSearch, BiBookmark } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Navbar = () => {
	console.log("Navbar");
	const isAuthenticated = true;
	return (
		<main>
			<nav className="w-full h-[80px] bg-[#5cb9c0] flex items-center justify-between px-2 md:px-8 py-4">
				<div className="lg:hidden">
					<label class="swap swap-rotate" htmlFor="my-drawer-2">
						{/* <!-- this hidden checkbox controls the state --> */}
						<input type="checkbox" />
						{/* <!-- hamburger icon --> */}
						<svg
							class="swap-off fill-current"
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
					<input
						type="text"
						className="bg-inherit w-full max-w-[150px] md:max-w-xs sm:text-xl px-8 py-2  text-white border-b-2 focus:outline-white"
					/>
					<BiSearch size={22} className="absolute top-3.5 left-1" />
				</div>
				<div className="flex items-center justify-center gap-4 ">
					{!isAuthenticated ? (
						<button className="btn-sm btn-outline">Login</button>
					) : (
						<button>
							<Link to={`/profile/:id`}>
								<CgProfile
									size={32}
									color={"white"}
									className="hover:scale-105 duration-200 cursor-pointer"
								/>
							</Link>
						</button>
					)}
				</div>
			</nav>
		</main>
	);
};

export default Navbar;
