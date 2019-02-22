// pages/mendetail/menudetail.js
var app = getApp();
Page({
  data: {
    showView: true,
    mendel: [],
    menu: [],
    date: ''
  },
  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    var that = this;
    that.setData({
      order_num: options.order_num
    })
    showView: (options.showView == "true" ? true : false)
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/order_content',
      // method: 'GET',
      data: {
        order_num: this.data.order_num,
        open_id: getApp().globalData.openid
      },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res)
        that.setData({
          menu: res.data.cartList,
          menudel: res.data
        })
      },
      fail: function() {
        wx.showToast({
          title: '服务器繁忙..',
        })
      }
    })
  },
  //文本内容传输
  textareaInput: function(e) {
    var txt = e.detail.value;
    this.setData({
      txt: e.detail.value

    })
  },
  onChangeShowState: function() {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  submit: function(e) {
    var that = this;
    var txt = that.data.txt;
    if (typeof(txt) == "undefined") {
      txt = '';
    }
    // console.log(txt)
    // return false;
    var order_num = e.currentTarget.dataset.order_num;
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/order_remark',
      // method: 'GET',
      data: {
        order_num: order_num,
        txt: txt
      },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data.status == 1) {
          wx.reLaunch({
            url: '../menu/paymentmenu?order_num=' + order_num
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: '',
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '服务器繁忙..',
        })
      }
    })
  }
})