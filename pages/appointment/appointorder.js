// pages/appointment/appointorder.js
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [
      {
        stor: "福田",
        mun: "A02",
        appintmun: "435463546365",
        appinttime: "2018-8-17,12:38",
        style: "2018-8-18,9:30,上午茶",
      },
      {
        stor: "商城路",
        mun: "A02",
        appintmun: "435463546365",
        appinttime: "2018-8-17,12:38",
        style: "2018-8-18,9:30,上午茶",
      },
      {
        stor: "紫金山",
        mun: "A02",
        appintmun: "435463546365",
        appinttime: "2018-8-17,12:38",
        style: "2018-8-18,9:30,上午茶",
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
   wx.request({
      url: getApp().globalData.domain + '/Appointment/appoint_lst',
      data: {
        openid: wx.getStorageSync('openid')
      },
      method: 'GET',
      header: { 'Accept': 'application/json' },
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        that.setData({
          appoint: res.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },
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

  },
  cancel: function (e) {
    // console.log(e)
    var that = this;
    var domain = getApp().globalData.domain;
    wx: wx.request({
      url: domain + 'Appointment/cancel_appoint',
      method: 'GET',
      data: {
        appointid: e.currentTarget.dataset.appointid
      },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        if (res.data.result == 1) {
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 1500
          })
          that.onLoad();
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})