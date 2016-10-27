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
Vue.http.interceptors.push((request, next)  =>{
	// Vue.http.options.AuthKey = 'ssh';
	var a= true;
	if(a){
		request.method='GET'
		request.headers.set('AuthKey','ssh');
		// request.headers.common['AuthKey']='ssh';
	}
	
	console.log(request)
	
	next((response) => {
	    console.log(response.status)
	    console.log(response.body )
	    return response
	});
   
});






moment.locale('zh-CN')

const app = new Vue({
	router,
	store,
	el:'#app',
	render: h=>h(App)
})
