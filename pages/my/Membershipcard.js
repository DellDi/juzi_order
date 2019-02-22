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
    that.setData({
      nickname: app.globalData.nickname
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
      // method: 'GET',
      data: {
        shopid: getApp().globalData.shopid,
        openid: getApp().globalData.openid
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
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