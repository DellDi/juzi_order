// pages/my/invoicemodify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Invoice/detail',
      method: 'GET',
      data: {
        invoice: options.id
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        // console.log(res.data.invoice)

        that.setData({
          one_invoice: res.data.invoice
        })



      },
      fail: function(res) {},
      complete: function(res) {},
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

  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)

    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Invoice/modify',
      method: 'GET',
      data: {
        data: e.detail.value
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        if (res.data.result == 1) {
          wx.navigateBack({
            delta: 1
          })
          wx.redirectTo({
            url: './invoicetop',
          })
        } else {
          wx.showModal({
            title: '',
            content: res.data.msg,
          })
        }
        that.setData({
          card_bag: res.data
        })

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }


})