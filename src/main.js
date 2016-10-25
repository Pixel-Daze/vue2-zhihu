import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'

/*保持vuex和vue-router同步*/
// import {sync} from 'vuex-router-sync'
import store from './store'
import router from './router/index'

import moment from 'moment'

// sync(store,router)

Vue.use(VueResource)

moment.locale('zh-CN')

const app = new Vue({
	router,
	store,
	el:'#app',
	render: h=>h(App)
})
