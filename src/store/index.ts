import type { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
// stores/index.ts
import { defineStore } from 'pinia'

export interface State {
  albums: any[]
  category: any | null,
  device: string | null;
}

export const key: InjectionKey<Store<State>> = Symbol()


const loadState = (): State => {
  const savedState = sessionStorage.getItem('vuexState')
  if (savedState) {
    return JSON.parse(savedState)
  }
  return {
    albums: [],
    category: null,
    device: null
  }
}

export const store = createStore<State>({
  state: loadState(), // data
  mutations: {
    /* addCategory( state:any ) {
      state.albums = state.category
    } */
    addCategory(state: State, category: any) {
      state.albums = category
      sessionStorage.setItem('vuexState', JSON.stringify(state)) // Persist state
    },

    // agregar devoce
    getDevice(state: State, device_id:string) {
      state.device = device_id
    }
  }, // mutar methods
  actions: {
  /*   updateAlbums( newCategory: object | any ) {
      console.log('updateAlbums commit: ', newCategory)
      newCategory.commit('addCategory');
    } */

    updateAlbums({ commit }:any, newCategory: any) {
      commit('addCategory', newCategory)
    },

    updateDevice({ commit }:any, new_device_id: any) {
      commit('getDevice', new_device_id)
    },

  }, // methods
  getters: {
    setAlbum( state:any ) {
      return state.albums;
    },
    setDevice( state:any ) {
      return state.albums;
    }
  } // computed
})

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}