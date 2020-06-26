<template>
  <div v-if="goods_image.length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{goods_desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-list">
      <img v-for="(item, index) in goods_image" :key="index" :src="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      goods_desc: {
        type: String
      },
      goods_image: {
        type: Array
      }
    },
    data() {
			return {
				counter: 0,
        imagesLength: 0
      }
    },
    methods: {
	    imgLoad() {
        // 判断, 所有的图片都加载完了, 那么进行一次回调就可以了.
        if (++this.counter === this.imagesLength) { 
          this.$emit('imageLoad');     
        }
	    }
    },
    watch: {
	    detailInfo() {
	      // 获取图片的个数
	    	this.imagesLength = this.goods_image.length
	    }
    }
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
    margin-bottom: 20px;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-list img {
    width: 100%;
  }
</style>
