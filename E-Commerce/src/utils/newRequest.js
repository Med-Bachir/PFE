import axios from "axios";

const newRequest = axios.create({
    baseURL: "https://taj-mall.onrender.com/api",
    withCredentials: true
});

export default newRequest;