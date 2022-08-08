import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth.js";
import { GrLogout } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useGetListQuery } from "../../services/TMDB.js";
import { Movie } from "../index.js";

function Profile() {
  const { isAuthenticated, user } = useSelector(userSelector);
  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: "favorite/movies",
    session_id: localStorage.getItem("session_id"),
    accountId: user.id,
    page: 1,
  });
  const { data: watchlistMovies, refetch: refetchWatchlist } = useGetListQuery({
    listName: "watchlist/movies",
    session_id: localStorage.getItem("session_id"),
    accountId: user.id,
    page: 1,
  });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlist();
  }, []);

  return (
    <section className="w-full h-full p-6">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-4xl "> My Profile </h1>
        <h3 className="text-2xl text-info-content border border-info-content p-2">
          {" "}
          {user.username}
        </h3>
        <button className="btn btn-accent flex gap-4" onClick={logOut}>
          LogOut <GrLogout size={22} color={"white"} />
        </button>
      </div>
      <main>
        {!favoriteMovies?.results?.length &&
        !watchlistMovies?.results?.length ? (
          <Link
            to={"/"}
            className="text-xl italic underline underline-offset-4"
          >
            A dd Favorites or watchlist some movies them to see them here
            <p>Browse Now...</p>
          </Link>
        ) : (
          <div>
            <h1 className="text-3xl font-semibold">Favorite Movies</h1>
            <div className="flex flex-wrap pt-2 pb-6 gap-6">
              {favoriteMovies?.results.map((item) => {
                return <Movie key={item.id} movie={item} />;
              })}
            </div>
            <h1 className="text-3xl font-semibold">Watchlist Movies</h1>
            <div className="flex flex-wrap pt-2 pb-6 gap-6">
              {watchlistMovies?.results.map((item) => {
                return <Movie key={item.id} movie={item} />;
              })}
            </div>
          </div>
        )}
      </main>
    </section>
  );
}

export default Profile;
