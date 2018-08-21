//app.js
App({
  globalData: {
    userInfo: null,
    openid: null,
    domain: 'http://ngfyzt.natappfree.cc/orange/public/index.php/api/',
  },
  onLaunch: function(ops) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    this.getOpenid();
    this.getUserInfo();
    if(ops.sence==1044){
      console.log(ops.shareTicket)
    }
  },
  // // 登录
  // wx.login({
  //   success: function (res) {
  //     if (res.code) {
  //       //发起网络请求
  //       wx.request({
  //       //  url: 'http://192.168.17.247/admin/Getopenid/getopenid',
  //         url:'http://192.168.18.44/orange/public/index.php/api/Member/getOpenid',
  //         data: {
  //           'code': res.code
  //         },
  //         method: 'GET',
  //         header: { 'content-type': 'application/json'},
  //         success:function(data){
  //      console.log(openid);
  //            this.globalData.openid = res.openid;
  //           // this.openid = e.openid
  //            console.log(getApp().globalData.openid);
  //         }
  //       })
  //     } else {
  //       console.log('登录失败！' + res.errMsg)
  //     }
  //   }
  // });
  getOpenid: function() {
    var that = this;
    wx.login({
      success: res => {
        if (res.code) {
          //调用request请求api转换登录凭证
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              //小程序唯一标识
              appid: 'wx8518366e7f373603',
              //小程序的 app secret
              secret: 'f5cfca9207544afce984279dc253b0ad',
              grant_type: 'authorization_code',
              js_code: res.code
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              getApp().globalData.openid = res.data.openid
              wx.setStorageSync('openid', res.data.openid)
            }
          })
        }
      }
    })
  },
  getUserInfo: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
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
  detail: function (e) {
    wx.setStorageSync('id', e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    wx.setStorageSync('index', e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../menu/menudetail?id=' + id + '&index=' + index,
    })
  },
  // put: function(k, v, t) {
  //   wx.setStorageSync(k, v)
  //   var seconds = parseInt(t);
  //   if (seconds > 0) {
  //     var timestamp = Date.parse(new Date());
  //     timestamp = timestamp / 1000 + seconds;
  //     wx.setStorageSync(k + dtime, timestamp + "")
  //   } else {
  //     wx.removeStorageSync(k + dtime)
  //   }
  // },
  send_message: function (data){
  let url = data.url;
  let openid = data.openid;
  let _jsonData = {
    touser: openid,
    template_id: data.template_id,
    form_id: data.form_id,
    page: "",
    data: data.message
  }
    // console.log(_jsonData)
  wx.request({
    url: url,
    data: _jsonData,
    method: 'post',
    header: {
      "Content-Type": "application/json; encoding=utf-8"
    },
    success: function (res) {
      console.log(res)
    },
    fail: function (err) {
      console.log('request fail ', err);
    },
    complete: function (res) {
      console.log("request completed!");
    }
  })
},
onUnload:function(){
  try {
    wx.clearStorage()
    wx.clearStorageSync()
    console.log('success')
  } catch (e) {
    console.log('fail')
  }
},
onHide:function(){
  try {
    wx.clearStorage()
    wx.clearStorageSync()
    console.log('success')
  } catch (e) {
    console.log('fail')
  }
}

})