<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车" />
    </div>
    <!-- 清空购物车 -->
    <div class="cart-title">
      <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>
    <!--显示购物车中的商品-->
    <div class="cart-list">
      <div class="cart-row" v-for="(item,index) in cartInfo" :key="index">
        <div class="cart-img"><img :src="item.image" width="100%" /></div>
        <div class="cart-text">
          <div class="cart-goods-name">{{ item.Name }}</div>
          <div class="cart-control"><van-stepper v-model="item.count"/></div>
        </div>
        <div class="cart-goods-price">
          <div>￥{{ item.price | moneyFilter }}</div>
          <div>x{{item.count}}</div>
          <div class="allPrice">
            ￥{{ item.price * item.count | moneyFilter }}
          </div>
        </div>
      </div>
    </div>
    <!--显示总金额-->
    <div class="totalMoeny">
        商品总价:￥{{totalMoney | moneyFilter}}
    </div>
  </div>
</template>

<script>
import { toMoney } from '../filter/moneyFilter.js'
export default {
  data () {
    return {
      cartInfo: [], // 购物车内的商品
      isEmpty: false // 购物车是否为空，不为空则显示true，为空显示false
    }
  },
  created () {
    this.getCartInfo()
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  computed: {
    totalMoney () {
      let allMoney = 0
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count
      })
      localStorage.cartInfo = JSON.stringify(this.cartInfo)
      return allMoney
    }
  },
  methods: {
    // 得到购物车商品
    getCartInfo () {
      // 判断localStorage里是否有购物车数据
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo)
      }
      // 打印到控制台查看效果
      console.log('this.cartInfo:' + JSON.stringify(this.cartInfo))
      this.isEmpty = (this.cartInfo.length > 0) === 'true'
    },
    // 清空购物车商品
    clearCart () {
      localStorage.removeItem('cartInfo')
      this.cartInfo = []
    }
  }
}
</script>

<style scoped lang="stylus">
.cart-title
  height 2rem
  line-height 2rem
  background-color #ffffff
  border-bottom 1px solid #e4e7ed
  padding 5px
  text-align right
.cart-list
  background-color #ffffff
  .cart-row
    display flex
    flex-direction row
    flex-wrap nowrap
    padding 0.5rem
    font-size 0.85rem
    border-bottom 1px solid #e4e7ed
    .cart-img
      flex 6
    .cart-text
      flex 14
      padding-left 10px
      .cart-control
        padding-top 10px
    .cart-goods-price
      flex 4
      text-align right
.totalMoney
  text-align right
  background-color #ffffff
  border-bottom 1px solid #e4e7ed
  padding 5px
</style>
