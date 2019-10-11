import axios from "axios";

const api = axios.create({
  baseURL: "https://nexo-back-end.herokuapp.com"
  //baseURL: "http://localhost:3000"
});

export default api;
