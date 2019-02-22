const app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
const util = require("../../utils/util.js")
Page({
  data: {
    show: "",
    city: "",
    today: {},
    future: {},
    index: 0,
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
    pwslenght: 0,
    number:3
  },
  //点击选择类型
  clickPerson: function() {
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
  mySelect: function(e) {
    var page = this;
    wx.request({
      url: getApp().globalData.domain + 'Index/get_shopid',
      // method: 'GET',
      data: {
        shop_name: e.target.dataset.me
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        getApp().globalData.shopid = res.data.shopid
        page.get_lunbo();
        page.get_latest_order();
        page.get_menu();
        page.setData({
          firstPerson: e.target.dataset.me,
          selectPerson: true,
          selectArea: false,
        })
      },
      fail: function() {
        wx.showToast({
          title: '服务器繁忙..',
        })
      }
    });
  },
  loadInfo: function() {
    var that = this;
    var demo = new QQMapWX({
      key: 'O2KBZ-PW4CU-ULQVR-4SUWE-RMP67-D6BVP'
    });
    wx.getLocation({
      type: 'gcj02', //编码方式，
      success: function(res) {
        var latitude = res.latitude // wx.getLocation 获取当前的地理位置、速度   latitude(维度)  longitude（经度）
        var longitude = res.longitude
        app.globalData.latitude = res.latitude
        app.globalData.longitude = res.longitude
        demo.reverseGeocoder({
          //腾讯地图api 逆解析方法 首先设计经纬度
          location: {
            latitude: latitude,
            longitude: longitude
          },
          //逆解析成功回调函数
          success: function(res) {
            getApp().globalData.city = res.result.address_component.city,
              getApp().globalData.address = res.result.address
            if (getApp().globalData.city) {
              that.weather();
              that.get_shop_info();
            }
          },
          fail: function(res) {},
          complete: function(res) {}
        })
      },
      fail: function(res) {
        wx.navigateTo({
          url: './authorize',
        })
      },
    })
  },

  weather: function() {
    var that = this;
    //获取天气
    wx.request({
      url: 'https://diancan.zhonghaokeji.net/index.php/api/Getopenid/getWeather',
      data: {
        city: getApp().globalData.city
      },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
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

  onLoad: function(options) {
    var domain = getApp().globalData.domain;
    this.loadInfo();
  },
  get_lunbo: function() {
    var page = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/get_lunbo',
      // method: 'GET',
      data: {
        shopid: getApp().globalData.shopid
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        page.setData({
          image: res.data
        })

      },
      fail: function() {
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function(res) {},
    })
  },
  get_menu: function() {
    var page = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/menu_push',
      data: {
        shopid: getApp().globalData.shopid
      },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        page.setData({
          menu_push: res.data.menu_push
        })

      },
      fail: function() {
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function(res) {},
    })
  },
  get_latest_order: function() {
    var page = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/get_latest_order',
      method: 'GET',
      data: {
        openid: getApp().globalData.openid
      },
      header: {
        'Accept': 'application/json'
      },
      // method: 'post',
      // header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function(res) {
        page.setData({
          latest_order: res.data
        })
      },
      fail: function() {
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function(res) {},
    })

  },
  get_shop_info: function() {
    var page = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/get_shop_info',
      // method: 'GET',
      data: {
        latitude: getApp().globalData.latitude,
        longitude: getApp().globalData.longitude,
        openid: getApp().globalData.openid
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        page.setData({
          shop_name: res.data,
          firstPerson: res.data[0].shop_name
        })
        getApp().globalData.shopid = res.data[0].shop_id
        page.get_lunbo();
        page.get_latest_order();
        page.get_menu();
      },
      fail: function() {
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function(res) {},
    })

  },
  previewImage: function(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.image,
    })

  },
  // 
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 今日推进前进条
  pws: function() {
    var pwslenght = this.data.pwslenght;
    pwslenght = pwslenght + 750;
    this.setData({
      pwslenght: pwslenght
    })
  },
  // 滚动到右边时触发的事件
  lower: function() {
    var pwslenght = this.data.pwslenght;
    pwslenght = 0;
    this.setData({
      pwslenght: pwslenght
    })
  },
  click: function() {
    var that = this;
    var show;
    // var page = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/shop_order_is_open',
      // method: 'GET',
      data: {
        shopid: getApp().globalData.shopid
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data.shop_order == 0) {
          wx.showToast({
            title: '暂未开启点餐',
            image: '../../img/home/model.png'
          })
        } else {
          wx.scanCode({
            success: (res) => {
              var url = res.result;
              var result = util.parseURL(url);
              wx: wx.request({
                url: getApp().globalData.domain + 'Index/table_exist',
                // method: 'GET',
                data: {
                  shopid: getApp().globalData.shopid,
                  tableno: result.tableno
                },
                method: 'post',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(res) {
                  if (res.data.status == 1) {
                    getApp().globalData.tableno = result.tableno
                    //跳转到菜品列表
                    wx.navigateTo({
                      url: '../menu/menu',
                    })
                    wx.showToast({
                      title: '成功',
                      icon: 'success',
                      duration: 1500
                    })
                  } else {
                    wx.showToast({
                      title: '扫码错误',
                      icon: 'success',
                      duration: 1500
                    })
                  }

                }
              })
            },
            fail: (res) => {
              wx.showToast({
                title: '失败',
                icon: 'success',
                duration: 2000
              })
            },
            complete: (res) => {}
          })
        }

      }
    })
  },
  onShareAppMessage: function() {

  },
  onShow: function() {

  },

  // 排队跳转界面
  queue: function() {

    var page = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Queue/get_latest_queue',
      // method: 'GET',
      data: {
        shopid: getApp().globalData.shopid,
        openid: getApp().globalData.openid
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data.status == 1) {
          wx.navigateTo({
            url: '../queue/queueres?num=' + res.data.latest_queue.count + '&queue_no=' + res.data.latest_queue.queue_num +
              '&table_type=' + res.data.latest_queue.selectRes + '&queue_id=' + res.data.latest_queue.queue_id,
          })
        } else if (res.data.status == 0) {
          wx.navigateTo({
            url: '../queue/queue',
          })
        } else {
          wx.showToast({
            title: '暂未开启排队',
            icon: '',
            image: '../../img/home/model.png'
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function(res) {},
    })
  },
  appointment: function() {
    var page = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Index/appoint_is_open',
      // method: 'GET',
      data: {
        shopid: getApp().globalData.shopid
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data.appointment == 0) {

          wx.showToast({
            title: '暂未开启预约',
            image: '../../img/home/model.png'
          })
        } else {
          wx.navigateTo({
            url: '../appointment/appointment',
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function(res) {},
    })
  },
  // 点餐跳转界面
  scan_order: function() {
    // var show;
    // wx: wx.request({
    //   url: getApp().globalData.domain + 'Index/shop_order_is_open',
    //   data: {
    //     shopid: getApp().globalData.shopid
    //   },
    //   method: 'post',
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   success: function (res) {
    //     if (res.data.shop_order == 0) {
    //       wx.showToast({
    //         title: '暂未开启点餐',
    //         image: '../../img/home/model.png'
    //       })
    //     } else {
    //       wx.scanCode({
    //         success: (res) => {
    //           var url = res.result;
    //           var result = util.parseURL(url);
    //           wx: wx.request({
    //             url: getApp().globalData.domain + 'Index/table_exist',
    //             data: {
    //               shopid: getApp().globalData.shopid,
    //               tableno: result.tableno
    //             },
    //             method: 'post',
    //             header: {
    //               "Content-Type": "application/x-www-form-urlencoded"
    //             },
    //             success: function (res) {
    //               if (res.data.status == 1) {
    //                 getApp().globalData.tableno = result.tableno
    //                 //跳转到菜品列表
    //                 wx.navigateTo({
    //                   url: '../menu/menu',
    //                 })
    //                 wx.showToast({
    //                   title: '成功',
    //                   icon: 'success',
    //                   duration: 1500
    //                 })
    //               } else {
    //                 wx.showToast({
    //                   title: '扫码错误',
    //                   icon: 'success',
    //                   duration: 1500
    //                 })
    //               }

    //             }
    //           })
    wx.navigateTo({
      url: '../scan/scan',
    })

    //         },
    //         fail: (res) => {
    //           wx.showToast({
    //             title: '失败',
    //             icon: 'success',
    //             duration: 2000
    //           })
    //         },
    //         complete: (res) => { }
    //       })
    //     }
    //   },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  },
  search: function() {
    wx: wx.navigateTo({
      url: './search',

    })
  },
  detail: function(e) {
    getApp().detail(e)
  },
  skip: function() {
    // wx.redirectTo({
    //   url: '../shop/shop',
    // })
    wx.navigateTo({
      url: '../shop/shop',
    })
  },
  //下拉刷新
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.get_latest_order();
    //模拟加载
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

})