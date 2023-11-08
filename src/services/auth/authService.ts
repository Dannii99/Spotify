export class AuthService {

    private client_id = import.meta.env.VITE_CLIENT_ID;
    private client_secret =  import.meta.env.VITE_CLIENT_SECRET;
    private redirect_uri = import.meta.env.VITE_REDIRECT_URI;


    private scope = 'user-read-private user-read-email';
    private codeVerifier  = this.generateRandomString(64);
   

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

    // pedir autorizacion de usuario
    async authorization() {
        // Construye la URL de autorización de Spotify
        const scope = this.scope
        const hashed:any = await this.sha256(this.codeVerifier)
        const codeChallenge = this.base64encode(hashed);
        const authUrl = new URL("https://accounts.spotify.com/authorize")

        // generated in the previous step
        window.localStorage.setItem('code_verifier', this.codeVerifier);

        const params =  {
        response_type: 'code',
        client_id: this.client_id,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: this.redirect_uri,
        }

        // Realiza una redirección o abre una ventana para la autorización de Spotify
        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString(); // Redirige al usuario a la URL de autorización
      
    }

    // obtener acces token
    async getToken(code:any) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                // stored in the previous step
                const params: any =  {
                    client_id: this.client_id,
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: this.redirect_uri,
                    code_verifier: localStorage.getItem('code_verifier'),
                }
        
                const payload = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(params).toString(),
                }
    
          
                const body = await fetch("https://accounts.spotify.com/api/token", payload);
                const response = await body.json();
                if (response) {
                    // console.log('response: ', response.access_token);
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem('refresh_token', response.refresh_token);
                    this.getAccessToken()
                    resolve()
                }
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })
    }

    // refrescar access token
    async getRefreshToken() {
        try {
             // refresh token that has been previously stored
            const refreshToken: any = localStorage.getItem('refresh_token');
            const url: string = "https://accounts.spotify.com/api/token";
     
            const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: this.client_id,
                }),
            }
            const body:any = await fetch(url, payload);
            const response:any = await body.json();
            if (response) {
                // console.log('response refress: ', response);
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', response.refresh_token);
                
            }
            
        
        } catch (error) {
            console.error(error)
        }
       
    }

    // retornar valor de access token
    getAccessToken() {
        const token = localStorage.getItem('access_token')
        // console.log('access_token: ', token);
        return token ? token : null
    }


    //Verificador de código
    generateRandomString(length:number) {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }

    // Code Challenge
    async sha256(plain:any) {
        const encoder = new TextEncoder()
        const data = encoder.encode(plain)
        return window.crypto.subtle.digest('SHA-256', data)
    }

    base64encode(input:any) {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
          .replace(/=/g, '')
          .replace(/\+/g, '-')
          .replace(/\//g, '_');
    }
  
}
