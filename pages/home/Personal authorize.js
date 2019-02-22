// pages/home/home/searc.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getUserInfo(e) {
    if (e.detail.detail.errMsg) {
      this.setData({
        click_again: true
      })
      this.onShow()
    }
  },
  cc: function () {
    this.setData({
      get_userinfo: true,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var _this = this;
    wx.getUserInfo({
      success: function (res) {
        if (getApp().globalData.openid!==null){
        console.log(res)
          getApp().register(res.userInfo)
        }
       getApp().globalData.userInfo=res.userInfo;
        getApp().globalData.headimgurl = res.userInfo.avatarUrl;
        getApp().globalData.nickname = res.userInfo.nickName;
        wx.switchTab({
          url: '/pages/home/home',
        })
      },
      fail() {
        _this.setData({
          get_userinfo: true
        })
      }
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

