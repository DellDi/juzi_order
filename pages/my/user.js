// pages/my/user.js
const app = getApp()
Page({
  data: {
    nickname: '',
    headimgurl: '',
  },
  onLoad: function () {

    this.setData({
      headimgurl: getApp().globalData.headimgurl,
      nickname: getApp().globalData.nickname
    })
  },
  parcel: function () {
    wx.showToast({
      title: '暂未开启外卖',
      image: '../../img/home/model.png'
    })
  }
  ,
  address: function () {
    wx.showToast({
      title: '暂未开启外卖',
      image: '../../img/home/model.png'
    })
  }
})
