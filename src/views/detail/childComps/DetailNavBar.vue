<template>
  <nav-bar class="detail-nav">
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles" 
      class="title-item" @click="itemClick(index)"
      :class="{active: index == currentIndex}">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      backClick() {
        this.$router.go(-1)
      },
      itemClick(index) {
        this.currentIndex = index
        this.$emit('itemClick', index)
      }
    }
  }
</script>

<style scoped>
  .detail-nav {
    background-color: #fff;
    font-weight: normal;
  }

 .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text)
  }
  .back img {
    margin-top: 12px;
  }
</style>
