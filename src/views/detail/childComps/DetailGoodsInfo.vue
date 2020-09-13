<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <!--【2件69元】【新品特惠】【赠送运费险 七天无理由退换货】【无忧售后】-->
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <!--<div class="info-key">-->
      <!--&lt;!&ndash;穿着效果&ndash;&gt;-->
      <!--{{detailInfo.detailImage[0].key}}-->
    <!--</div>-->
    <!--<div class="info-list">-->
      <!--&lt;!&ndash;图片列表&ndash;&gt;-->
      <!--<img v-for="(item,index) in detailInfo.detailImage[0].list" :src="item" :key="index" @load="imgLoad" alt="">-->
    <!--</div>-->
      <div v-for="item in detailInfo.detailImage">

        <div class="info-key">{{item.key}}</div>
        <div class="info-list">
          <img v-for="(item2,index) in item.list" :src="item2" :key="index">
        </div>

      </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props:{
      detailInfo:{
        type:Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return{
        current:0,
        imageListLength:0
      }
    },
    methods:{
      imgLoad() {
        //判断所有图片是否加载完成,再进行一次回调就可以了
        if (++this.current === this.imageListLength) {
          this.$emit('goodsImageLoad')
        }
      }
    },
    //监听属性的变化
    watch: {
      detailInfo(){
        //获取图片的个数
        this.imageListLength = this.detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
  .goods-info{
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }
  .info-desc{
    padding: 0 15px;
  }
  .info-key{
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }
  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-list img{
    width: 100%;
  }
</style>
