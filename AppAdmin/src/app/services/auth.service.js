import axios from "axios";

const API_URL = "http://netcore.apicalendar.com/api/v1/autheticate/";

class AuthService {
    async login(email, password){

        // let data = JSON.stringify({ email, password });
        // let config = {
        //     method: 'post',
        //     url: API_URL + "login",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     data: data
        // };

        // axios.request(config)
        // .then((response) => {
        //     sessionStorage.setItem("token", JSON.stringify(response.data.accessToken))
        //     console.log(JSON.stringify(response.data))
        // })
        // .catch((error) => {
        //     console.log(error)
        // })
        const response = await axios
            .post(API_URL + "login", {
                email,
                password,
            });
        if (response.data.access) {
            sessionStorage.setItem("token", JSON.stringify(response.data.access));
        }
        return response;
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
