import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

Vue.config.productionTip = false

Vue.use(VueApollo);

export const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  // Include auth token with requests made with backend
  fetchOptions: {
    credentials: "include",
  },
  request: operation => {

    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', '');
    }

    // operation adds the token to an authrorization header, which sent to backend 
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
  }, onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.error('[networkError]', networkError);
    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err);
      }
    }
  }
});

const apolloProvider = new VueApollo({ defaultClient });


new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    // Execute current user query
    this.$store.dispatch('getCurrentUser')
  }
}).$mount('#app')
