import React from 'react';
import {useSelector} from "react-redux";
import {userSelector} from "../../features/auth.js";
import {GrLogout} from 'react-icons/gr'
import {Link} from "react-router-dom";

function Profile() {
  const {isAuthenticated, user} = useSelector(userSelector);
  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  }
  const isFavorite = [];
  return (
    <section className="w-full h-full p-6">
      <div className="flex justify-between items-center py-4">
        <h1 className='text-4xl '> My Profile </h1>
        <button className="btn btn-accent flex gap-4" onClick={logOut}>LogOut <GrLogout size={22} color={"white"}/>
        </button>
      </div>
      <main>
        {!isFavorite.length ? (
            <p className="text-xl italic underline underline-offset-4">Add Favorites or watchlist some movies them to see
              them here <Link to={"/"} className="text-2xl text-red-400">Browse Now...</Link></p>) :

          <p>Favorite Movies</p>}
      </main>
    </section>);
}

export default Profile;