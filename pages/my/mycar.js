// pages/my/cardbag.js
Page({
  data: {
    selected: true,
    selected1: false,
    showView: true,

    item: [{
        id: "0",
        money: "30",
        voucher: "满减券",
        vouche: "代金券",
        story: "",
        usertime: "全天可用",
        startdeta: "2018.07.25",
        enddeta: " 2018.07.25",
        use: "未使用",
        not: "不计代金券",
        notuse: "未使用"
      },
      // {
      //   id: "1",
      //   money: "30",
      //   voucher: "满减券",
      //   vouche: "代金券",
      //   story: "",
      //   usertime: "全天可用",
      //   startdeta: "2018.07.25",
      //   enddeta: " 2018.07.25",
      //   use: "未使用",
      //   not: "不计代金券",
      //   notuse: "未使用"
      // },
      // {
      //   id: "2",
      //   money: "300",
      //   voucher: "满减券",
      //   vouche: "代金券",
      //   story: "",
      //   usertime: "全天可用",
      //   startdeta: "2018.07.25",
      //   enddeta: " 2018.07.25",
      //   use: "已使用",
      //   not: "不计代金券",
      //   notuse: "未使用"
      // },
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
          card_bag: res.data
        })

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  share: function (e) {
    // console.log(e)
    wx.navigateTo({
      url: '../share/sharecar?id=' + e.currentTarget.dataset.id,
    })
  }


})