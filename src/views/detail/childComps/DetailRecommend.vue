<template>
  <div>
    <div class="info-header">热门推荐</div>
    <goods-list :goods="recommends"></goods-list>
  </div>
</template>

<script>
  import GoodsList from 'components/content/goods/GoodsList'
  export default {
    name: "DetailRecommend",
    components:{
      GoodsList
    },
    props:{
      recommends:{
        type:Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>
