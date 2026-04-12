import Axios from "axios";

const API = Axios.create({
    baseURL: "http://localhost:8000/api/",
})

// automatically assigning token on every request
API.interceptors.request.use((req) =>{
    const token = localStorage.getItem("token")

    if(token){
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
})

export default API;