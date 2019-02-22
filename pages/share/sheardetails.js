// pages/shop/storedetails.js
//获取应用实例
const app = getApp()
var Util = require('../../utils/util.js');
Page({
  data: {},
  //事件处理函数

  onLoad: function(options) {
    var that = this;
    console.log(options.id)
    wx: wx.request({
      url: getApp().globalData.domain + 'voucher/get_one_voucher',
      data: {
        voucher_id: options.id
      },
      // method: 'GET',
      // header: { 'Accept': 'application/json'},
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data)
        that.setData({
          voucher: res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 优惠卷


  //免费领取优惠券
  share_receive: function(e) {
    var openid = '';
    var userInfo = '';
    var voucher_id = e.currentTarget.dataset.id;
    wx.login({
      success: function (res) {
        var code = res.code;//登录凭证
        // console.log(code)
        if (code) {
          //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
          console.log(code)
          wx.request({
            url: 'https://diancan.zhonghaokeji.net/index.php/api/getOpenid/get?code=' + code,//自己的服务接口地址
            method: 'GET',
            header: {
              "Content-Type": "applciation/json"
            },
            success: function (res) {
              console.log(res.data.openid)
              // getApp().globalData.openid = res.data.openid;
              openid = res.data.openid;
              wx: wx.request({
                url: getApp().globalData.domain + '/Member/is_member',
                data: {
                  openid: res.data.openid
                },
                // method: 'GET',
                // header: { 'Accept': 'application/json'},
                method: 'post',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                dataType: 'json',
                success: function (res) {
                  // console.log(res)
                  if (res.data.status == 1) {
                    //如果已经是会员
                    var that = this;
                    wx: wx.request({
                      url: getApp().globalData.domain + 'Voucher/share_receive',
                      // method: 'GET',
                      // header: {'Accept': 'application/json'},

                      data: {
                        voucher_id: voucher_id,
                        openid: openid
                      },
                      method: 'post',
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      success: function (res) {
                        console.log(res)
                        wx.showToast({
                          title: res.data.msg,
                          content: '',
                        })
                      },
                      fail: function (res) { },
                      complete: function (res) { },
                    })

                  } else {
                    //如果不是会员

                    // 获取用户信息
                    wx.getSetting({
                      success: res => {
                        if (res.authSetting['scope.userInfo']) {
                          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                          wx.getUserInfo({
                            success: res => {
                              // 可以将 res 发送给后台解码出 unionId
                              userInfo = res.userInfo
                              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                              // 所以此处加入 callback 以防止这种情况
                              // if (this.userInfoReadyCallback) {
                              //   this.userInfoReadyCallback(res)
                              // }

                              // 判断用户是否注册
                              var that = this;
                              wx: wx.request({
                                url: getApp().globalData.domain + 'Member/reg',
                                // method: 'GET',
                                data: {
                                  userInfo: userInfo,
                                  openid: openid
                                },
                                // header: {
                                //   'Accept': 'application/json'
                                // },
                                method: 'post',
                                header: {
                                  "Content-Type": "application/x-www-form-urlencoded"
                                },
                                success: function (res) {
                                  if (res.data.status == 1) {
                                    // 注册成功，之后领取优惠券

                                    var that = this;
                                    wx: wx.request({
                                      url: getApp().globalData.domain + 'Voucher/share_receive',
                                      // method: 'GET',
                                      data: {
                                        voucher_id: voucher_id,
                                        openid: openid
                                      },
                                      // header: {'Accept': 'application/json'},
                                      method: 'post',
                                      header: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                      },
                                      success: function (res) {
                                        wx.showToast({
                                          title: res.data.msg,
                                          content: '',
                                        })

                                      },
                                      fail: function (res) { },
                                      complete: function (res) { },
                                    })

                                  } else {
                                    wx.showToast({
                                      title: '领取失败',
                                      content: '',
                                    })
                                  }

                                },
                                fail: function (res) { },
                                complete: function (res) { },
                              })
                            }
                          })
                        }
                      }
                    })
                  }
                },
                fail: function (res) { },
                complete: function (res) { },
              })


            },
            fail: function () {
              console.log('系统错误')
            }
          })
        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      },
      fail: function () {
        console.log('登陆失败')
      }
    })


    

  },
})