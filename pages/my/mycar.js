// pages/my/cardbag.js
Page({
  data: {
    selected: true,
    selected1: false,
    showView: true,

    item: [{

      },
    ]
  },
  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    showView: (options.showView == "true" ? true : false)
    var that = this;
    that.card_bag();
  },
  onChangeShowState: function() {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  selected: function(e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function(e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  card_bag: function() {
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Voucher/card_bag',
      // method: 'GET',
      data: {
        openid: getApp().globalData.openid
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function(res) {
        console.log(res)
        that.setData({
          card_bag: res.data
        })

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  share: function (e) {
    wx.navigateTo({
      url: '../share/sharecar?id=' + e.currentTarget.dataset.id,
    })
  }


})