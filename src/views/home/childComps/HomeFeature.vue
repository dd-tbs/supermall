<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/feature_bg.jpg" alt="" @load="featureImgLoad">
    </a>
  </div>
</template>

<script>
  export default {
    name: "HomeFeature",
    methods:{
      featureImgLoad() {
        this.$emit('featureImgLoad')
      }
    }
  }
</script>

<style scoped>
  .feature img{
    width: 100%;
  }
</style>
