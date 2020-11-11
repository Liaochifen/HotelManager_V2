import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from './router';
import VueGoodTablePlugin from 'vue-good-table';
import ElementUI from 'element-ui'
import dateTime from '../src/assets/js/dateTime'
import '../node_modules/daterangepicker/daterangepicker'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import VueSimpleAlert from 'vue-simple-alert'
import infiniteScroll from 'vue-infinite-scroll'
// CSS
import 'vue-good-table/dist/vue-good-table.css';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/daterangepicker.css'
import 'element-ui/lib/theme-chalk/reset.css'
import './assets/css/svgMap.css'
import './assets/css/demo.css'
// JS
import './registerServiceWorker'
import './assets/js/jquery-3.4.1.min.js'
import './assets/js/basic.js'
import './assets/js/material.min.js'
import './assets/js/promise.js'
import './assets/js/fetch.js'

import {
  Select,
  Button,
  Option,
  Checkbox,
  CheckboxGroup,
} from 'element-ui'

// // Check that service workers are supported
// if ('serviceWorker' in navigator) {
//   // Use the window load event to keep the page load performant
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js');
//   });
// }

Vue.component(Select.name, Select)
Vue.component(Button.name, Button)
Vue.component(Option.name, Option)
Vue.component(Checkbox.name, Checkbox)
Vue.component(CheckboxGroup.name, CheckboxGroup)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueSimpleAlert);
Vue.use(infiniteScroll);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  // comment
  components: { App },
  template: '<App/>'
}).$mount('#app')

Vue.use(VueGoodTablePlugin);
Vue.use(ElementUI);
library.add(faEye, faEyeSlash);




// var loginData = JSON.parse(localStorage.getItem('token'))
// if (localStorage.getItem('token')) {
//   companyName = loginData.companyName;
//   userID = loginData.id;
//   axios.get('https://hotelapi.im.nuk.edu.tw/api/account/' + userID).then((response) => {
//     userAccountDetail = response.data;
//     logout.employeeNumber = userAccountDetail.employeeNumber;
//   }).catch((error) => {
//     console.log(error);
//   })
// }

//檢查是否為登入狀態
router.beforeEach((to, from, next) => {
  // 判斷token是否存在
  var userAccountDetail = {}
  var logout = {
    employeeNumber: "",
    logoutTime: ""
  }
  if (localStorage.getItem('token')) {
    //判斷當前時間與登入時間差異
    var loginData = JSON.parse(localStorage.getItem('token'))
    logout.logoutTime = dateTime.recordDate() + ' ' + dateTime.recordTime();
    var userID = loginData.id;
    let record = 'logout';
    let company = loginData.companyName;
    var currentTime = new Date().getTime();
    // if(loginData.time == null){
    //   loginData.time = 0;
    // }
    if ((currentTime - loginData.time) > 7200000) {   
      axios.get('https://hotelapi.im.nuk.edu.tw/api/account/' + userID).then((response) => {
      userAccountDetail = response.data;
      logout.employeeNumber = userAccountDetail.employeeNumber;
      axios.put('https://hotelapi.im.nuk.edu.tw/api/history/' + company + '/' + record, logout)
        .then((responseData) => {
          localStorage.removeItem('token');
          console.log(responseData);
          alert('連線愈時，請重新登入');
          next('/login');
          window.location.reload();
        }).catch((error2) => {
          console.log(error2);
        })
    }).catch((error) => {
      console.log(error);
    }) 
    } else {
      next();
    }
  } else {
    if (to.path == '/login' || to.path == '/forgetPassword' || to.name == 'verification') {
      next();
    } else {
      next('/login');
    }
  }
});

