<template>
  <!--
    ref绑定在组件中,那么通过 this.$refs.refsname 获取到的就是这个组件对象
    ref绑定在普通元素中,那么通过 this.$refs.refsname 获取到的就是这个元素对象
  -->
  <div class="wrapper"  ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        scroll:null
      }
    },
    methods: {
      scrollTo(x,y,time=500) {
        this.scroll.scrollTo(x,y,time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      this.scroll.on('scroll',position=>{
        // console.log(position)
        this.$emit('scroll',position)
      })
      this.scroll.on('pullingUp',()=>{
        // console.log('上拉加载更多');
        this.$emit('pullingUp')
      })
    }
  }
</script>

<style scoped>

</style>
