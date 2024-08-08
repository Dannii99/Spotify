import type { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  albums: any[]
  category: any | null
}

export const key: InjectionKey<Store<State>> = Symbol()


const loadState = (): State => {
  const savedState = sessionStorage.getItem('vuexState')
  if (savedState) {
    return JSON.parse(savedState)
  }
  return {
    albums: [],
    category: null
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
    }
  }, // mutar methods
  actions: {
  /*   updateAlbums( newCategory: object | any ) {
      console.log('updateAlbums commit: ', newCategory)
      newCategory.commit('addCategory');
    } */

    updateAlbums({ commit }:any, newCategory: any) {
      commit('addCategory', newCategory)
    }
  }, // methods
  getters: {
    setAlbum( state:any ) {
      return state.albums;
    }
  } // computed
})

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}