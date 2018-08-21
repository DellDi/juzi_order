// pages/queue/queueres.js
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    queue_id: null,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function(options) {
    var that = this;
    that.setData({
      num: options.num,
      queue_no: options.queue_no,
      table_type: options.table_type,
      queue_id: options.queue_id
    })
    setInterval(function() {
      wx: wx.request({
        url: getApp().globalData.domain + 'Queue/get_wait',
        method: 'GET',
        data: {
          queue_id: options.queue_id
        },
        header: {
          'Accept': 'application/json'
        },
        success: function(res) {
          // console.log(res)
          that.setData({
            wait: res.data.minute
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }, 1000);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  get_wait: function(queue_id) {
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Queue/get_wait',
      method: 'GET',
      data: {
        queue_id: queue_id
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          wait: res.data.minute
        })

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  cancel_queue: function() {
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Queue/cancel_queue',
      method: 'GET',
      data: {
        queue_id: that.data.queue_id
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        // console.log(res)
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500
        })
        wx.navigateBack({
          delta: 1
        })

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }

})