import { GlobalService } from './../api/globalService'

export class UserService {

  // declarar servicio global
  private service = new GlobalService();
  private client_id = import.meta.env.VITE_CLIENT_ID;

  constructor() {

  }

  async getProfileMy() {
    try {
      const response:any = await this.service.get('me');
      if(response) {
          //console.log('response: ', response);
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
        const response:any = await this.service.get((!offset && !limit ? `me/albums` : `me/albums?offset=${offset}&limit=${limit}`) );
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }
    
}