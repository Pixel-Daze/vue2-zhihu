import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import * as api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		activeDate:null,
		items:{/*[id:number]:Item*/},
		comments:{/*[id:number]:Comments*/},
		dateItemLists:{/*[date:number]:SimpleItem*/},
		themeItemLists:{/*[id:number]:SimpleItem*/},
		topStories:{/*[id:number]:SimpleItem*/}
	},

	actions:{
		
	},

	mutations:{
		SET_ACTIVE_DATE:(state,{date})=>{
			state.activeDate=date;
		}
	},

	getters:{
		activeDate(state){
			return state.activeDate;
		}
	}
})

export default store