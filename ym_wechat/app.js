//app.js
App({
  productlist: [],
  addToCart(cartItems) {
    console.log(this.productlist)
    const isInCart = this.productlist.some((item) =>item.id == cartItems.id);
    if(isInCart) {
      this.productlist = this.productlist.map(item=>{
        if(item.id == cartItems.id){
          item.count +=1;
        }
        return item
      })
    }else {
      this.productlist = this.productlist.concat({
        ...cartItems,
        count: 1
      })
    }
    wx.showToast({
      title: '宝贝加入成功'
    })
    wx.setStorageSync('cartList', this.productlist);
    this.setBadge();
  },
  syncCartStorage() {
    console.log(this.productlist)
    wx.setStorageSync('cartList', this.productlist)
  },
  setBadge() {
    //const text = this.productlist.length.toString();
    const text = wx.getStorageSync('cartList').length.toString();
    wx.setTabBarBadge({
      index: 2,
      text
    })
  },
  onLaunch: function () {
    //this.productlist= wx.getStorageSync('cartList')
    if (this.productlist.length>0){
      this.productlist = wx.getStorageSync('cartList')
    }
    this.setBadge();
    //展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function() {
    this.setBadge();
  },
  onHide: function(){
  },
  globalData: {
    userInfo: null
  }
})