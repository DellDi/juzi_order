//app.js
App({
  globalData: {
    userInfo: null,
    openid: null,
    domain: 'https://diancan.zhonghaokeji.net/index.php/api/',
    shopid:null,
    address:null,
    
  },
  onLaunch: function(ops) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    this.getOpenid();
    if (ops.sence == 1044) {
    }
  },
  getOpenid: function() {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;//登录凭证
        if (code) {
              //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
              wx.request({
                url: 'https://diancan.zhonghaokeji.net/index.php/api/getOpenid/get?code='+code,//自己的服务接口地址
                method: 'GET',
                header: {
                  "Content-Type": "applciation/json"
                },
                success: function (res) {
                  getApp().globalData.openid=res.data.openid;
                },
                fail: function () {
                }
              })
        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      },
      fail: function () {
        console.log('登陆失败')
      }
    })
  },
  
  register: function (userInfo) {
    wx: wx.request({
      url: getApp().globalData.domain + 'Member/is_member',
      data: {
        openid: getApp().globalData.openid
      },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      dataType: 'json',
      success: function (res) {
        if (res.data.status == 0) {
          //如果不是会员
          wx: wx.request({
            url: getApp().globalData.domain + 'Member/reg',
            // method: 'GET',
            data: {
              userInfo: userInfo,
              openid: getApp().globalData.openid
            },
            header: {
              'Accept': 'application/json'
            },
            method: 'GET',
            success: function (res) {
              if (res.data.status == 0) {
                // 失败的原因
                wx.showToast({
                  title: res.data.msg,
                  content: '',
                })
              }
            }
          })
        }
      }
    })
  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 500);
  },
  // 菜品详情
  detail: function(e) {
    wx.setStorageSync('id', e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../menu/menudetail?id=' + id ,
    })
  },
  onUnload: function() {
    try {
      wx.clearStorage()
      wx.clearStorageSync()
    } catch (e) {
    }
  },
  onHide: function() {
    try {
      wx.clearStorage()
      wx.clearStorageSync()
    } catch (e) {
    }
  }

})