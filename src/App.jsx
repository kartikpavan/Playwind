import React from "react";
import { Routes, Route } from "react-router-dom";
import { Actors, Movies, MovieInformation, Navbar, Profile } from "./components";
const App = () => {
	return (
		<div>
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
	);
};

export default App;
