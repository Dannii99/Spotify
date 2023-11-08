import config from './../../utils/config'

export class GlobalService {

    constructor() {
        
    }


    post(url:string, data:any)  {
      return new Promise((resolve, reject) => {    
        const myHeaders = new Headers();
        const accessToken = localStorage.getItem('access_token')
    
        myHeaders.append("Authorization", "Bearer " + accessToken);
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Access-Control-Allow-Origin", "*");
    
        const requestOptions: object = {
          method: 'POST',
          mode: 'cors',
          headers: myHeaders,
          body: JSON.stringify(data)
        }
    
        fetch(`${config.apiUrlSpotify}${url}`, requestOptions).then((response) => response.json()).then((response) => {
            if (response && !response.error) {
                resolve(response);
            } else if (response.error.status === 403 || !localStorage.getItem('access_token')) {
               // window.location.pathname = '/'
                resolve(response);
            } else if ((response.error.status >= 400 && response.error.status < 500 ) ) {
                resolve(response)
            } else {
                resolve(false)
            }
        }).catch((error) => {
            reject(error);
        })
      })
    }


    get(url:string)  {
      return new Promise((resolve, reject) => {    
        const myHeaders = new Headers();
        const accessToken = localStorage.getItem('access_token')
    
        myHeaders.append("Authorization", "Bearer " + accessToken);
        myHeaders.append("Content-Type", "application/json");
        
    
        const requestOptions: object = {
          method: 'GET',
          headers: myHeaders,
        }
    
        fetch(`${config.apiUrlSpotify}${url}`, requestOptions).then((response) => response.json()).then((response) => {
            if (response && !response.error) {
                resolve(response);
            } else if (response.error.status === 403 || !localStorage.getItem('access_token')) {
               // window.location.pathname = '/'
                resolve(response);
            } else if ((response.error.status >= 400 && response.error.status < 500 ) ) {
                resolve(response)
            } else {
                resolve(false)
            }
        }).catch((error) => {
            reject(error);
        })
      })
    }
    
}