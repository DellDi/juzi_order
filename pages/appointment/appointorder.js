// pages/appointment/appointorder.js
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
    that.get_access_token();
    
   wx.request({
      url: getApp().globalData.domain + 'Appointment/appoint_lst',
      data: {
        openid: getApp().globalData.openid
      },
     method: 'post',
     header: { "Content-Type": "application/x-www-form-urlencoded" },
      dataType: 'json',
      success: function (res) {
        console.log(res)
        that.setData({
          appoint: res.data
        })
      },
      fail: function (res) {
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    // console.log(e)
    // return false;
    var that = this;
    var domain = getApp().globalData.domain;
    wx: wx.request({
      url: domain + 'Appointment/cancel_appoint',
      // method: 'GET',
      data: {
        appointid: e.detail.target.dataset.appointid
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
    
        // return false;
        if (res.data.result == 1) {
          var data = {};
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 1500
          })
          //发送模板消息
          wx: wx.request({
            url: 'https://diancan.zhonghaokeji.net/index.php/api/Getopenid/send3',
            data: {
              access_token: that.data._access_token,
              template_id: 'AGpzKu1JwHo2e_FuKbWgULYw72fkY5kkrtX1CYhCTwA',
              form_id: e.detail.formId,
              _access_token: that.data._access_token,
              openid: getApp().globalData.openid,
                "keyword1":res.data.arr.appoint_detail, 
                "keyword2": res.data.arr.appoint_table,
                "keyword3": res.data.arr.cancel_time
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
          that.onLoad();
        }
      },
      fail: function (res) { 
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function (res) { }, 
    })
  },
  menu: function (e) {
    console.log(e)
    getApp().globalData.tableno = e.currentTarget.dataset.tableno
    getApp().globalData.shopid = e.currentTarget.dataset.shopid
    wx.navigateTo({
      url: '../menu/menu',
    })
  }
})