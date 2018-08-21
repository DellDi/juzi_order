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
    wx: wx.request({
      url: getApp().globalData.domain + '/voucher/get_one_voucher',
      data: {voucher_id: options.binding_id},
      method: 'GET',
      header: {'Accept': 'application/json'},
      dataType: 'json',
      success: function (res) {
        that.setData({
          voucher: res.data
        })
      },
      fail: function (res) { },
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
  formSubmit:function(e){
    // console.log(e)
    var binding_id=e.detail.value.binding_id;
    var total_fee = e.detail.value.total_fee;
    wx.request({
      url: getApp().globalData.domain + '/voucher/pay', //改成你自己的链接
      data: {
        openid:wx.getStorageSync('openid') , //获取用户openid
        total_fee: total_fee, //商品价格
        binding_id:binding_id
      },
      // header: {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // },
      // method: 'POST',
      method: 'GET',
      header: { 'Accept': 'application/json' },
      success: function (res) {
        console.log(res.data);
        console.log('调起支付');
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
            console.log(res);
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 3000
            });
          },
          'fail': function (res) {
            console.log(res);
          },
          'complete': function (res) {
            console.log('complete');
          }
        });
      },
      fail: function (res) {
        console.log(res.data)
      }
    })
  }
})