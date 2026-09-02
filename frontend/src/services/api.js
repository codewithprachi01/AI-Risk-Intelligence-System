import axios from "axios";


const API = axios.create({

    baseURL:"https://ai-risk-intelligence-system.onrender.com"

});


export default API;