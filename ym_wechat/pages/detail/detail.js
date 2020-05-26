// pages/detail/detail.js
//import store from '../../store/index.js';
const app = getApp();
Page({
  /* 加入购物车 */
  addToCartHandle() {
    const cartInfo = {
      id: this.data.id,
      detailThumb: this.data.detailSwiper[0].url,
      title: this.data.title,
      price: this.data.price
    }
    console.log(cartInfo)
    app.addToCart(cartInfo);
  },
  tabClick(e) {
    console.log(e)
    this.setData({
      activeIndex: e.currentTarget.dataset.index 
    })
  },
  /* 请求，渲染 */
  renderData(pid) {
    wx.request({
      url: `http://www.xiongmaoyouxuan.com/api/detail?id=${pid}&normal=1&sa=`,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        //console.log(res.data.data)
        this.setData({
          id: res.data.data.detail.id,
          detailSwiper: res.data.data.detail.photo,
          title: res.data.data.detail.title,
          price: res.data.data.detail.price,
          originPrice: res.data.data.detail.originPrice,
          descList: res.data.data.detail.descContentList
        })
      },
      fail: function(res) {
        console.log('failed')
      },
      complete: function(res) {},
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    detailSwiper: [],
    title: '',
    price: '',
    originPrice: '',
    descList: [],
    tabs: ['商品详情','购物须知'],
    activeIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pid = options.pid || 3970404
    this.renderData(pid);
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