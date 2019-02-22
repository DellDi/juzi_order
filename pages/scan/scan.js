//获取应用实例  
var app = getApp();
const util = require("../../utils/util.js")

Page({
  data: {
    show: "",
  },
  onLoad: function () { },
  click: function () {
    var that = this;
    var show;
    // var page = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/shop_order_is_open',
      // method: 'GET',
      data: {
        shopid: getApp().globalData.shopid
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        if (res.data.shop_order == 0) {
          wx.showToast({
            title: '暂未开启点餐',
            image: '../../img/home/model.png'
          })
        } else {
          wx.scanCode({
            success: (res) => {
              var url = res.result;
              var result = util.parseURL(url);
              wx: wx.request({
                url: getApp().globalData.domain + 'Index/table_exist',
                // method: 'GET',
                data: {
                  shopid: getApp().globalData.shopid,
                  tableno: result.tableno
                },
                method: 'post',
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                success: function (res) {
                  if (res.data.status == 1) {

                    getApp().globalData.tableno = result.tableno
                    //跳转到菜品列表
                    wx.switchTab({
                      url: '../scan_order/scan_order',
                    })
                    wx.showToast({
                      title: '成功',
                      icon: 'success',
                      duration: 1500
                    })
                  } else {
                    wx.showToast({
                      title: '扫码错误',
                      icon: 'success',
                      duration: 1500
                    })
                  }

                }
              })

            },
            fail: (res) => {
              wx.showToast({
                title: '失败',
                icon: 'success',
                duration: 2000
              })
            },
            complete: (res) => { }
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })


  },
})
