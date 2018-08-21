//获取应用实例  
var app = getApp();
const util = require("../../utils/util.js")

Page({
  data: {
    show: "",
  },

  onLoad: function() {
    console.log('onLoad')
  },
  click: function() {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        var url = res.result;
        var result = util.parseURL(url);
        console.log(result.tableno)
        wx.setStorageSync('tableno', result.tableno)
        
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        //跳转到菜品列表
        wx.navigateTo({
          url: '../menu/menu',
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
})