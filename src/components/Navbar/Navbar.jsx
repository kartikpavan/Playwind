import React, {useEffect} from "react";
import {BiSearch} from "react-icons/bi";
import {Link} from "react-router-dom";
import Avatar from "../../assets/avatar.png";
import {motion} from "framer-motion";
import Search from "../Search/Search";
import {createSessionId, fetchToken, movieApi} from "../../utils/index.js";
import {useDispatch, useSelector} from "react-redux";
import {setUser, userSelector} from "../../features/auth.js";

const Navbar = () => {
  // getting the request_token and the sessionId from localstorage.
  const token = localStorage.getItem("request_token")
  const sessionIDfromLocalStorage = localStorage.getItem("session_id")
  const dispatch = useDispatch();
  const {isAuthenticated, user} = useSelector(userSelector)


  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (sessionIDfromLocalStorage) {
          //if sessionID exists in the local storage then do this
          const {data: userData} = await movieApi.get(`/account?session_id=${sessionIDfromLocalStorage}`)
          dispatch(setUser(userData))
        } else {
          //if sessionID do not exist in the local storage then create session id
          const sessionID = await createSessionId()
          const {data: userData} = await movieApi.get(`/account?session_id=${sessionID}`)
          dispatch(setUser(userData))
        }
      }
    }
    loginUser();
  }, [token])
  return (
    <main>
      <nav className="w-full h-[80px] bg-primary flex items-center justify-between px-2 md:px-8 py-4">
        <div className="lg:hidden">
          <label className="swap swap-rotate" htmlFor="my-drawer-2">
            {/* <!-- this hidden checkbox controls the state --> */}
            <input type="checkbox"/>
            {/* <!-- hamburger icon --> */}
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/>
            </svg>
          </label>
        </div>
        <div className="relative flex items-center justify-center ">
          <Search/>

          <BiSearch size={22} className="absolute top-3 left-1" color={"white"}/>
        </div>
        <div className="flex items-center justify-center gap-4 ">
          {!isAuthenticated ? (
            <button className="btn btn-outline" onClick={fetchToken}>Login</button>
          ) : (
            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
              <Link to={`/profile/${user.id}`}>
                <img src={Avatar} alt="s" className=" w-10 h-10 drop-shadow-lg"/>
              </Link>
            </motion.button>
          )}
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
