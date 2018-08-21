Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: [
      // {
      //   title:"南京红桔信息技术有限公司",
      //   num:"461616161644543654",
      // },
      // {
      //   title: "南京红桔信息技术有限公司",
      //   num: "461616161644543654",
      // }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Invoice/lst',
      method: 'GET',
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        // console.log(res.data)

        that.setData({
          invoice: res.data
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
  invoice: function(e) {
    console.log(e)
    wx.navigateTo({
      url: './invoicetop?id=' + e.currentTarget.dataset.id,
    })
  }
})