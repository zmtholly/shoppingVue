const BASEURL = 'https://www.easy-mock.com/mock/5b8510a699996c76f26f7207/shoppingVue/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL + 'index', // 商城首页
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register', // 用户注册接口
  login: LOCALURL + 'user/login', // 用户登录接口
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', // 获取商品详情
  getCategoryList: LOCALURL + 'goods/getCategoryList', // 获取大类信息
  getCategorySubList: LOCALURL + 'goods/getCategorySubList', // 获取小类信息
  getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID' // 得到小类商品信息
}

module.exports = URL
