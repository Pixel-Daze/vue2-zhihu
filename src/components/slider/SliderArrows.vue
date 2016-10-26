<!-- 轮播图左右箭头 -->
<template>
	<div class="slider-arrows-wrap">
		<span class="slider-arrow slider-arrow-left" @click="turn(-1)">&lt;</span>
		<span class="slider-arrow slider-arrow-right" @click="turn(1)">&gt;</span>
	</div>
</template>
<script>
	export default{
		name:'SliderArrow',
		props:{
			turn:{
				type:Function,
				required:true
			}
			
		}
	}
</script>
<style scpoed>
	.slider-arrows-wrap span{
		font-size: 14px;
	}
</style>