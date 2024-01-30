import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    async login(username, password){
        const response = await axios
            .post(API_URL + "signin", {
                username,
                password
            });
        if (response.data.accessToken) {
            localStorage.setItem("token", JSON.stringify(response.data.accessToken));
        }
        console.log(response.data)
        return response.data;
    }

    logout(){
        localStorage.removeItem("token");
    }

    register(username, email, password){
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser(){
        const token =  JSON.parse(localStorage.getItem('token'));
        if(token){
            return token;
        }else{
            return null;
        }
    }
}

export default new AuthService();
