// pages/homearch.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputVal: '',
    hidden: true,
    food: [],
    modalhidden: true,
    searchRecord: []
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function(options) {
    this.openHistorySearch()
  },
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  bindkeyInput: function(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  searchSubmitFn: function(e) {
    console.log(e)
    var that = this;
    if (this.data.inputVal == '') {
      this.setData({
        modalhidden: false
      })
      return;
    }
    wx: wx.request({
      url: getApp().globalData.domain + 'Menu/menu_search',
      method: 'GET',
      data: {
        shopid: 2,
        keywords: e.detail.value.input
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        that.setData({
          food: res.data,
          hidden: true,
        })
        that.setSearchStorage()
      }
    })
  },
  hideModal: function() {
    this.setData({
      modalhidden: true
    })
  },
  clearinput: function() {
    this.setData({
      inputVal: ''

    })
  },
  openHistorySearch: function() {
    this.setData({
      searchRecord: wx.getStorageSync('searchRecord') || [], //若无储存则为空
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  setSearchStorage: function(e) {
    var that = this;
    var inputVal = that.data.inputVal;
    var searchRecord = this.data.searchRecord;
    if (inputVal == '') {
      //输入为空时的处理
    } else {
      //将搜索值放入历史记录中,只能放前五条
      if (searchRecord.length < 12) {
        searchRecord.unshift({
          value: inputVal,
          id: searchRecord.length
        })
      } else {
        searchRecord.pop() //删掉旧的时间最早的第一条
        searchRecord.unshift({
          value: inputVal,
          id: searchRecord.length
        })
      }
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecord', searchRecord)
    }
  },
  historyDelFn: function() {
    wx.clearStorageSync('searhRecord')
    this.setData({
      searchRecord: []
    })
  },
})