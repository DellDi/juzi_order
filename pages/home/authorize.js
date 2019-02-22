const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
Page({
  data: {
    hidden: true
  },
  onLoad: function () {
    this.handler();
  },
  onShow: function () {
    this.onLoad()
  },
  handler: function () {

    var that = this;
    var demo = new QQMapWX({
      key: 'O2KBZ-PW4CU-ULQVR-4SUWE-RMP67-D6BVP'
    });
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userLocation']) {
        } else {
          that.setData({ hidden: false })
          wx.getLocation({
            type: 'gcj02',
            success: function (res) {
              getApp().globalData.latitude = res.latitude
              getApp().globalData.longitude = res.longitude
              demo.reverseGeocoder({
                //腾讯地图api 逆解析方法 首先设计经纬度
                location: {
                  latitude: getApp().globalData.latitude,
                  longitude: getApp().globalData.longitude
                },
                //逆解析成功回调函数
                success: function (res) {
                  // console.log(res)
                  getApp().globalData.city = res.result.address_component.city,
                    getApp().globalData.address = res.result.address
                  if (getApp().globalData.city) {
                    var pages = getCurrentPages();
                    var prevPage = pages[pages.length - 2];  //上一个页面，A页面的Page对象 
                    console.log(prevPage)
                    if (getApp().globalData.latitude && getApp().globalData.longitude) {
                      prevPage.weather();
                      prevPage.get_shop_info();
                      that.setData({
                        hidden: true
                      })
                      wx.navigateBack({
                        delta: 2
                      })
                    }

                  }

                }
              })
            }
          })
        }
      }
    })
  }
})
