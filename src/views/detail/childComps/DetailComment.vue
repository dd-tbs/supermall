<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="header-info">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多 ></div>
    </div>
    <div class="user-info">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="detail-info">
      <p>{{commentInfo.content}}</p>
      <div class="other-info">
        <span class="date">{{commentInfo.created | showData}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="imgs-info">
        <img :src="item" v-for="(item, index) in commentInfo.images">
      </div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from 'common/utils'
  export default {
    name: "DetailComment",
    props:{
      commentInfo:{
        type:Object,
        default() {
          return {}
        }
      }
    },
    filters:{
      showData(value) {
        //时间戳是以 秒 为单位,new Data()传的是毫秒, *1000转换为毫秒,再把新的时间戳转为Date对象
        let date = new Date(value*1000)
        //将date格式化
        return formatDate(date,'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
  .comment-info{
    padding: 5px 12px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .header-info{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .header-title{
    float: left;
    font-size: 15px;
  }
  .header-more{
    float: right;
    font-size: 13px;
  }
  .user-info{
    padding: 10px 0 5px;
  }
  .user-info img{
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .user-info span{
    position: relative;
    top: -15px;
    margin-left: 10px;
    font-size: 15px;
  }
  .detail-info{
    padding: 0 5px 15px;
  }
  .detail-info p{
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }
  .detail-info .other-info{
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
  .other-info .date{
    margin-right: 8px;
  }
  .imgs-info{
    margin-top: 10px;
  }
  .imgs-info img{
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
