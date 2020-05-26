// pages/search/search.js
Page({
  youLike: wx.getStorageSync('youlikelist') || [],
  sortByCount(arr,key) {
    return arr.sort((a,b)=>{
      let x = a[key],
          y = b[key];
      return ((x<y)?1:((x>y)?-1:0));
    })
  },
  saveYouLike(value) {
    const val = decodeURI(value)
    const isInYouLike = this.youLike.some((item)=>{
      return item.text === val
    })
    if(isInYouLike) {
      this.youLike = this.youLike.map(item => {
        if (item.text == val) {
          item.count += 1;
        }
        return item
      })
    } else{
      this.youLike = this.youLike.concat({
        ...this.youLike,
        text: val,
        count: 1
      })
    }
    /* 保存到storage */
    wx.setStorageSync('youlikelist', this.youLike)
    console.log(this.youLike)
    /* 进行排序 */
    const top = (this.sortByCount(this.youLike, this.youLike.count))[0].text
    this.setData({
      youfavourite: top
    })
  },
  getWords(e) {
    const word = e.currentTarget.dataset.word;
    this.setData({
      inputValue: word
    })
    this.gotoSearch();
  },
  doyouLike() {
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
      fail: function (err) {
        console.log(err)
      },
      complete: function (res) { },
    })
  },
  sortList(e) {
    const sort = e.currentTarget.dataset.sort;
    const val = encodeURI(this.data.inputValue);
    wx.request({
      url: `http://www.xiongmaoyouxuan.com/api/search?word=${val}&start=0&sort=${sort}`,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res);
        this.setData({
          searchList: res.data.data.list
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  gotoSearch() {
    const val = encodeURI(this.data.inputValue);
    console.log(val)
    wx.request({
      url: `http://www.xiongmaoyouxuan.com/api/search?word=${val}&start=0&sort=0`,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res);
        this.setData({
          searchList: res.data.data.list
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    this.saveYouLike(val)
  },
  searchWords(e) {
    this.setData({
      inputValue: e.detail.value
    })
    
  },
  renderData() {
    wx.request({
      url: 'http://www.xiongmaoyouxuan.com/api/search/home',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        this.setData({
          hotWords: res.data.data.hotWords
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    hotWords: [],
    inputValue: '',
    searchList: [],
    introduceList: [],
    youfavourite: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.doyouLike();
    if (this.youLike.length>0){
      const top = (this.sortByCount(this.youLike, this.youLike.count))[0].text
      this.setData({
        youfavourite: top
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.renderData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.youLike)
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