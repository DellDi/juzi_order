// pages/shop/shop.js
//获取应用实例
const app = getApp()

Page({
  data: {
    city: wx.getStorageSync('city'),
    item: [{
        "name": "",
        "num": "",
        "dec": ""
      },
      {
        "name": "",
        "num": "",
        "dec": ""
      },
      {
        "name": "",
        "num": "",
        "dec": ""
      }

    ],

  },
  //事件处理函数
  bindmap: function() {
    var that = this;
    wx.navigateTo({
      url: '../logs/logs?city=' + that.data.city
    })
  },
  bindcity: function() {
    wx.navigateTo({
      url: '../shop/switchcity'
    })
  },
  onLoad: function() {
    var that = this;
    that.get_city_shop();
  },


  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function (e) {
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })




  get_city_shop: function() {
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/get_city_shop',
      method: 'GET',
      data: {
        latitude: wx.getStorageSync('latitude'),
        longitude: wx.getStorageSync('longitude'),
        openid: wx.getStorageSync('openid'),
        city: that.data.city
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        that.setData({
          shop_name: res.data,
          currentaddress: wx.getStorageSync('currentaddress'),
          // city:wx.getStorageSync('city')
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  storedetail: function(e) {
    var storeid = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: './storedetails?id=' + storeid
    })
  },
  onShow: function() {
    var that = this;
    that.get_city_shop();
  }
})