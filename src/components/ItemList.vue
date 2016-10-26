<template>
	<div class="news-view">
		<spinner :show="loading"></spinner>
		<div class="news-list-nav">
			<router-link v-if="pagePrev" :to="'/' + pagePrev">&nbsp;&lt;&nbsp;</router-link>
			<a v-else class="disabled">&nbsp;&lt;&nbsp;</a>
			<span>{{date}}</span>
			<router-link v-if="pageNext" :to="'/'+pageNext">&nbsp;&gt;&nbsp;</router-link>
			<a v-else class="disabled">&nbsp;&gt;&nbsp;</a>
		</div>
		<top-item-slider></top-item-slider>
		<transition :name="transition">
			<div class="news-list" :key="displayedDate" v-if="disabledDate>0">
				<transition-group tag="ul" name="item"></transition-group>
			</div>
		</transition>
	</div>
</template>
<script>
	import Spinner from './Spinner'
	import TopItemSlider from './TopItemSlider'
	import moment from 'moment'
	import {mapGetters} from 'vuex'
	export default{
		components:{
			Spinner,
			TopItemSlider
		},
		data(){
			const isInitialRender = !this.$root._isMounted;
			return {
				loading:false,
				transition:'slide-left',
				displayedDate: isInitialRender ? this.date : -1,
        displayedItems: isInitialRender ? this.$store.getters.activeSimpleItems : []
			}
		},
		methods:{
			loadItems(to=this.date,from=-1){
				console.log('current Time:'+this.date)
				//如果参数日期大于今天，让路由替换到今天
				if(this.date>this.today){
					this.$router.replace(`/${this.date}`);
				}
				this.loading=true;
				this.$store.dispatch('FETCH_DATE_ITEM_LIST_DATA', {date: this.date})
			}
		},
		computed:{
			...mapGetters([
				'activeDate'
			]),
			date(){
				return  this.$route.params.date||this.today
			},
			pagePrev(){
				const prev = moment(this.activeDate).subtract(1,'days').format('YYYYMMDD');
				return prev < 20130519 ? null : prev;
			},
			pageNext(){
				const next = moment(this.activeDate).add(1,'days').format('YYYYMMDD')
				return next>this.today?null:next;
			},
			today(){
				return moment().format('YYYYMMDD');/*获取当前的时间*/
			}
		},
		mounted(){
			this.loadItems(this.date)
		},
		beforeMount () {
			/*判断是否被编译*/
	      if (this.$root._isMounted) {
	        console.log('_isMounted')
	      }
	    },
	    watch: {
	    	/*神密的检测方式watch*/
	      date (to, from) {
	        this.loadItems(to, from)
	      }
	    },
	}
</script>
<style lang="stylus">
  .news-view
    padding-top 45px

  .news-list-nav, .news-list
    background-color #fff
    border-radius 2px

  .news-list-nav
    padding 15px 30px
    position fixed
    text-align center
    top 55px
    left 0
    right 0
    z-index 998
    box-shadow 0 1px 2px rgba(0, 0, 0, .1)
    a
      margin 0 1em
    .disabled
      color #ccc

  .news-list
    position absolute
    /*margin 30px 0*/
    margin 20px 0
    width 100%
    transition all .5s cubic-bezier(.55, 0, .1, 1)
    ul
      list-style-type none
      padding 0
      margin 0

  .slide-left-enter, .slide-right-leave-active
    opacity 0
    transform translate(30px, 0)

  .slide-left-leave-active, .slide-right-enter
    opacity 0
    transform translate(-30px, 0)

  .item-move, .item-enter-active, .item-leave-active
    transition all .5s cubic-bezier(.55, 0, .1, 1)

  .item-enter
    opacity 0
    transform translate(30px, 0)

  .item-leave-active
    position absolute
    opacity 0
    transform translate(30px, 0)

  @media (max-width 600px)
    .news-list
      /*margin 10px 0*/
      margin 0
</style>
