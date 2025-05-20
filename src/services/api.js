import axios from "axios";

const api = axios.create({
  baseURL: "https://hospital-queue-be-production.up.railway.app",
});

export default api;
