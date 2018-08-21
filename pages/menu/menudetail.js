// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // disabled:'',
    isLike: true,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    name: '香菇牛腩土豆',
    price: '25',
    kinds: '',
    // imgUrls: [
    //   "http://mz.djmall.xmisp.cn/files/product/20161201/148057921620_middle.jpg",
    //   "http://mz.djmall.xmisp.cn/files/product/20161201/148057922659_middle.jpg",
    //   "http://mz.djmall.xmisp.cn/files/product/20161201/148057923813_middle.jpg",
    //   "http://mz.djmall.xmisp.cn/files/product/20161201/148057924965_middle.jpg",
    //   "http://mz.djmall.xmisp.cn/files/product/20161201/148057925958_middle.jpg"
    // ],
    detail: '土豆，牛腩，葱，蒜',
    make: '小火慢炖，加糖三勺，水少许',
    detailImg: [
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_1.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_2.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_3.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_4.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_5.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_6.jpg",
    ],
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgUrl // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loaddetail(options.id, options.index);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  loaddetail: function (id, index) {
    var page = this;
    var menu_id = id;
    var index = index;
    // console.log(menu_id)
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/food_content',
      method: 'GET',
      data: {
        shop_id: 2,
        menu_id: menu_id
      },
      success: function (res) {
        // console.log(res)
        var kinds = res.data[0]
        page.setData({
          kinds: kinds,
          imgUrl: res.data[0].lunbo[0],
          index: index
        })
      }
    })
  },
  addCar: function (e) {
    if (!wx.getStorageSync('tableno')) {
      wx.showToast({
        title: '请先扫码点餐',
        icon:'none'
      })
      return false;
    }
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      menu_id: e.target.dataset.id,
      index: e.target.dataset.index
    });
    wx.navigateBack({
      delta: 1
    })
  }
})