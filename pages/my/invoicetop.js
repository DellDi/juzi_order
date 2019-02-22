Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 修改企业信息
  bingrequest: function() {
    wx: wx.navigateTo({
      url: '../my/invoiceinput',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 删除弹窗
  bingdelect: function() {
    wx.showToast({
      title: '成功',
      icon: 'succes',
      duration: 1200,
      mask: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.invoicetop(options.id);
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
  invoicetop: function(invoice_id) {
    console.log(invoice_id)
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Invoice/detail',
      //  method: 'GET',
      data: {
        invoice: invoice_id
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function(res) {
        that.setData({
          one_invoice: res.data.invoice
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bingdelete: function(e) {
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Invoice/delete',
      // method: 'GET',
      data: {
        invoice_id: e.currentTarget.dataset.id
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function(res) {
        if (res.data.result == 1) {
          wx.navigateTo({
            url: './invoice'
          })
        } else {
          wx.showModal({
            title: '',
            content: res.data.msg,
          })
        }
        that.setData({
          one_invoice: res.data.invoice
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bingrequest: function(e) {
    wx.navigateTo({
      url: './invoicemodify?id=' + e.currentTarget.dataset.id,
    })
  }
})