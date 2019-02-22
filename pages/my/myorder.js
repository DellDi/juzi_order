// pages/order/myorder.js
Page({
  data: {
    selected: true,
    selected1: false,
    showView: -1,
    index: 0,
    num: 'A201',
    
  },
  onLoad: function (options) { 
    // 生命周期函数--监听页面加载 
    // showView: (options.showView == "true" ? true : false)
    var that = this;
    that.history_order();
  },
  onChangeShowState: function (e) {
    var that = this;
    var toggleBtnVal = that.data.showView;
    var itemId = e.target.dataset.index;
    if (toggleBtnVal == itemId) {
      that.setData({
        showView: -1,
      })
    } else {
      that.setData({
        showView: (itemId),
      })
    }

  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  history_order: function () {
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Order/order',
      // method: 'GET',
      data: {
        openid: getApp().globalData.openid
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        that.setData({
          order: res.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  // 取消订单
  cancel: function (e) {
    var that = this;
    var domain = getApp().globalData.domain;
    wx: wx.request({
      url: domain + 'Orderdish/cancel_order',
      // method: 'GET',
      data: {
        order_num: e.currentTarget.dataset.orderid 
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        if (res.data.result == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1500
          })
          that.onLoad();
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 立即支付
  order: function (e) {
    wx: wx.navigateTo({
      url: '../menu/paymentmenu?order_num=' + e.currentTarget.dataset.orderid,
    })
  }
})