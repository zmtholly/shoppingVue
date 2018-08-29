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
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      msg: 'Shopping Mall',
      bannerPicArray: [],
      category: [],
      adBanner: []
    }
  },
  created () {
    axios({
      url: 'https://www.easy-mock.com/mock/5b8510a699996c76f26f7207/shoppingVue/index',
      method: 'get'
    }).then(response => {
      console.log(response)
      if (response.status === 200) {
        this.bannerPicArray = response.data.data.slides
        this.category = response.data.data.category
        this.adBanner = response.data.data.advertesPicture //获得广告图片
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
</style>
