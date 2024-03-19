import axios from "axios";

const API_URL = "https://localhost:7170/api/auth/";

class AuthService {
    async login(username, password){
        const response = await axios
            .post(API_URL + "login", {
                username,
                password,
            });
        if (response.data.accessToken) {
            sessionStorage.setItem("token", JSON.stringify(response.data.accessToken));
        }
        return response.data;
    }

    logout(){
        sessionStorage.removeItem("token");
    }

    register(username, email, password){
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser(){
        const token =  JSON.parse(sessionStorage.getItem('token'));
        if(token){
            return token;
        }else{
            return null;
        }
    }
}

export default new AuthService();
