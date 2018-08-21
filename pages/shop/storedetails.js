// pages/shop/storedetails.js
//获取应用实例
const app = getApp()
var Util = require('../../utils/util.js');
Page({
  data: {
    thefirst: true,
    money: "30",
    city: "",
    today: {},
    future: "",
    imgUrls: [
      "",
      "",
      ""
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //	滑动动画时长1s
    coupon: [{
        id: "0",
        money: "20",
        subtraction: "99",
        discount: "优惠券"
      },
      {
        id: "1",
        money: "30",
        subtraction: "199",
        discount: "优惠券"
      },
      {
        id: "2",
        money: "50",
        subtraction: "299",
        discount: "优惠券"
      },
      {
        id: "3",
        money: "10",
        subtraction: "10",
        discount: "代金券"
      },
      {
        id: "4",
        money: "20",
        subtraction: "20",
        discount: "现金券"
      }
    ]
  },
  //事件处理函数
  bindmap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function(options) {
    var that = this;
    that.data.storeid = options.id
    that.get_one_store(options.id)

    // 优惠卷
    showView: (options.showView == "true" ? true : false)
  },
  // 优惠卷
  onChangeShowState: function() {
    var that = this;
    that.setData({
      showView: (!that.data.showView),
      thefirst: (!that.data.thefirst)
    })
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
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })

  get_one_store: function(storeid) {
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/get_one_shop',
      // method: 'GET',
      data: {
        shopid: storeid
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          shopRes: res.data.shopRes,
          vouchers: res.data.vouchers
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bitphone: function() {
    wx.makePhoneCall({
      phoneNumber: '1340000'
    })
  },
  // 优惠券支付
  needpay: function(e) {
    var voucher_id = e.currentTarget.dataset.id;
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Voucher/buy_voucher',
      // method: 'GET',
      data: {
        voucher_id: voucher_id,
        openid: wx.getStorageSync('openid')
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log(res)
        if (res.data.result == 1) {
          console.log(res.data)
          var binding_id = res.data.binding_id;
          wx.showModal({
            title: res.data.msg,
            content: '您需支付￥' + res.data.voucher_price + '元',
            confirmText: '购买',
            success: function(res) {
              if (res.confirm) {

                wx.navigateTo({
                  url: './voucher?binding_id=' + binding_id,
                })
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            content: '',
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //免费领取优惠券
  toreceive: function(e) {
    var voucher_id = e.currentTarget.dataset.id;
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Voucher/receive',
      // method: 'GET',
      data: {
        voucher_id: voucher_id,
        openid: wx.getStorageSync('openid')
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        // console.log(res)
        if (res.data.result == 1) {
          wx.showToast({
            title: res.data.msg,
            content: '',
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            content: '',
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  appoint: function(e) {
    // console.log(e)
    wx.setStorageSync('shopid', e.currentTarget.dataset.shopid)

  },
  diancan: function(e) {
    // console.log(e)
    wx.setStorageSync('shopid', e.currentTarget.dataset.shopid)
  },
  queue: function(e) {
    wx.setStorageSync('shopid', e.currentTarget.dataset.shopid)
    // console.log(e)
  }

})