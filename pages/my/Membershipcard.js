// pages/my/vipcard.js
//获取应用实例
const app = getApp()
Page({
  data: {
    nickname: '',
  },
  onLoad: function(options) {
    var that = this;
    that.get_member_info();

    getApp().getUserInfo(function(userInfo) {
      that.setData({
        nickname: app.globalData.userInfo.nickName
      })
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  get_member_info: function() {
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Member/get_member_info',
      method: 'GET',
      data: {
        shopid: wx.getStorageSync('shopid'),
        openid: wx.getStorageSync('openid')
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        that.setData({
          member_info: res.data
        })

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})