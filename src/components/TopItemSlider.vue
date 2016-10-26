<template>
	<transition name="fade">
		<div class="slider_wrap">
			<slider :items="displayedItems" :speed="1" :pause="true" :dots="true" :arrows="true" :click="sliderItemclick" :autoplay="true" :delay="5"></slider>
		</div>
	</transition>
</template>
<style lang="stylus">
  .slider_wrap
    margin-top 30px
    height 200px
    overflow hidden
    transition all .5s cubic-bezier(.55, 0, .1, 1)

  @media screen and (max-width: 600px)
    .slider_wrap
      margin-top 0
</style>
<script>
	import Slider from './slider/Slider.vue'
	import {mapGetters} from 'vuex'
	export default{
		data(){
			return {
				displayedItems:[]
			}
		},
		computed:{
			...mapGetters([
				'activeTopStories'
			])
		},
		methods:{
			/*跳转到故事面板*/
			sliderItemclick(item){
				this.$router.push({name:'story',params:{id:item.id}})
			},
			/*加载轮播图资源*/
			loadItems(){
				this.$store.dispatch('FETCH_TOP_STORIES_DATA').then(()=>{
					this.displayedItems=this.$store.getters.activeTopStories;
				})
			}
		},
		components:{
			Slider
		},
		mounted(){
			this.loadItems()
		}
	}
</script>