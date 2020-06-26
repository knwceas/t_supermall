<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link"></a>
      <img :src="item.image" alt="" @load="imageLoad">
    </swiper-item>
  </swiper>
</template>

<script>
// 通过index.js统一导出组件
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper, 
    SwiperItem
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad') // 只发射一次
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>
