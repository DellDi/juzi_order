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
    that.get_access_token();
    that.setData({
      num: options.num,
      queue_no: options.queue_no,
      table_type: options.table_type,
      queue_id: options.queue_id
    })
    wx.showToast({
      title: '10s之后跳转',
      // duration:3000,
      success:function(){
        setTimeout(function () {
          wx.switchTab({
            url: '../home/home',
          })
        },10000)
      },
    })
    setInterval(function() {
      wx: wx.request({
        url: getApp().globalData.domain + 'Queue/get_wait',
        // method: 'GET',
        data: {
          queue_id: options.queue_id
        },
        // header: {
        //   'Accept': 'application/json'
        // },
        method: 'post',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function(res) {
          that.setData({
            wait: res.data.minute
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }, 60000);
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
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
  // 取消排队  
  formSubmit: function(e) {
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Queue/cancel_queue',
      // method: 'GET',
      data: {
        queue_id: that.data.queue_id
      },
      header: {
        'Accept': 'application/json'
      },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function(res) {
         var data = {};
        if (res.data.status == 1) {
          //发送模板消息
          wx: wx.request({
            url: 'https://diancan.zhonghaokeji.net/index.php/api/Getopenid/send3',
            data: {
              access_token: that.data._access_token,
              template_id: 'bceE95EIKKtnQ6EusG6By8EOd622ZkKZikVJyEVeS9E',
              form_id: e.detail.formId,
              _access_token: that.data._access_token,
              openid: getApp().globalData.openid,
                "keyword1": res.data.cancelRes.shop_name,
                "keyword2": res.data.cancelRes.queue_num, 
                "keyword3":res.data.cancelRes.cancel_queue_time
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
          }
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500
        })
        wx.navigateTo({
          url: '../queue/queue',
        })

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  menu:function(e){
    // console.log(e)
   wx.setStorageSync('tableno',e.currentTarget.dataset.queue_no)
   wx.navigateTo({
     url: '../menu/menu',
   })
  }

})