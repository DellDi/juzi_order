// pages/mendetail/menudetail.js
var app = getApp();
Page({
  data: {
    showView: true,
    mendel: [],
    menu: [],
    date: ''
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载

    // console.log(options)
    //  wx.setStorageSync('data',options.data)
    var that = this;
    that.setData({
      data: options.data
    })
    showView: (options.showView == "true" ? true : false)
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/order_content',
      method: 'GET',
      data: {
        date: this.data.data,
        open_id: getApp().globalData.openid
      },
      success: function (res) {
        console.log(res);
        that.setData({
          menu: res.data.cartList,
          menudel: res.data
        })
      }
    })
  }
  , onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  submit:function(){
    wx.navigateTo({
      url: '../menu/paymentmenu?data='+this.data.data
    })
  }
})