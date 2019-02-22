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
    imgUrls: [],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //	滑动动画时长1s
    coupon: [],
    status:false
  },
  //事件处理函数
  bindmap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
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
  get_one_store: function(storeid) {
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/get_one_shop',
      // method: 'GET',
      data: {
        shopid: storeid
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function(res) {
        console.log(res)
        var status = (res.data.status == 1) ? false : true;
        that.setData({
          shopRes: res.data.shopRes,
          vouchers: res.data.vouchers,
          status:status
        })
      },
      fail: function () {
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function(res) {},
    })
  },
  bitphone: function(e) {
    console.log(e)
    var phoneNumber = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phoneNumber
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
        openid: getApp().globalData.openid
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function(res) {
        console.log(res)
        setTimeout(function () {
         wx.request({
            url: getApp().globalData.domain + 'Voucher/release_stock',
            // method: 'GET',
            data: {
              binding_id: res.data.binding_id
            },
            // header: {
            //   'Accept': 'application/json'
            // },
           method: 'post',
           header: { "Content-Type": "application/x-www-form-urlencoded" },
            success: function (res) {
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }, 600000);
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
      fail: function () {
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
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
        openid: getApp().globalData.openid
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
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
      fail: function () {
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function(res) {},
    })

  },
  appoint: function(e) {
    console.log(e)
    var page = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/appoint_is_open',
      // method: 'GET',
      data: { shopid: e.currentTarget.dataset.shopid },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        if (res.data.appointment == 0) {

          wx.showToast({
            title: '暂未开启预约',
            image: '../../img/home/model.png'
          })
        } else {
          getApp().globalData.shopid = e.currentTarget.dataset.shopid
          wx.navigateTo({
            url: '../appointment/appointment',
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function (res) { },
    })
  },
  diancan: function(e) {
    console.log(e)
    getApp().globalData.shopid = e.currentTarget.dataset.shopid
    wx.switchTab({
      url: '../scan/scan',
    })
  },
  queue: function(e) {
    var page = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Queue/get_latest_queue',
      // method: 'GET',
      data: { shopid: e.currentTarget.dataset.shopid, openid: getApp().globalData.openid },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        if (res.data.status == 1) {
          wx.navigateTo({
            url: '../queue/queueres?num=' + res.data.latest_queue.count + '&queue_no=' + res.data.latest_queue.queue_num +
              '&table_type=' + res.data.latest_queue.selectRes + '&queue_id=' + res.data.latest_queue.queue_id,
          })
        } else if (res.data.status == 0) {
          getApp().globalData.shopid = e.currentTarget.dataset.shopid
          wx.navigateTo({
            url: '../queue/queue',
          })
        } else {
          wx.showToast({
            title: '暂未开启排队',
            icon: '',
            image: '../../img/home/model.png'
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function (res) { },
    })  
  }
})