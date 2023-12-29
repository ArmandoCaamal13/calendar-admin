import "core-js/stable";
import "regenerator-runtime/runtime";
import { HttpStatus } from 'interface/HttpStatus'

const GET_LOGIN = async ({ username,password, role }) => {
    return new Promise(async(resolve,reject) => {
        fetch("http://mvc.ebcal.dtraveller.com/account/login",{
           method: "POST",
           headers:{
                "Content-Type": "application/json"
           },
           body: JSON.stringify({
                UserName: username,
                Password: password,
                Role: role,
           })
        })
        .then( response => response.json())
        .then( response => {
            const _response = (response.status === HttpStatus.successful) ?
                response?.data : {
                    UserName: username,
                    Password: password,
                    Role: role,
                }

            resolve(_response)
        })
        .catch( error => {
            reject(error)
            console.error(`IS ERROR ${error}`)
        })
    })
}


export { GET_LOGIN }