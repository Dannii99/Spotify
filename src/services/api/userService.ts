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

  async getProfile(profile:any) {
    try {
      const response:any = await this.service.get(`users/${profile}`);
      if(response) {
          //console.log('response: ', response);
          return response;
      }
    } catch (error) {
        console.error(error)
    }
  }

  async getCategories(country?:string, offset?:number, limit?:number) {
    try {
        const response:any = await this.service.get(((!!offset || offset == 0)  && !!limit && !!country) ? `browse/categories?locale=${country}&offset=${offset}&limit=${limit}` 
        : (((!!offset || offset == 0) && !!limit) && !country) ? `browse/categories?offset=${offset}&limit=${limit}` 
        : ((!offset && !limit) && !!country) ? `browse/categories?locale=${country}` : `browse/categories` );
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
  
  async getPlayListNews(country?:string, offset?:number, limit?:number) {
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

  async getMyArtists(offset?:number, limit?:number) {
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

  async getMyTracks(offset?:number, limit?:number, ) {
    try {
        const response:any = await this.service.get(((!!offset || offset == 0) && !!limit) ? `me/top/tracks?limit=${limit}&offset=${offset}` : `me/top/tracks`);
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }

  async getPlaylists(playlist_id:string | string[]) {
    try {
        const response:any = await this.service.get(`playlists/${playlist_id}`);
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }

  async getMyPlaylists(offset?:number, limit?:number, ) {
    try {
        const response:any = await this.service.get(((!!offset || offset == 0) && !!limit) ? `me/tracks?limit=${limit}&offset=${offset}` : `me/tracks`);
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }

  async getMyPlaylistsTop(offset?:number, limit?:number) {
    try {
        const response:any = await this.service.get(((!!offset || offset == 0) && !!limit) ? `me/playlists?limit=${limit}&offset=${offset}` : `me/playlists`);
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }
  async getAudiobooksUser(offset?:number, limit?:number) {
    try {
        const response:any = await this.service.get(((!!offset || offset == 0) && !!limit) ? `me/audiobooks?limit=${limit}&offset=${offset}` : `me/audiobooks`);
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }
  async getEpisodesUser(country?:string, offset?:number, limit?:number) {
    try {
      const response:any = await this.service.get(((!!offset || offset == 0)  && !!limit && !!country) ? `me/episodes?market=${country}&limit=${limit}&offset=${offset}` 
      : ((!offset && !limit) && !!country) ? `me/episodes?market=${country}` : ((!!offset && !!limit) && !country) ? `me/episodes?limit=${limit}&offset=${offset}` 
      : `me/episodes`);
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }

  async putCurrentlyPlaying(device_id: string) {
    try {
      const response:any = await this.service.put( `me/player`, {
        "device_ids": [device_id],
        "play": true
      });
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }

  async getCurrentlyPlaying() {
    try {
      const response:any = await this.service.get( `me/player/currently-playing`);
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }

  async putStartPlayback(devices_id: string, track: any) {
    try {
        const response:any = await this.service.put((!devices_id) ? `me/player/play` : `me/player/play?device_id=${devices_id}`, track);
        
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }

  async getMyDevices() {
    try {
      const response:any = await this.service.get( `me/player/devices`);
        if(response) {
            //console.log('response: ', response);
            return response;
        }
    } catch (error) {
        console.error(error)
    }
  }


    
}