export class AuthService {

    private client_id = import.meta.env.VITE_CLIENT_ID;
    private client_secret =  import.meta.env.VITE_CLIENT_SECRET;
    private redirect_uri = import.meta.env.VITE_REDIRECT_URI;

    constructor() {
        
    }

    getClientId() {
        return this.client_id
    }

    getClientSecret() {
        return this.client_secret
    }

    getRedirectURL() {
        return this.redirect_uri
    }

    async getToken(clientId:string, clientSecret:string) {
        try {
            const result = await fetch("https://accounts.spotify.com/api/token", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
              },
              body: "grant_type=client_credentials",
            });
          
            const data = await result.json();
            localStorage.setItem('access_token', data.access_token)
            return data.access_token;
        } catch (error) {
            console.error(error)
        }
    }

  

}
