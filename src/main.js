import Vue from 'vue'
import store from './store'
import { sync } from 'vuex-router-sync'
import { http, router } from './http'
import auth from './auth'
import Vuetify from 'vuetify'
import URLSearchParams from 'url-search-params'
import App from './App.vue'
import Loading from './components/loading'
import Appbar from './components/app-bar'
import * as VueGoogleMaps from "vue2-google-maps"

Vue.config.productionTip = false

// Polyfills
global.URLSearchParams = URLSearchParams

// Sync router to store, as `store.state.route`.
sync(store, router)

// Http and Auth plugins
Vue.use(http)
Vue.use(auth)

// Vuetify
Vue.use(Vuetify, {
  theme: {
    primary: '#21CE99',
    secondary: '#D81B60',
    accent: '#805441'
  }
})
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA3rMB8Pr100f9ASnTV1XAtxDE2GTNZ3sU',
    libraries: 'places', 
  },
})


// Styles
require('./styles/scss/main.scss')
require('./styles/stylus/main.styl')

// Global Components
Vue.component('loading', Loading)
Vue.component('Appbar', Appbar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
