import axios from "axios";

export const movieApi = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  params: {
    api_key: import.meta.env.VITE_MOVIE_API_KEY
  }
})

export const fetchToken = async () => {
  try {
    const {data} = await movieApi.get("/authentication/token/new");
    const {request_token} = data;
    if (data.success) {
      localStorage.setItem("request_token", request_token);
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${window.location.hostname}/approved`
    }
  } catch (error) {
    console.log("Sorry your token could not be created.", error)
  }
}

export const createSessionId = async () => {
  const token = localStorage.getItem('request_token')
  if (token) {
    try {
      const {data: {session_id}} = await movieApi.post("/authentication/session/new", {
        request_token: token
      })
      localStorage.setItem("session_id", session_id);
      return session_id;
    } catch (error) {
      console.log('error while getting session id', error);
    }
  }
}
