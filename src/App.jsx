import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Actors, Movies, MovieInformation, Profile, Navbar } from "./components";
import Logo from "./assets/logo.png";

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

const App = () => {
	return (
		<div>
			<div className="drawer drawer-mobile">
				<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content flex flex-col">
					{/* //! MAIN PAGE CONTENT HERE */}
					<Navbar />
					<main>
						<Routes>
							<Route path="/" element={<Movies />} />
							<Route exact path="/movie/:id" element={<MovieInformation />} />
							<Route exact path="/actors/:id" element={<Actors />} />
							<Route exact path="/profile/:id" element={<Profile />} />
						</Routes>
					</main>
				</div>
				<div className="drawer-side">
					<label for="my-drawer-2" className="drawer-overlay"></label>
					<ul className="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content">
						{/* //! SIDBAR CONTENT HERE */}
						<li>
							<Link to="/">
								<img src={Logo} alt="logo" />
							</Link>
						</li>
						<div class="divider"></div>
						<p className="text-lg uppercase tracking-wide">Categories</p>

						{demoCategories.map((item) => {
							return (
								<Link key={item.value} to="/">
									<li onClick={() => {}} className="py-4">
										{item.label}
									</li>
								</Link>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default App;
