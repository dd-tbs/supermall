<template>
  <div id="home" >
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="backTopScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swipImgLoad="swipImgLoad"></home-swiper>
      <home-recommends :recommends="recommends"></home-recommends>
      <home-feature @featureImgLoad="featureImgLoad"/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
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
  import { debounce } from 'common/utils'
  import {itemListenerMixin} from "common/mixin";

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
        isShowBackTop:false,
        tabSwipOffsetTop:0,
        tabFeatOffsetTop:0,
        isTabFixed:false,
        saveY:0

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
    destroyed() { //页面销毁
      console.log('Home destroyed');
    },
    activated() { //活跃时的状态
      // console.log('activated');
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){ //离开时的状态
      // console.log('deactivated');
      //保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      //取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    //混入对象
    mixins:[itemListenerMixin],
    mounted() {
     //封装在mixin.js中


      // this.$bus.$on('homeItemImageLoad',()=>{
      //   refresh()
      // })


    },
    methods:{
     /*
     * 事件监听相关方法
     */

     //点击切换tab
     tabClick(index) {
       // console.log(index);
      this.currentType = Object.keys(this.goods)[index]
       this.$refs.tabControl1.currentIndex = index
       this.$refs.tabControl2.currentIndex = index
     },
      //回到顶部
      topClick() {
        // this.$refs.scroll.scroll.scrollTo(0,0)
        this.$refs.scroll.scrollTo(0,0)
      },
      //监听页面滚动
      backTopScroll(position) {
        // console.log(position);
        // this.isShowBackTop = position.y < -1000
        //判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        //决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > (this.tabFeatOffsetTop)
        // console.log(this.isTabFixed)
        // console.log('tabFeatOffsetTop:',this.tabFeatOffsetTop);
      },
      loadMore() {
        // console.log('上拉加载更多')
        // 加载当前的tab的数据
        this.getHomeGoods(this.currentType)

      },
      swipImgLoad() {
        // 获取tabControl的offsetTop
        //所有的组件中都有一个属性$el,用于获取组件中的元素
        this.tabSwipOffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.tabOffsetTop);
      },
      featureImgLoad() {
       this.tabFeatOffsetTop = this.$refs.tabControl2.$el.offsetTop
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

          //设置可以多次上拉加载
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    /*视口高度*/
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;

    /*在原生的滚动中为了让导航不跟随浏览器一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .tab-control{
    position: relative;
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
