<template>
  <div id='home' class="wrapper"> 
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']"
        @tabClick="tabClick" ref="tabControl1" 
        v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" 
      :probe-type="3" @scroll="contentScroll" 
      :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
        @tabClick="tabClick" ref="tabControl2"/>
      <good-list :goods="showGoods"/>
    </scroll> 
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import { getHomeMultidata, getHomeGoods } from 'network/home'; 
  import {debounce} from "common/utils"; 

  export default {
    components: { 
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          '1001': {page: 0, list: []},
          '1002': {page: 0, list: []},
          '1003': {page: 0, list: []},
        },
        currentTabId: '1001',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
      //goods['1001'].list
        return this.goods[this.currentTabId].list
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('1001')
      this.getHomeGoods('1002')
      this.getHomeGoods('1003')
      //this.getHomeGoods()
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentTabId = '1001' 
            break;
          case 1:
            this.currentTabId = '1002' 
          break;
          case 2:
            this.currentTabId = '1003' 
          break;
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        return this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
        this.isTabFixed = (-position.y) > this.tabOffsetTop 
      },
      loadMore() {
        // 获取字符串最后一位
        //console.log(Number(this.currentTabId.charAt(this.currentTabId.length-1))-1);
        let str = this.currentTabId
        //Number(str.charAt(str.length-1))-1
        this.getHomeGoods(str)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
  
      getHomeMultidata() {
         getHomeMultidata().then(res => {
        //console.log(res); 会被回收
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(tabId) {
        const page = this.goods[tabId].page + 1
        getHomeGoods(tabId, page).then(res => {
          // 可变参数，将数组中的元素依次取出
          this.goods[tabId].list.push(...res.data.item)
          this.goods[tabId].page +=1
          //console.log(res);  

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
/* 作用域 scoped 不加会影响滚动 */
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

   .tab-control {
    position: relative;
    z-index: 9;
  }

   .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    
  }
</style>