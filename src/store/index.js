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
		FETCH_DATE_ITEM_LIST_DATA:({commit,dispatch,state} , {date}={date:commit().format('YYYYMMDD')})=>{
			commit('SET_ACTIVE_DATE',{date});//提交mutations
			return api.fetchItemsByDate(date)
				.then(body=>Promise.resolve(body.stories))
				.then(stories=>{
					commit('SET_DATE_ITEM_LIST',{date,stories})
				})
		}

	},

	mutations:{
		SET_ACTIVE_DATE:(state,{date})=>{
			state.activeDate=date;
		},
		SET_DATE_ITEM_LIST:(state,{date,stories})=>{
			state.dateItemLists[date] = stories
		}
	},

	getters:{
		activeDate(state){
			return state.activeDate;
		}
	}
})

export default store