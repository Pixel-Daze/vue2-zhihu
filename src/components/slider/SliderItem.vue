<!-- 具体页面 -->
<template>
	<div class="slider-item" :style="{'width':`${100/this.count}%`}">
		<a class="img" :style="{'background-image':`url(${item.src})`}"  :href="item.link" @click="handleClick">
			<div class="slider-item-title" v-show="item.title">{{item.title}}</div>
		</a>
	</div>
</template>

<script>
	export default {
		name:'SliderItem',
		props:{
			count:{
				type:Number,
				required:true
			},
			item:{
				type:Object,
				required:true
			},
			click:{
				type:Function,
				required:true
			}
		},
		methods:{
			handleClick(){
				this.click(this.item);
			}
		}
	}
</script>