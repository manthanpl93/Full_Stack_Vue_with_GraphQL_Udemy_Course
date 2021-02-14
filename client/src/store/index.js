import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router"

import { GET_CURRENT_USER, GET_POSTS, SIGNIN_USER } from "../queries"
import { defaultClient as apolloClient } from '../main';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit("setLoading", true);
      apolloClient.query({
        query: GET_CURRENT_USER
      }).then(({ data }) => {
        commit('setUser', data.getCurrentUser);
        commit("setLoading", false);
      }).catch(err => {
        console.error(err);
        commit("setLoading", false);
      })
    },
    getPosts: ({ commit }) => {
      commit("setLoading", true);
      apolloClient.query({
        query: GET_POSTS
      }).then(({ data }) => {
        commit('setPosts', data.getPosts);
        commit("setLoading", false);
      }).catch(err => {
        console.error(err);
        commit("setLoading", false);
      })
    },
    signinUser: ({ commit }, payload) => {
      // clear token to prevent errors (if malformed )
      localStorage.setItem('token', '');

      apolloClient.mutate({
        mutation: SIGNIN_USER,
        variables: payload
      }).then(({ data }) => {
        localStorage.setItem('token', data.signinUser.token);
        // Refresh a page to load getCurrentUser from main.js 
        router.go();
      }).catch(err => {
        console.error(err);
      })
    },
    signoutUser: async ({ commit }) => {
      // clear user in state
      commit('setUser', null);
      //remove token in local storage
      localStorage.setItem('token', '');
      // end session
      await apolloClient.resetStore();
      //redirect home - kick users out of private pages (i.e. Profile)
      router.push("/");
    }
  },
  getters: {
    posts: state => state.posts,
    user: state => state.user,
    loading: state => state.loading,
  }
})
