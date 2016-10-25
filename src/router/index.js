/*老规矩，路由模块独立出来，引入基础的vue和vue-router*/
import Vue from 'vue';
import Router from 'vue-router';

/*这边引入处理时间的moment模块*/
import moment from 'moment';

Vue.use(Router);

import ItemList from '../components/ItemList';
import ItemView from '../views/ItemView';

/*history模式，需要后端配置，我们的配合文件是.htaccess
这边的路由采取正则匹配模式，匹配日期和数字id*/
export default new Router({
	// mode:'history',
	scrollBehavior:()=>({y:0}),
	routes: [
    { name: 'date', path: '/:date(\\d{4}\\d{2}\\d{2})', component: ItemList},
    { name: 'story' , path: '/story/:id(\\d+)', component: ItemView },
    { path: '*', redirect: `/${moment().format('YYYYMMDD')}` }
  ]
})