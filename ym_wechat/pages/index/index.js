//index.js
//获取应用实例
const app = getApp()

Page({
  gotoSearch() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  gotoCate(e) {
    console.log(e)
    const id = e.currentTarget.dataset.id;
    wx.switchTab({
      url: `../categroy/categroy?id=${id}`,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  showNevList(e) {
    this.setData({
      hideNev: !(this.data.hideNev)
    })
  },
  data: {
    imgUrls:  ['https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/31/31888.jpg','https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/31/31866.jpg','https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/31/31904.jpg'
    ],
    navList: [],
    introduceList: [],
    currentIndex: 1,
    hideNev: true
  },
  //事件处理函数
  bindViewTap: function() {
   
  },
  onLoad: function () {
    wx.request({
      url: 'https://www.xiongmaoyouxuan.com/api/tabs?sa=',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        this.setData({
          navList: res.data.data.list
        })
      },
      fail: function(err) {
        console.log(err)
      },
      complete: function(res) {
        console.log('请求完成！')
      },
    })
    wx.request({
      url: 'https://www.xiongmaoyouxuan.com/api/tab/3?start=0',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        this.setData({
          introduceList: res.data.data.items.list
        })
      },
      fail: function(err) {
        console.log(err)
      },
      complete: function(res) {},
    })
  }
})
