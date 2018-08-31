const BASEURL = 'https://www.easy-mock.com/mock/5b8510a699996c76f26f7207/shoppingVue/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL + 'index', // 商城首页
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register' // 用户注册接口
}
module.exports = URL
