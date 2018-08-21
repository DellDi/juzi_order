var app = getApp();
Page({
  data: {
    showView: true,
    maxlength: 200,
    menu: [
    ]
  },
  onLoad: function (options) {
    var that = this;
    showView: (options.showView == "true" ? true : false)
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/cart_list',
      method: 'GET',
      data: {
        open_id: getApp().globalData.openid
      },
      success: function (res) {
        that.setData({
          menu: res.data
        })
      }
    })
  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  //文本内容传输
  textareaInput: function (e) {
    var txt = e.detail.value;
    // console.log(txt);
    this.setData({
      txt: e.detail.value

    })
  },
  formSubmit: function (e) {
    console.log(e);
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/create_order',
      method: 'GET',
      data: {
        open_id: getApp().globalData.openid,
        shop_id: 2,
        txt: this.data.txt
      },
      success: function (res) {
        console.log(res);
        wx.navigateTo({
          url: '../menu/confirmmenu?data=' + res.data
        })
      }
    })

  }
})



