// pages/order/myorder.js
Page({
  data: {
    selected: true,
    selected1: false,
    showView: -1,
    index: 0,
    num: 'A201',
    item: [{
        id: "http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg",
        image: "http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg",
        name: "小龙虾",
        massage: "",
        mon: "$65.0",
        numb: "2"
      },
      {
        id: "http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg",
        image: "http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg",
        name: "小龙虾",
        mon: "$65.0",
        numb: "2"
      },
      {
        id: "http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg",
        image: "http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg",
        name: "小龙虾",
        mon: "$65.0",
        numb: "2"
      }
    ]
  },
  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    // showView: (options.showView == "true" ? true : false)
    var that = this;
    that.history_order();
  },
  onChangeShowState: function(e) {
    // console.log(e)
    var that = this;
    var toggleBtnVal = that.data.showView;
    var itemId = e.target.dataset.index;
    // console.log(toggleBtnVal, itemId);
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
  history_order: function() {
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Order/order',
      method: 'GET',
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log(res.data[0])
        that.setData({
          order: res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})