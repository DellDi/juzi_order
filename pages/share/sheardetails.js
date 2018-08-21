// pages/shop/storedetails.js
//获取应用实例
const app = getApp()
var Util = require( '../../utils/util.js' );
Page({
  data: {
  //   money: "30",
  //   coupon:[
  //     { 
  //       id:"0",
  //       money:"20",
  //       subtraction:"99",
  //       discount:"优惠券"
  //     },
  //     {
  //       id: "1",
  //       money: "30",
  //       subtraction: "199",
  //       discount: "优惠券"
  //     },
  //     {
  //       id: "2",
  //       money: "50",
  //       subtraction: "299",
  //       discount: "优惠券"
  //     },
  //     {
  //       id: "3",
  //       money: "10",
  //       subtraction: "10",
  //       discount: "代金券"
  //     },
  //     {
  //       id: "4",
  //       money: "20",
  //       subtraction: "20",
  //       discount: "现金券"
  //     }
  //   ]
  },
  //事件处理函数
  
  onLoad: function (options) {
    var that=this;
    console.log(options.id)
    wx: wx.request({
      url: getApp().globalData.domain +'/voucher/get_one_voucher',
      data: {
        voucher_id: options.id
      },
      method: 'GET',
      header: { 'Accept': 'application/json'},
      dataType: 'json',
      success: function (res) {
      console.log(res.data)
        that.setData({
          voucher: res.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
      },
  // 优惠卷
  

  //免费领取优惠券
share_receive:function(e){
var openid='';
var userInfo='';
var voucher_id = e.currentTarget.dataset.id;

  wx.login({
    success: res => {
      if (res.code) {
        //调用request请求api转换登录凭证
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wx8518366e7f373603',
            secret: 'f5cfca9207544afce984279dc253b0ad',
            grant_type: 'authorization_code',
            js_code: res.code
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            openid = res.data.openid
            wx: wx.request({
              url: getApp().globalData.domain + '/Member/is_member',
              data: {openid:openid},
              method: 'GET',
              header: { 'Accept': 'application/json'},
              dataType: 'json',
              success: function (res) {
                // console.log(res)
                if(res.data.status==1){
                  //如果已经是会员
                  var that = this;
                  wx: wx.request({
                    url: getApp().globalData.domain + 'Voucher/share_receive',
                    method: 'GET',
                    data: { voucher_id: voucher_id, openid: openid },
                    header: {'Accept': 'application/json'},
                    success: function (res) {
                        wx.showToast({
                          title: res.data.msg,
                          content: '',
                        })
                    },
                    fail: function (res) { },
                    complete: function (res) { },
                  }) 

                }else{
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
                              method: 'GET',
                              data: { userInfo: userInfo, openid: openid },
                              header: {
                                'Accept': 'application/json'
                              },
                              success: function (res) {
                                if(res.data.status==1){
                                // 注册成功，之后领取优惠券

                                  var that = this;
                                  wx: wx.request({
                                    url: getApp().globalData.domain + 'Voucher/share_receive',
                                    method: 'GET',
                                    data: { voucher_id: voucher_id, openid: openid },
                                    header: {'Accept': 'application/json'},
                                    success: function (res) {
                                      wx.showToast({
                                        title: res.data.msg,
                                        content: '',
                                      })

                                    },
                                    fail: function (res) { },
                                    complete: function (res) { },
                                  }) 

                                }else{
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



          }
        })
      }
    }
  })

  
  },
 
})
