export class UserService {

    constructor() {
        
    }

    async getProfile() {
        let accessToken = localStorage.getItem('access_token');
      
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
      
        const data = await response.json();
        return data
    }

    async getCategories() {
        let accessToken = localStorage.getItem('access_token');
        const result = await fetch(
          `https://api.spotify.com/v1/browse/categories`,
          {
            method: "GET",
            headers: { Authorization: "Bearer " + accessToken },
          }
        );
        const data = await result.json();
        return data.categories;
    }
    
}