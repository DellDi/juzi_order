var app = getApp();

Page({
  data: {

    latitude: wx.getStorageSync('latitude'),
    longitude: wx.getStorageSync('longitude'),
    markers: [{
        id: 1,
        latitude: 23.1,
        longitude: 113.32452,
        name: 'T.I.T 创意园',
        iconPath: './location.png',
      },
      {
        id: 2,
        latitude: 23.3,
        longitude: 113.32452,
        name: '扎根',
        iconPath: './location.png',
      },
      {
        id: 3,
        latitude: 23.5,
        longitude: 113.32452,
        name: '圣诞快乐',
        iconPath: './location.png',
      },
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
      method: 'GET',
      data: {
        latitude: wx.getStorageSync('latitude'),
        longitude: wx.getStorageSync('longitude'),
        openid: wx.getStorageSync('openid'),
        city: options.city
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        var list = res.data;
        console.log(list)
        var marker = {};
        var markers = [];
        for (var i in list) {
          marker = {
            id: list[i].id,
            latitude: list[i].shop_lat,
            longitude: list[i].shop_lon,
            name: list[i].shop_name,
            iconPath: list[i].shop_logo
          }
          markers.push(marker);
        }
        console.log(markers)
        that.setData({
          markers: markers
        })
      },
      fail: function(res) {},
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

        console.log(res.windowHeight)
        that.setData({
          view: {
            Height: res.windowHeight
          },

        })
      }
    })


  }
})