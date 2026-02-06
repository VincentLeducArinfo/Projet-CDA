// import router from "@/router/index.js";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // CRUCIAL pour les cookies cross-origin
  headers: {
    "Content-Type": "application/ld+json"
  }
});

export default api;