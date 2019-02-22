// pages/tobe paid voucher/tobe paid.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    minusStatus: 'disabled',
    money: 50
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this;
    that.get_access_token();
    wx: wx.request({
      url: getApp().globalData.domain + 'voucher/get_one_voucher',
      data: {voucher_id: options.binding_id},
      // method: 'GET',
      // header: {'Accept': 'application/json'},
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      dataType: 'json',
      success: function (res) {
        that.setData({
          voucher: res.data
        })
      },
      fail: function () {
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

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
  formSubmit:function(e){
    // console.log(e)
    var that=this;
    var binding_id=e.detail.value.binding_id;
    var total_fee = e.detail.value.total_fee;
    wx.request({
      url: getApp().globalData.domain + 'voucher/pay', //改成你自己的链接
      data: {
        openid:getApp().globalData.openid , //获取用户openid
        total_fee: total_fee, //商品价格
        binding_id:binding_id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      // method: 'GET',
      // header: { 'Accept': 'application/json' },
      success: function (res) {
        console.log(res.data);
        console.log('调起支付');
        if(res.data.status==1){
          wx.requestPayment({
            'timeStamp': res.data.result.timeStamp,
            'nonceStr': res.data.result.nonceStr,
            'package': res.data.result.package,
            'signType': 'MD5',
            'paySign': res.data.result.paySign,
            'success': function (res) {
              if (res.errMsg ="requestPayment:ok"){
                wx: wx.request({
                  url: getApp().globalData.domain + 'Voucher/check_is_pay',
                  data: {
                    binding_id: binding_id
                  },
                  method: 'post',
                  header: { "Content-Type": "application/x-www-form-urlencoded" },
                  success: function (res) {
                    if(res.data.status==1){
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
                            "keyword1":  res.data.arr.already_pay,
                            "keyword2": res.data.arr.shop_name,
                            "keyword3":res.data.arr.order_table,
                            "keyword4":res.data.arr.transaction_time
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
                      wx.showToast({
                        title: '支付成功',
                        icon: 'success',
                        duration: 2000
                      });
                      wx.redirectTo({
                        url: '../menu/paysuccess',
                      })
                    }else{
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000
                      });
                    }
                  },
                  fail: function (res) {
                    if (res.errMsg = "requestPayment:cancel") {
                      wx.showToast({
                        title: '用户取消了..',
                      })
                    }else{
                      wx.showToast({
                        title: res.errMsg,
                      })
                    }
                    
                   },
                  complete: function (res) { 
                    // if (res.errMsg ="requestPayment:cancel"){
                    //   wx.showToast({
                    //     title: '用户取消了..',
                    //   })
                    // }
                  },
                })
              }
            },
            fail: function (res) {
              console.log(res);
            },
            complete: function (res) {
              console.log('complete');
            }
          });
        }else{
         wx.showToast({
           title: res.data.result,
         })
        }
      },
      fail: function (res) {
       wx.showToast({
         title: '服务器繁忙..',
       })
      }
    })
  }
})