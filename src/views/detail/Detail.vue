<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" />
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @goodsImageLoad="goodsImageLoad"/>
      <detail-params :goodsParams="goodsParams"/>
      <detail-comment :commentInfo="commentInfo"/>
      <detail-recommend :recommends="recommends"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParams from './childComps/DetailParams'
  import DetailComment from './childComps/DetailComment'
  import DetailRecommend from './childComps/DetailRecommend'


  import Scroll from 'components/common/scroll/Scroll'

  import { debounce } from 'common/utils'
  import { getDetail,Goods,Params,getRecommend } from 'network/detail'
  import {Shop} from "../../network/detail";
  import { itemListenerMixin } from "common/mixin";

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParams,
      DetailComment,
      DetailRecommend,
      Scroll,
    },
    data() {
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        goodsParams:{},
        commentInfo:{},
        recommends:[]
      }
    },
    created() {
      // 1.保存传入的iid
      // console.log(this.$route.params.iid);
      this.iid = this.$route.params.iid
      //  2.根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        // console.log(res)
        const data = res.result
        // 1. 获取顶部的轮播图数据
        this.topImages = data.itemInfo.topImages

        // 2. 获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        // 3. 创建店铺信息对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品详细信息
        this.detailInfo = data.detailInfo

        // 5.获取参数的信息
        this.goodsParams = new Params(data.itemParams.info,data.itemParams.rule)

        // 6.获取评论信息
        if (data.rate.cRate) {
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3.获取热门推荐数据
      getRecommend().then(res=>{
        // console.log(res);
        this.recommends = res.data.list
      })
    },
    methods:{
      goodsImageLoad() {
        this.$refs.scroll.refresh()
      }
    },
    mixins:[itemListenerMixin],
    mounted() {
      // const refresh = debounce(this.$refs.scroll.refresh,50)
      // this.$bus.$on('detailItemImageLoad',()=>{
      //   refresh()
      //  })

    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height:100vh;
  }
  .nav-bar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
