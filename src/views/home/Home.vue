<template>
  <div id="home" >
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>


    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="backTopScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommends :recommends="recommends"></home-recommends>
      <home-feature />
      <tab-control class="Tab-control"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods" />
    </scroll>
    <!--
      .native 监听组件的原生事件必须给对应的事件加上 .native 修饰符
    -->
    <back-top @click.native="topClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommends from './childComps/HomeRecommends'
  import HomeFeature from './childComps/HomeFeature'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'

  import { getHomeMultidata,getHomeGoods } from "network/home";

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      HomeRecommends,
      HomeFeature,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShowBackTop:false
      }
    },
    computed:{
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.获取轮播图和四个小分类的数据
      this.getHomeMultidata()
      // 2.获取tabcontrol下面的数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods:{
     /*
     * 事件监听相关方法
     */

     tabClick(index) {
       // console.log(index);
      this.currentType = Object.keys(this.goods)[index]
     },
      topClick() {
        // this.$refs.scroll.scroll.scrollTo(0,0)
        this.$refs.scroll.scrollTo(0,0)
      },
      backTopScroll(position) {
        // console.log(position);
        // this.isShowBackTop = position.y < -1000
        this.isShowBackTop = -position.y > 1000
      },
      loadMore() {
        // console.log('上拉加载更多')
        // 加载当前的tab的数据
        this.getHomeGoods(this.currentType)

      },

      /*
      * 网络请求相关方法
      */
      getHomeMultidata() {
        getHomeMultidata().then(res=>{
          // console.log(res)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //设置可以多次下拉加载
          this.$refs.scroll.finishPullUp()
          //图片加载完成刷新页面
          this.$refs.scroll.scroll.refresh()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    /*视口高度*/
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .Tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  /*.content{*/
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  /*}*/

  .content{
    overflow: hidden;
    position:absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
