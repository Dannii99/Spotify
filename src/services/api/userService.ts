import { GlobalService } from './../api/globalService'

export class UserService {

  // declarar servicio global
  private service = new GlobalService();
  private client_id = import.meta.env.VITE_CLIENT_ID;

  public IdUser:string = '';

  constructor() {
    this.getProfileMy().then((e) => {
      this.IdUser = e.id;
    })
  }

  async getProfileMy() {
    try {
      const response:any = await this.service.get('me');
      if(response) {
          return response;
      }
    } catch (error) {
        console.error(error)
    }
  }

  async getProfile() {
    try {
      const response:any = await this.service.get('users/42i8j3qaf2slm77b3r5wudsdl');
      if(response) {
          //console.log('response: ', response);
          return response;
      }
    } catch (error) {
        console.error(error)
    }
  }

  async getCategories() {
    try {
        const response:any = await this.service.get('browse/categories');
        if(response) {
            //console.log('response: ', response);
            return response.categories;
        }
    } catch (error) {
        console.error(error)
    }
  }

  async getAlbum(offset?:number, limit?:number) {
    try {
        const response:any = await this.service.get((!offset && !limit) ? `me/albums` : `me/albums?offset=${offset}&limit=${limit}` );
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }

  async getPlayListPopular(offset?:number, limit?:number, country?:string) {
    try {
        const response:any = await this.service.get(((!!offset || offset == 0)  && !!limit && !!country) ? `browse/featured-playlists?country=${country}&offset=${offset}&limit=${limit}` 
        : (((!!offset || offset == 0) && !!limit) && !country) ? `browse/featured-playlists?offset=${offset}&limit=${limit}` 
        : ((!offset && !limit) && !!country) ? `browse/featured-playlists?country=${country}` : `browse/featured-playlists` );
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }

  async getPlayListRecent(user_id:string, offset?:number, limit?:number, ) {
    try {
        const response:any = await this.service.get(((!!offset || offset == 0)  && !!limit && !!!!user_id) ? `users/${user_id}/playlists?offset=${offset}&limit=${limit}` 
        : ((!offset && !limit) && !!user_id) ? `users/${user_id}/playlists` : `users/${user_id}/playlists` );
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }
  
  async getPlayListNews(country?:string, offset?:number, limit?:number, ) {
    try {
        const response:any = await this.service.get(((!!offset || offset == 0)  && !!limit && !!country) ? `browse/new-releases?country=${country}&limit=${limit}&offset=${offset}` 
        : ((!offset && !limit) && !!country) ? `browse/new-releases?country=${country}` : ((!!offset && !!limit) && !country) ? `browse/new-releases?limit=${limit}&offset=${offset}` 
        : `browse/new-releases` );
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }

  async getMyArtists(offset?:number, limit?:number, ) {
    try {
        const response:any = await this.service.get(((!!offset || offset == 0) && !!limit) ? `me/top/artists?limit=${limit}&offset=${offset}` : `me/top/artists`);
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }
    
}