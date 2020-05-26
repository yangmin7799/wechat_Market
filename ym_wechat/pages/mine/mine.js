// pages/mine/mine.js
const app = getApp()
Page({
  personInfor() {
    wx.navigateTo({
      url: '../personInfor/personInfor'
    })
  },
  service() {
    console.log('a')
  },
  setAddress() {
    wx.navigateTo({
      url: '../address/address'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    avatarUrl: '',
    order: [
      {
        icon: 'icon-daifukuan',
        name: '待付款'
      },
      {
        icon: 'icon-ziyuan',
        name: '待发货'
      },
      {
        icon: 'icon-yifahuo',
        name: '已发货'
      },
      {
        icon: 'icon-yiwancheng',
        name: '已完成'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nickname: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl
    })
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