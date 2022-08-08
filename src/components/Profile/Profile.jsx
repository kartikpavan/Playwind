import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelector} from "../../features/auth.js";

function Profile() {
  const {id} = useParams()
  const {isAuthenticated, user} = useSelector(userSelector)
  console.log(user.username)
  return (<section>
    <div>
      <h1>profile userName - {user?.username}</h1>
      <h2>profile Id - {id}</h2>
    </div>
  </section>);
}

export default Profile;