<template>
	<li class="news-item">
		<span class="title">
			
		</span>
	</li>
</template>

<style lang="stylus">
  .news-item
    background-color #fff
    padding 20px 30px
    border-bottom 1px solid #eee
    position relative
    line-height 20px
    overflow hidden
    .image
      color #009dd7
      position absolute
      top 0
      right 0
      text-align center
      img
        width 80px

  .news-item .title a:visited
    color #ababab

  .news-item:hover
    background-color #fafafa

  @media (max-width 600px)
    .news-item
      padding 20px 20px

    .news-item .image
      display none
</style>