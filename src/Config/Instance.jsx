import axios from "axios";
const Instace = axios.create({
    baseURL: process.env.REACT_APP_API_BACKENDURL,
})
export default Instace;