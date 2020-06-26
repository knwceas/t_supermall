<template>
  <div v-if="commentInfo.length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div v-for="(item, index) in commentInfo">
      <div class="info-user">
        <img :src="item.userImage" alt="">
        <span>{{item.userName}}</span>
      </div>
      <div class="info-detail">
        <p>{{item.comment}}</p>
        <div class="info-other">
          <span class="date">2020-03-24</span>
          <span>{{commentInfo.buyInfo}}</span>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
  export default {
		name: "DetailCommentInfo",
    props: {
		  commentInfo: {
		    type: Array,
      }
    }
	}
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 8px;
  }
</style>
