<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="titleClick"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :goods_desc="goods_desc" :goods_image="goods_image"
      @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :setinfo="setinfo" :tables="tables"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  
  import {getDetail, Goods, Shop} from "network/detail";
  import {debounce} from "common/utils"

  export default {
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll
    },
    data() {
      return {
        goodsId: null,
        topImages: [],
        goods: {},
        shop: {},
        goods_desc: null,
        goods_image: [],
        setinfo: {},
        tables: [],
        commentInfo: [],
        themeTops: [],
        // _getOffsetTops: null
      }
    },
    created() {
      getDetail({goodsId:'123'}).then(res => {
        //console.log(res);
        const data = res.data;
        // 1.顶部的图片轮播数据
        this.topImages = data.banners
        // 2.获取商品信息
        this.goods = new Goods(data, data.logistics_info)
        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
       // 4.保存商品的详情数据
        this.goods_desc = data.goods_desc;
        this.goods_image = data.goods_image;
       // 5.获取参数的信息
        this.setinfo = data.spec.info.set
        this.tables = data.spec.rule.tables  
        // 2.7.保存评论信息
        if (data.commentInfo) {
          this.commentInfo = data.commentInfo;
        }  
      })
      // this._getOffsetTops()
      // this._getOffsetTops = debounce(() => {
      //   console.log('88888');  
      //   this.themeTops = []
      //   this.themeTops.push(0)
      //   this.themeTops.push(this.$refs.param.$el.offsetTop)
      //   this.themeTops.push(this.$refs.comment.$el.offsetTop)
      //  // console.log(this.themeTops);
      // },100)
    },
    methods: {
      imageLoad() { 
        console.log('----');
        
        this.$refs.scroll.refresh() 
      },
      _getOffsetTops () {
        this.themeTops = []
        this.themeTops.push(0)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
      },
      titleClick(index) { 
        this.$refs.scroll.refresh()  
        this._getOffsetTops()
        //console.log(this.themeTops[index]);
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 100)   
      },
      addToCart() {
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        // obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods_desc;
        obj.newPrice = this.goods.newPrice;
        // 3.添加到Store中  
        this.$store.commit('addCart', obj); // 载荷payload是一个对象
      },

    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
