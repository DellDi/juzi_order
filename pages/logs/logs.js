var app = getApp();

Page({
  data: {
    latitude: getApp().globalData.latitude,
    longitude: getApp().globalData.longitude,
    markers: [
    ],

  },
  onReady: function(e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    // this.mapCtx = wx.createMapContext('myMap')
  },

  get_city_shop: function(options) {
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/get_city_shop',
      // method: 'GET',
      data: {
        latitude: getApp().globalData.latitude,
        longitude: getApp().globalData.longitude,
        openid: getApp().globalData.openid,
        city: options.city
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function(res) {
        console.log(res)
        var list = res.data;
        var marker = {};
        var markers = [];
        for (var i in list) {
          marker = {
            id: list[i].id,
            latitude: list[i].shop_lat,
            longitude: list[i].shop_lon,
            name: list[i].shop_name,
            iconPath: "/img/home/home.1.png"
          }
          markers.push(marker);
        }
        that.setData({
          markers: markers
        })
      },
      fail: function () {
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function(res) {},
    })
  },

  onLoad: function(options) {
    var that = this;
    that.get_city_shop(options);
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        that.setData({
          // markers: that.getSchoolMarkers(),
          scale: 12,
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    });
    wx.getSystemInfo({
      success: function(res) {
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          view: {
            Height: res.windowHeight
          },
        })
      }
    })
  }
})