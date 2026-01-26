// import router from "@/router/index.js";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8080/api",
  headers: {
    "Content-Type": "application/ld+json"
  }
});

// Intecepteur pour ajouter le token JWT
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token && (router.currentRoute.value.name != 'login' && router.currentRoute.value.name != 'register')) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });


// Intercepter les requêtes pour vérifier la validité du token
// api.interceptors.response.use(function onFulfilled(response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   return response;
// }, function onRejected(error) {
//   if (error.response.status == 401) {
//     router.push({ name: 'login' });
//   }

//   return Promise.reject(error);
// });



export default api;