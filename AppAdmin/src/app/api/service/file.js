import "regenerator-runtime/runtime";


const GetSeoXMl = async () => {
    //return SEO.Root.Site
    return new Promise((resolve, reject) => {
        fetch(`https://localhost:7170/cdn/seoxml`, {
            // hostname: "mvc.garrafon.com",
            mode: "cors",
            credentials: "same-origin",
            method: 'GET',
            headers: {
                // "Content-Type": "application/xml; charset=utf-8"
            },
        })
            .then(result => result.json())
            .then(result => {
                resolve(result.Root.Site)
            })
            .catch(error => reject(error))
    })

}

const GetSeoXMlString = async () => {
    //return SEO.Root.Site
    return new Promise((resolve, reject) => {
        fetch(`http://mvc.garrafon.com/ajax/getseoxml`, {
            // hostname: "mvc.garrafon.com",
            mode: "cors",
            credentials: "same-origin",
            method: 'POST',
            headers: {
                // "Content-Type": "application/xml; charset=utf-8"
            },
        })
            .then(result => result.text())
            .then(result => {
                // console.log("result=>>>", result)
                resolve(result)
            })
            .catch(error => reject(error))
    })

}

const SaveSeoXMl = async ({newData}) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ASP.NET_SessionId=2nd1ufz5mwy2tjs3lfrbwyot; Cart|09394077-e8c1-4891-ba1b-7e84e9b112ed|507={\"Generated\":false,\"Count\":0,\"Items\":[],\"Confirmation\":null,\"Reservation\":null}; SESSION_SITE_ID=507; SESSION_USER_ID=");
    
    var raw = JSON.stringify({newData});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://localhost:7170/cdn/guardarjson", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}


// const SaveSeoXMl = async ({ seo }) => {

//     return new Promise((resolve, reject) => {
//         var myHeaders = new Headers();

//         myHeaders.append("Content-Type", "application/json");
//         //myHeaders.append("Cookie", "ASP.NET_SessionId=3rqq0pif1dlulgoqxcubtos4; Cart|9b3ae2c4-087b-42cc-8da7-4e808e0b6aa5|507={\"ReserveId\":0,\"ClientId\":0,\"Count\":0,\"Items\":[],\"Confirmation\":null,\"Reservation\":null}; Cart|cbdbe05f-688e-4094-823d-1c5bbc286984|0={\"ReserveId\":0,\"ClientId\":0,\"Count\":0,\"Items\":[],\"Confirmation\":null,\"Reservation\":null}; SESSION_SITE_ID=507");
//         let _temp = []
//         _temp.push({
//             Site: seo
//         })

//         var raw = JSON.stringify({
//             "seo": JSON.stringify(_temp[0])
//         });

//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: raw,
//             redirect: 'follow'
//         };

//         fetch("http://mvc.garrafon.com/ajax/seoxml/", requestOptions)
//             .then(response => response.text())
//             .then(result => resolve(true))
//             .catch(error => reject(error));

//     })

// }

// console.log("guardando...", seo)

// return new Promise((resolve, reject) => {
//     console.log("entrando para guardar")
// })

//return seo.Root.Site


//     return new Promise((resolve,reject)=>{
//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");
//       myHeaders.append("Cookie", "ASP.NET_SessionId=3rqq0pif1dlulgoqxcubtos4; Cart|9b3ae2c4-087b-42cc-8da7-4e808e0b6aa5|507={\"ReserveId\":0,\"ClientId\":0,\"Count\":0,\"Items\":[],\"Confirmation\":null,\"Reservation\":null}; Cart|cbdbe05f-688e-4094-823d-1c5bbc286984|0={\"ReserveId\":0,\"ClientId\":0,\"Count\":0,\"Items\":[],\"Confirmation\":null,\"Reservation\":null}; SESSION_SITE_ID=507");
//       let _temp = []
//       _temp.push({
//         Site : seo
//       })

//       var raw = JSON.stringify({
//         "seo": JSON.stringify(_temp[0])
//       });

//       var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//       };

//       fetch("http://mvc.garrafon.com/ajax/seoxml/", requestOptions)
//         .then(response => response.text())
//         .then(result => resolve(true))
//         .catch(error => reject(error));
// })


export {
    GetSeoXMl,
    SaveSeoXMl,
    GetSeoXMlString,
}
