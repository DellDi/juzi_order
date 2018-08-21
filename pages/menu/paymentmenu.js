Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: "46132323224535",
    detatime: "2018-07-03",
    foodtotle: "339.0",
    redustotle: "339.0",
    reduse: "8折",
    id: '',
    cutMonney: '',
    numb: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    // console.log(options.data)
    that.setData({
      data:options.data,
      cutMonney: wx.getStorageSync('sumMonney') > 19 ? 3 : 0,
    })

    wx.request({
      url: getApp().globalData.domain + 'Orderdish/order_pay',
      method: 'GET',
      data: {
        date: this.data.data,
      
      },
      success: function (res) {
        // console.log(res);
        that.setData({
          order: res.data
        })
      }
    })
  },
  click:function(e){
    console.log(this.data.order.food_price)
   wx.navigateTo({
     url: '../menu/voucher?data='+this.data.data+'&price='+this.data.order.food_price,
   })
  },
  submit:function(){
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    // console.log(currPage)
    this.setData({
      cutMonney: currPage.data.cutMonney,
      numb: currPage.data.numb,
    })
    // console.log(currPage.data.cutMonney)
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

  }
})