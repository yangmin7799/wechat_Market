// pages/list/list.js
Page({
  /* 请求参数所对应的数据，进行渲染 */
  renderTitle() {
    wx.setNavigationBarTitle({
      title: `${this.data.categoryName}`
    })
  },
  /* 跳转到详情 */
  gotoDetail(e) {
    const pid = e.currentTarget.dataset.pid;
    wx.navigateTo({
      url: `../detail/detail?pid=${pid}`,
      success: function(res) {
        console.log('ok')
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
    categoryName: '',
    categoryList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.listId || 1823
    wx.request({
      url: `http://www.xiongmaoyouxuan.com/api/category/${id}/items?start=0`,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) =>{
        this.setData({
          categoryName: res.data.data.categoryName,
          categoryList: res.data.data.items.list
        })
        this.renderTitle();
      },
      fail: function(res) {},
      complete: function(res) {},
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