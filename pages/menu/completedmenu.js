Page({
  data: {
    showView: true,
    item: [
      {
        id: "http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg",
        image: "http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg",
        name: "小龙虾",
        massage: "",
        mon: "$65.0",
        numb: "2"
      },
      {
        id: "http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg",
        image: "http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg",
        name: "小龙虾",
        mon: "$65.0",
        numb: "2"
      },
      {
        id: "http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg",
        image: "http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg",
        name: "小龙虾",
        mon: "$65.0",
        numb: "2"
      }
    ]
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    showView: (options.showView == "true" ? true : false)
  }
  , onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  }
})