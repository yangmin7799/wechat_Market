// pages/categroy/categroy.js
const app = getApp();
Page({
  /* 点击跳转列表页 */
  gotoList(e) {
    const url = e.currentTarget.dataset.listurl;
    const listId = url.slice(url.indexOf('=')+1)
    wx.navigateTo({
      url: `../list/list?listId=${listId}`,
      success: function(res) {
        console.log('success')
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /* 点击切换高亮 */
  tapChangeIndex(e) {
    this.currentIndex = e.currentTarget.dataset.index;
    this.requestContents(this.currentIndex);
    this.setData({
      currentIndex: this.currentIndex
    })

  },
  /* 请求目录 */
  requestCategory() {
    wx.request({
      url: 'https://www.xiongmaoyouxuan.com/api/tabs?sa=',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) =>{
        if(res.data.code == 200){
          this.setData({
            categoryList: res.data.data.list
          })
        }
      },
      fail: function(res) {
        console.log('failed:'+res)
      }
    })
  },
  /* 请求右侧内容 */
  requestContents(index = 2) {
    wx.request({
      url: 'http://www.xiongmaoyouxuan.com/api/tab/'+index+'?start=0',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if(res.data.code == 200) {
          this.setData({
            contents: res.data.data.categories
          })
        }
      },
      fail: function(res) {
        console.log('failed!')
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 2,
    categoryList: [],
    contents: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.id) {
      this.setData({
        currentIndex: options.id
      })
    }
    this.requestCategory();
    this.requestContents();
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
    app.setBadge();
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