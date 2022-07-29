import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Actors, Movies, MovieInformation, Profile, Navbar, Sidebar } from "./components";

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
				<div className="drawer-side border-r ">
					<label for="my-drawer-2" className="drawer-overlay"></label>
					<ul className="menu overflow-y-auto p-2 w-60 bg-base-100 text-base-content">
						{/* //! SIDBAR CONTENT HERE */}
						<Sidebar />
					</ul>
				</div>
			</div>
		</div>
	);
};

export default App;
