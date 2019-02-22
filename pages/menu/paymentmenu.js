Page({
  /**
   * 页面的初始数据
   */
  data: {
    num: "46132323224535",
    detatime: "2018-07-03",
    foodtotle: "339.0",
    redustotle: "339.0",
    reduse: "8折",
    id: '',
    cutMonney: '',
    numb: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.get_access_token();        
    that.setData({
     order_num: options.order_num

    })
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/order_pay',
      data: {
        order_num: this.data.order_num,
      },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        console.log(res)
        that.setData({
          order: res.data
        })
      },
      fail: function () {
        wx.showToast({
          title: '服务器繁忙..',
        })
      }
    })
  },

  click: function (e) {
    if(this.data.order.num==0){
      wx.showToast({
        title: '无可用优惠券',
      })
      return false;
    }
    wx.navigateTo({
      url: '../menu/voucher?order_num=' + this.data.order_num + '&price=' + this.data.order.food_price,
    })
  },

  rightsubmit: function () {
    wx.switchTab({
      url: '../my/user', 
    })
  },
  get_access_token: function () {
    var that = this;
    wx.request({
      url: "https://diancan.zhonghaokeji.net/index.php/api/Getopenid/get1",
      data: {

      },
      success: function (res) {
        console.log(res)
        that.setData({
          _access_token: res.data.access_token//将_access_token存起来

        })
      }
    })
  },
  formSubmit: function (e) {
    if(this.data.id){
      //优惠券的id
       var binding_id = this.data.id; 
    }
    var order_num=this.data.order_num;
    var that=this;
    var total_fee = e.detail.value.need_pay;
    console.log(1111)
    console.log(e,this.data)
    // return false;
    wx.request({
      url: getApp().globalData.domain + 'Pay/pay', //改成你自己的链接
      data: {
        openid: getApp().globalData.openid, //获取用户openid
        total_fee: total_fee, //商品价格
        binding_id: binding_id,
        order_num:order_num
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (res) {
        console.log(2222)
        console.log(res.data)
        console.log('调起支付')
        if (res.data.status == 1) {
          wx.requestPayment({
            'timeStamp': res.data.result.timeStamp,
            'nonceStr': res.data.result.nonceStr,
            'package': res.data.result.package,
            'signType': 'MD5',
            'paySign': res.data.result.paySign,
            'success': function (res) {
              console.log(res.errMsg.requestPayment == 'ok')
             
              if (res.errMsg=="requestPayment:ok"){
                wx: wx.request({
                  url: getApp().globalData.domain + 'Pay/check_is_pay',
                  // method: 'GET',
                  data: {
                    order_num: order_num
                  },
                  method: 'post',
                  header: { "Content-Type": "application/x-www-form-urlencoded" },
                  success: function (res) {
                    if (res.data.status == 1) {
                      var data = {};
                      //发送模板消息
                      wx: wx.request({
                        url: 'https://diancan.zhonghaokeji.net/index.php/api/Getopenid/send4',
                        data: {
                          access_token: that.data._access_token,
                          template_id: 'gLQDQupU_LhFBV9P3Dw6grLLf-c5fu3J_-pVz0Ack-s',
                          form_id: e.detail.formId,
                          _access_token: that.data._access_token,
                          openid: getApp().globalData.openid,
                            "keyword1":res.data.arr.already_pay, 
                            "keyword2": res.data.arr.shop_name,
                            "keyword3": res.data.arr.order_table, 
                            "keyword4": res.data.arr.transaction_time
                        },
                        method: 'post',
                        // header: { "Content-Type": "application/json" },
                        header: { "Content-Type": "application/x-www-form-urlencoded" },
                        dataType: 'json',
                        responseType: 'text',
                        success: function (res) {
                          console.log(res)
                        },
                        fail: function (res) { },
                        complete: function (res) { },
                      })
                        wx.redirectTo({
                          url: './paysuccess',
                        })
                    } else {
                         wx.showToast({
                          title:res.data.msg,
                          icon: 'success',
                          duration: 2000
                        });
                    }
                  }
                })
              }
            },
            fail: function (res) {
              if (res.errMsg = "requestPayment:cancel") {
                // wx.showToast({
                //   title: '用户取消了..',
                // })
                wx: wx.request({
                  url: getApp().globalData.domain + 'Orderdish/cancel_order',
                  data: {
                    order_num: order_num
                  },
                  method: 'post',
                  header: { "Content-Type": "application/x-www-form-urlencoded" },
                  success: function (res) {
                    if (res.data.result == 1) {
                      wx.showToast({
                        title: '用户取消了订单..',
                        icon: 'loading',  //图标，支持"success"、"loading"
                        // image: '../image/img.png',  //自定义图标的本地路径，image 的优先级高于 icon
                        duration: 5000, //提示的延迟时间，单位毫秒，默认：1500
                        mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
                        success: function (res) {
                          console.log(res.errMsg)
                          if (res.errMsg=="showToast:ok") {
                            wx.switchTab({
                              url: '../home/home',
                            })
                          }
                        }, fail: function () { },  //接口调用失败的回调函数
                        complete: function () { } //接口调用结束的回调函数
                      })
                    }
                  }
                })







              } else {
                wx.showToast({
                  title: '服务器繁忙..',
                })
              }
            },
            complete: function (res) {
            }
          })
        } else {
          wx.showModal({
            title: res.data.msg,
            content: '',
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器繁忙..',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    this.setData({
      cutMonney: currPage.data.cutMonney,
      numb: currPage.data.numb,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})