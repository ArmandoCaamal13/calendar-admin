import "core-js/stable";
import "regenerator-runtime/runtime";


const API_SERVICE = async ({ URL,TYPE,DATA = null,TOKEN = null}) => {
    const request = {
      method: TYPE
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${TOKEN}`);
    request.headers = myHeaders

    if(TYPE === "POST"){
      request.body = JSON.stringify(DATA)
    }
    return new Promise((resolve,reject)=> {
      fetch(URL.value,request)
      .then(response => response.json())
      .then(result => {
        if(TYPE === "GET"){          
          resolve(result?.Data?.Schedules)
        }
        
        resolve(false)
      })
      .catch(error =>{
         console.log('error', error) 
         reject(error)
      });
    })
   
}


const getScheduleAPi = ({endpoint,token}) => {
  return new Promise((resolve,reject) => {
      fetch(`http://mvc.ebcal.dtraveller.com/${endpoint}`,{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(response => {
          resolve(response)
      })
      .catch(error =>{
        console.error('error', error) 
        reject(error)
    });
  })
}

const TOKEN_ = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluaXN0cmFkb3IiLCJuYmYiOjE2NTQ4NzQ5OTMsImV4cCI6MTY1NDk1ODk5MywiaWF0IjoxNjU0ODc0OTkzLCJpc3MiOiJodHRwOi8vbXZjLmViY2FsLmR0cmF2ZWxsZXIuY29tIiwiYXVkIjoiaHR0cDovL212Yy5lYmNhbC5kdHJhdmVsbGVyLmNvbSJ9.IE0CyYCWcOSjio_eVquUjFEQZJwGFwdVXTKap48YZvY"
const getSchedules = (endpoint) => {
    return new Promise((resolve,reject) => {
        fetch(`http://mvc.ebcal.dtraveller.com${endpoint}`,{
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN_}`
          }
        })
        .then(response => response.json())
        .then(response => {
            resolve(response)
        })
        .catch(error =>{
          console.error('error', error) 
          reject(error)
      });
    })
}

export {
    API_SERVICE,
    getScheduleAPi,
    getSchedules
}