import Axios from "axios"
import { URL } from "../Constants/Constants"
// import { setItemLS } from "./localStorEvents"

const auth = (login, pass) => {
    //pass for send to server
    
    return Axios({
        method: 'POST',
        baseURL: URL,
        url: '/posts'
    })
    
}

export default auth