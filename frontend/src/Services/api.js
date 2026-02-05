import axios from "axios";

const API = axios.create({
  baseURL: "https://gymmanagment-75up.onrender.com", // render backend URL
});

// example API calls
export const getUsers = () => API.get("/users");
export const loginUser = (data) => API.post("/login", data);

export default API;
