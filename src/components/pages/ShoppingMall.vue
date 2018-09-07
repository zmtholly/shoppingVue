<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3"><span class="iconfont location-icon">&#xe615;</span></van-col>
        <van-col span="16">
          <input type="text" class="search-input"/>
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!--swipwer area-->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--AD banner area-->
    <div class="ad-banner">
        <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <!--swiper-->
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price" :goodsMall="item.mallPrice"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import floorComponent from '../component/floorComponent'
import goodsInfo from '../component/goodsInfoComponent'
import { toMoney } from '../filter/moneyFilter.js'
import url from '@/serviceAPI.config.js'
export default {
  data () {
    return {
      bannerPicArray: [],
      category: [],
      adBanner: '',
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 3
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [] // 热卖商品
    }
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  created () {
    axios({
      url: url.getShoppingMallInfo,
      method: 'get'
    }).then(response => {
      console.log(response)
      if (response.status === 200) {
        this.bannerPicArray = response.data.data.slides
        this.category = response.data.data.category
        this.adBanner = response.data.data.advertesPicture
        this.recommendGoods = response.data.data.recommend
        this.floorName = response.data.data.floorName
        this.floor1 = response.data.data.floor1
        this.floor2 = response.data.data.floor2
        this.floor3 = response.data.data.floor3
        this.hotGoods = response.data.data.hotGoods
      }
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped lang="stylus">
  .search-bar
    height 2.2rem
    line-height 2.2rem
    background-color #e5017d
    text-align center
    overflow hidden
    .location-icon
      font-size 1.2rem
      color #ffffff
    .search-input
      width 100%
      height 1.3rem
      border none
      border-bottom 1px solid #ffffff
      background-color #e5017d
      color #ffffff
  .swiper-area
    width 100%
    clear both
    //max-height 15rem
    overflow: hidden
    height: 0
    padding-bottom: 44%
  .type-bar
    background-color #fff
    margin 0 .3rem .3rem .3rem
    border-radius .3rem
    font-size 14px
    display flex
    flex-direction row
    flex-wrap nowrap
    div
      padding .3rem
      font-size 12px
      text-align center
      flex 1
   .recommend-area
      background-color #fff
      margin-top .3rem
      .recommend-title
        border-bottom 1px solid #eee
        font-size 14px
        padding .2rem
        color #e5017d
      .recommend-body
        border-bottom 1px solid #eeeeee
        .recommend-item
          width 100%
          border-right 1px solid #eee
          font-size 12px
          text-align center
          box-sizing border-box
    .hot-area
      text-align center
      font-size 14px
      height 1.8rem
      line-height 1.8rem
      .hot-goods
        height 130rem
        overflow hidden
        background-color #ffffff
</style>
