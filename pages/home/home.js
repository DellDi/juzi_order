// pages/home/home.js
const app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
const util = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: "",
    city: "",
    today: {},
    future: {},
    index: 0,
    // selectShop: true,
    // firstShop: '',
    // selectArea: false,
    // shop_name: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    latitude: '',
    longitude: '',
    openid: '',
    selectPerson: true,
    firstPerson: '',
    selectArea: false,
  },
  //点击选择类型
  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
      })
    }
  },

  //点击切换
  mySelect: function (e) {
    var page = this;
    wx.request({
      url: getApp().globalData.domain + 'Index/get_shopid',
      method: 'GET',
      data: { shop_name: e.target.dataset.me },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.setStorageSync('shopid', res.data.shopid)
        page.get_lunbo();
        page.get_latest_order();
        page.get_menu();
        page.setData({
          firstPerson: e.target.dataset.me,
          selectPerson: true,
          selectArea: false,
        })
      }
    });
  },
  loadInfo() {
    var that = this;
    var demo = new QQMapWX({
      key: 'O2KBZ-PW4CU-ULQVR-4SUWE-RMP67-D6BVP'
    });
    wx.getLocation({
      type: 'gcj02', //编码方式，
      success: function (res) {
        var latitude = res.latitude // wx.getLocation 获取当前的地理位置、速度   latitude(维度)  longitude（经度）
        var longitude = res.longitude
        wx.setStorageSync('latitude', res.latitude);
        wx.setStorageSync('longitude', res.longitude);
        demo.reverseGeocoder({
          //腾讯地图api 逆解析方法 首先设计经纬度
          location: {
            latitude: latitude,
            longitude: longitude
          },
          //逆解析成功回调函数
          success: function (res) {
            wx.setStorageSync('city', res.result.address_component.city)
            that.data.city = res.result.address_component.city;
            if (wx.getStorageSync('city')) {
              that.weather();
             
            }
          },
          fail: function (res) { },
          complete: function (res) {
          }
        })
      }
    })
  },
  weather: function (city) {
    var that = this;
    //获取天气
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + wx.getStorageSync('city'),
      header: {
        'Conyent-Type': 'application/json'
      },
      success: function (res) {
        var future = res.data.data.forecast;
        var todayInfo = future.shift();
        var today = res.data.data;
        today.todayInfo = todayInfo;
        that.setData({
          today: today,
          future: future
        })
      }
    })
  },
  onLoad: function (options) {
    this.loadInfo();
    this.get_shop_info();
    var page = this;
    var domain = getApp().globalData.domain;
  },
  get_lunbo: function () {
    var page = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/get_lunbo',
      method: 'GET',
      data: { shopid: wx.getStorageSync('shopid') },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        page.setData({
          image: res.data
        })

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
  ,
  get_menu: function () {
    var page = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/menu_push',
      method: 'GET',
      data: { shopid: wx.getStorageSync('shopid') },
      header: {
        'Accept': 'application/json'
      },
      // header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        page.setData({
          menu_push: res.data.menu_push
        })

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
  ,
  get_latest_order: function () {
    var page = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/get_latest_order',
      method: 'GET',
      data: { openid: wx.getStorageSync('openid') },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        page.setData({
          latest_order: res.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  get_shop_info: function () {
    var page = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/get_shop_info',
      method: 'GET',
      data: { latitude: wx.getStorageSync('latitude'), longitude: wx.getStorageSync('longitude'), openid: wx.getStorageSync('openid') },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        //  console.log(res)
        page.setData({
          shop_name: res.data,
          firstPerson: res.data[0].shop_name
        })
        wx.setStorageSync('shopid', res.data[0].id)
        page.get_lunbo();
        page.get_latest_order();
        page.get_menu();
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.image,
    })

  },
  // 
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  click: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => { }
    })
  },
  onShareAppMessage: function () {

  },
  onShow: function () {

  },

  // 排队跳转界面
  queue: function () {
    wx: wx.navigateTo({
      url: '../queue/queue',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 点餐跳转界面
  scan_order: function () {
    wx.switchTab({
      url: '../scan/scan'
    })
  }
  ,
   search:function() {
    wx: wx.navigateTo({
      url: './search',

    })
  },





})