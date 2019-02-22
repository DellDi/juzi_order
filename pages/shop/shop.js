// pages/shop/shop.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
    city: getApp().globalData.city,
    shop:[],
    item: [{
        "name": "",
        "num": "",
        "dec": ""
      },
      {
        "name": "",
        "num": "",
        "dec": ""
      },
      {
        "name": "",
        "num": "",
        "dec": ""
      }

    ],

  },
  //事件处理函数
  bindmap: function() {
    var that = this;
    wx.navigateTo({
      url: '../logs/logs?city=' + that.data.city
    })
  },
  bindcity: function() {
    wx.navigateTo({
      url: '../shop/switchcity'
    })
  },
  onLoad: function() {
    var that = this;
    that.data.city = getApp().globalData.city
    that.get_city_shop();
  },
  get_city_shop: function() {
    var that = this;
    var shop_name=that.data.shop_name;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/get_city_shop',
      // method: 'GET',
      data: {
        latitude: getApp().globalData.latitude,
        longitude: getApp().globalData.longitude,
        openid: getApp().globalData.openid,
        city: that.data.city
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function(res) { 
        that.setData({
          shop_name: res.data,
          currentaddress: getApp().globalData.address,
          city: that.data.city
        });
        that.flite();
      },
      fail: function () {
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function(res) {},
    })
  },
  flite(){

    var shop_name = this.data.shop_name;
    console.log(shop_name[1]['shop_address']);
    for (var i = 0; i<shop_name.length; i++) {
      var index=i;
      var address = 'shop_name[" + i + "].shop_address';
      var add = shop_name["+ index +"]['shop_address'].replace(/,/g,'');
           console.log(add);
          this.setData({
            [address]: add,
          })   
      }
    console.log('xixixi' + shop_name);
  },
  storedetail: function(e) {
    var storeid = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: './storedetails?id=' + storeid
    })
  },
  onShow: function() {
    var that = this;
    that.get_city_shop();
  }
})