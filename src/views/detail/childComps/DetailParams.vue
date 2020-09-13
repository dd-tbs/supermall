<template>
  <div class="param-info" v-if="Object.keys(goodsParams).length !== 0">
    <table v-for="(table,index) in goodsParams.table"
           :key="index" class="tables">
      <tr v-for="(tr,inx) in table" :key="inx" >
        <td v-for="(td,i) in tr" :key="td">{{td}}</td>
      </tr>
    </table>
    <table class="sets">
      <tr  v-for="(item,index) in goodsParams.sets">
        <td class="info-param-key">{{item.key}}</td>
        <td class="param-value">{{item.value}}</td>
      </tr>
    </table>
    <div v-if="goodsParams.image.length !== 0" class="img-info">
      <img :src="goodsParams.image" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailParams",
    props:{
      goodsParams:{
        type:Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .param-info{
    padding: 20px 15px;
    font-size: 15px;
    border-bottom: 5px solid #f2f5f8;
  }
  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr {
    height: 42px;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .sets{
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .param-value {
    color: #eb4868
  }
  .img-info img{
    width: 100%;
  }
</style>
