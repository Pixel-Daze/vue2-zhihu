import Vue from 'vue'
import moment from 'moment'
import {API_ROOT} from '../config'


/*全都是get方法，统一写函数*/
function fetch(child) {
	return new Promise((resolve,reject)=>{
		Vue.http.get(API_ROOT+child).then((response)=>{
			resolve(response.body);
		},reject)
	})
}

/*获取最新的消息*/
export function fetchLatest(){
	return fetch('news/latest').then((response)=>{
		response.stories.forEach((item)=>item.images = item.images.map((img)=>getPicUrl(img)))
		response.top_stories.forEach((item)=>item.image = getPicUrl(item.image))
		return response
	})
}
/*获取具体内容*/
export function fetchItem(id){
	return fetch(`news?id=${id}`).then((item)=>{
		item.body = item.body.replace(/src="http/g,'src"'+getPiUrl('http'))
		item.image = getPiUrl(item.image);
		item.images = item.images.map((img)=>getPiUrl(img));
	})
}

/*提前获取全部新闻*/
export function fetchItems(ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

/*获取额外小溪*/
export function fetchItemExtra(id) {
  return fetch(`extra?id=${id}`)
}

/*获取评论*/
export function fetchItemComments(id) {
  return fetch(`comments?id=${id}`).then((response) => {
    response.comments.forEach((comment) => comment.avatar = getPicUrl(comment.avatar))
    return response
  })
}

/*根据日期获取消息列表*/
export function fetchItemsByDate(date) {
  date = moment(date).add(1, 'days').format('YYYYMMDD');
  return fetch(`before?time=${date}`).then((response) => {
    response.stories.forEach((item) => item.images = item.images.map((img) => getPicUrl(img)))
    return response
  })
}

/*主题查看*/
export function fetchThemes(){
	return fetch(`themes`);
}

/*获取主题*/
export function fetchTheme(id) {
  return fetch(`theme?id=${id}`)
}

/*获取图片*/
export function getPicUrl(img){
	return API_ROOT+`pic?img=${img}`
}