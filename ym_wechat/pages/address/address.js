// pages/address/address.js
Page({
  startMap() {
    this.setData({
      isShow: true
    })
  },
  getCurrentAddress() {
    wx.getLocation({
      type: 'gcj02',
      success: (res)=> {
        const {
          latitude,
          longitude
        } = res;
        /* 修改一次位置 */
        this.setData({
          latitude,
          longitude
        })
        /* 逆地址解析 */
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=5XZBZ-C3TH6-DT6SQ-MGY4L-6XWPS-TRBGR&get_poi=1`,
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (res) => {
            console.log(res)
            this.setData({
              address: res.data.result.address
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
    
  },
  
  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    isShow: false,
    latitude: 39.984154,
    longitude: 116.307490,
    markers: [{
      iconPath: "../../assets/icons/location.png",
      id: 0,
      width: 50,
      height: 50
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      markers: [{
        ...this.data.markers,
        longitude: this.data.longitude,
        latitude: this.data.latitude
      }
      ]
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
    this.setData({
      markers: [{
        ...this.data.markers,
        longitude: this.data.longitude,
        latitude: this.data.latitude
      }
      ]
    })
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