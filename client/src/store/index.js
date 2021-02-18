import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router"

import { GET_CURRENT_USER, GET_POSTS, ADD_POST, SIGNIN_USER, SIGNUP_USER } from "../queries"
import { defaultClient as apolloClient } from '../main';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
    error: null,
    authError: null
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
    setError: (state, payload) => {
      state.error = payload;
    },
    setAuthError: (state, payload) => {
      state.authError = payload;
    },
    clearError: (state) => {
      state.error = null;
    }
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
    addPost: ({ commit }, payload) => {
      commit('clearError');
      commit("setLoading", true);
      apolloClient.mutate({
        mutation: ADD_POST,
        variables: payload,
        update: (cache, { data: { addPost } }) => {
          // First read the query you want to update
          const data = cache.readQuery({ query: GET_POSTS });
          // Create update data
          data.getPosts.unshift(addPost);
          // Write updated data back to query
          cache.writeQuery({
            query: GET_POSTS,
            data
          });
        },
        // optimistic data ensures data is added immediately as we specified for the update function 
        optimisticResponse: {
          __typename: 'Mutation',
          addPost: {
            __typename: 'Post',
            _id: -1,
            ...payload
          }
        }
      }).then(({ data }) => {
        commit("setLoading", false);
      }).catch(err => {
        commit("setLoading", false);
        commit('setError', err);
        console.error(err);
      })
    },
    signinUser: ({ commit }, payload) => {
      commit('clearError');
      commit("setLoading", true);
      apolloClient.mutate({
        mutation: SIGNIN_USER,
        variables: payload
      }).then(({ data }) => {
        commit("setLoading", false);
        localStorage.setItem('token', data.signinUser.token);
        // Refresh a page to load getCurrentUser from main.js 
        router.go();
      }).catch(err => {
        commit("setLoading", false);
        commit('setError', err);
        console.error(err);
      })
    },
    signupUser: ({ commit }, payload) => {
      commit('clearError');
      commit("setLoading", true);
      apolloClient.mutate({
        mutation: SIGNUP_USER,
        variables: payload
      }).then(({ data }) => {
        commit("setLoading", false);
        localStorage.setItem('token', data.signupUser.token);
        // Refresh a page to load getCurrentUser from main.js 
        router.go();
      }).catch(err => {
        commit("setLoading", false);
        commit('setError', err);
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
    },
  },
  getters: {
    posts: state => state.posts,
    user: state => state.user,
    userFavorites: state => state.user && state.user.favorites,
    loading: state => state.loading,
    error: state => state.error,
    authError: state => state.authError,
  }
})
