import axios from "axios";

const api = axios.create({
  baseURL: "https://nexo-back-end.herokuapp.com"
});

export default api;
