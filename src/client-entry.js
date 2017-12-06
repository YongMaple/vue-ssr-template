import 'es6-promise/auto'
import Vue from 'vue'
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
import { app, store } from './app'

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
store.replaceState(window.__INITIAL_STATE__)

// actually mount to DOM
app.$mount('#app')
