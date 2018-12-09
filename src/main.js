// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import App from './App'
import router from './router'
import firebase from 'firebase'

/*
 * firebase setting
 */
var firebaseConfig = {
  apiKey: "AIzaSyD47LTOvh9LhQWAnSJDpSR1z1ep-JZXvog",
  authDomain: "yonnani-scheduler.firebaseapp.com",
  databaseURL: "https://yonnani-scheduler.firebaseio.com",
  projectId: "yonnani-scheduler",
  storageBucket: "yonnani-scheduler.appspot.com",
  messagingSenderId: "476750876438"
};
firebase.initializeApp(firebaseConfig);
Vue.prototype.$firebase = firebase;

/*
 * bootstrap-vue
 */
Vue.use(BootstrapVue)

/*
 * vcalendar
 */
Vue.use(VCalendar, {
  firstDayOfWeek: 1
})

/*
 * momentjs setting
 */
const moment = require('moment');
moment.locale('ko');
Vue.prototype.$moment = moment;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
