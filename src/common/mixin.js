import {debounce} from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener:null
    }
  },
  mounted() {
    //  1. 监听item中的图片加载完成,加载完成一张就会执行一次
    const refresh = debounce(this.$refs.scroll.refresh,50)
    // 2. 对监听的事件进行保存
    this.itemImgListener = ()=> refresh()
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    console.log('我是混入中的内容');
  }
}
