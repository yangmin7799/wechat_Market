// pages/cart/cart.js
import store from '../../store/index.js'
const app = getApp();
Page({
  x:0,
  y:0,
  checkedCartItems: [],
  /* 删除商品 */
  delCart(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除宝贝吗？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确认',
      success: (res)=> {
        if (res.confirm){
          /* 确认删除 */
          const cartLists = this.data.cart.filter((item) => {
            if (item.id !== id) {
              return item
            }
          })
          this.setData({
            cart: cartLists
          })
          wx.setStorageSync('cartList', this.data.cart)
          app.setBadge();
          app.productlist = this.data.cart;
        }
      },
      fail: function(res) {},
      complete: (res) => {
        this.setData({
          left: 0
        })
      },
    })
  },
  itemTouchStart(e) {
    this.setData({
      left: 0
    })
    this.x = e.touches[0].pageX;
    this.setData({
      currentId: e.currentTarget.dataset.id
    })
  },
  itemTouchMove(e) {
    this.setData({
      currentId: e.currentTarget.dataset.id
    })
    const currentX = e.touches[0].pageX;
    let distance = currentX - this.x;
    if(distance < -150) {
      distance = -150
    }
    if(distance > 0){
      distance = 0
    }
    this.setData({
      left: distance
    })
  },
  itemTouchEnd(e) {
    console.log(e)

  },
  /* 减少数量 */
  decNum(e) {
    const cartList = this.data.cart.map((item)=>{
      if (item.id === e.currentTarget.dataset.id) {
        if (item.count>1){
          item.count--;
        }else{
          wx.showToast({
            title: '宝贝不能再少了哟!',
            icon: 'info'
          })
        }
      }
      return item;
    })
    this.setData({
      cart: cartList
    })
    wx.setStorageSync('cartList', this.data.cart)
  },
  /* 增加数量 */
  incNum(e) {
    const cartList = this.data.cart.map((item) => {
      if (item.id === e.currentTarget.dataset.id) {
          item.count++;
      }
      return item;
    })
    this.setData({
      cart: cartList
    })
    wx.setStorageSync('cartList', this.data.cart)
  },
  /* 全选 */
  toggleChecked() {
    this.setData({
      isAllCheck: !this.data.isAllCheck
    })
    this.setData({
      isChecked: this.data.isAllCheck
    })
    if (this.data.isChecked) {
      this.checkedCartItems = this.data.cart;
      this.calcuTotalPrice();
    } else {
      this.setData({
        totalPrice: 0
      })
    }
  },
  /* 单选 */
  calcPrice(e) {
    const targetItems = e.currentTarget.dataset
    const isInChecked = this.checkedCartItems.some((item)=>{
      return targetItems.id === item.id
    })
    if(!isInChecked) {
      this.checkedCartItems = this.checkedCartItems.concat({
        ...targetItems
      })
    } else {
      this.checkedCartItems = this.checkedCartItems.filter((item)=>{
        if(item.id !== targetItems.id){
          return item
        }
      })
    }
    /* 判断是否都勾选上了 */
    if (this.checkedCartItems.length === this.data.cart.length) {
      this.setData({
        isAllCheck: true
      })
    } else {
      this.setData({
        isAllCheck: false
      })
    }
    this.calcuTotalPrice()
  },
  /* 进行计算 */
  calcuTotalPrice() {
    const total = this.checkedCartItems.reduce((result, item) => {
      result += item.price * item.count;
      return result;
    }, 0)
    this.setData({
      totalPrice: total.toFixed(2)
    })
  },
  /* 请store里面请求购物车数据 */
  getCartFromStore() {
    this.setData({
      cart: store.getState().cart.cartItems
    })
  },
   /* 请app里面请求购物车数据 */
  getCartFromApp() {
    this.setData({
      cart: wx.getStorageSync('cartList')
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    isChecked: false,
    isAllCheck: false,
    totalPrice: 0,
    left: 0,
    currentId: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartFromApp();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCartFromApp();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})