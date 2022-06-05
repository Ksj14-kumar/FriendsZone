import axios from "axios";


const Instace = axios.create({
    baseURL: "http://localhost:5000",
})


export default Instace;