// pages/appointment/apponintdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // order_num: "20180506594559",

    // reservedate: '',
    // order_time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      order_num: options.order_num,
      order_time: options.order_date,
      reservedate: options.appoint_detail,
      shop_name: options.shop_name,
      table_num: options.table_num,
      id: options.id
    })
    //  console.log(that)
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
  cancel_appoint: function(e) {
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
      success: function(res) {
        if (res.data.result == 1) {
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 1500
          })
          wx.redirectTo({
            url: './appointment'
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})