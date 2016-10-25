<template>
	<div class="news-view">
		<spinner :show="loading"></spinner>
		<div class="news-list-nav">
			<router-link v-if="pagePrev" :to="'/' + pagePrev">&nbsp;&lt;&nbsp;</router-link>
			<a v-else class="disabled">&nbsp;&lt;&nbsp;</a>
			<span>{{date}}</span>
			<a class="disabled">&nbsp;&gt;&nbsp;</a>
		</div>

	</div>
</template>
<script>
	import Spinner from './Spinner'
	import moment from 'moment'
	export default{
		components:{
			Spinner
		},
		data(){
			const isInitialRender = !this.$root._isMounted;
			return {
				loading:false,
				transition:'slide-left'
			}
		},
		methods:{
			loadItems(to=this.date,from=-1){
				//如果参数日期大于今天，让路由替换到今天
				if(this.date>this.today){
					this.$router.replace(`/${this.date}`);
				}
				this.loading=true;
			}
		},
		computed:{
			date(){
				return this.$store.state.route.params.date||this.today;
			},
			pagePrev(){
				const prev = moment(this.date).subtract(1,'days').format('YYYYMMDD');
				return prev < 20130519 ? null : prev;
			},
			today(){
				return moment().format('YYYYMMDD');
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
	      console.log(this.$root)
	    },
	    watch: {
	      date (to, from) {
	        this.loadItems(to, from)
	      }
	    }
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
