import axios from "axios";

const instance = axios.create({
    // baseURL:"https://exam.encodesolution.com.np/api"
    // baseURL: "http://192.168.10.85:8000/api"
    baseURL: "http://127.0.0.1:8000/api"
    // baseURL:"https://puexam.pec.edu.np/api"
});

export default instance;