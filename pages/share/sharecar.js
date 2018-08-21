Page({
  data: {
    vervher: '',
    money: "30",
    voucher: "",
    vouche: "代金券",
    story: "",
    usertime: "全天可用",
    startdeta: "2018.07.25",
    enddeta: " 2018.07.25",
    use: "未使用",
    not: "不计代金券",
    notuse: "未使用",
    isgq: 1,
  },
  onLoad: function(options) {
// console.log(options)
    var that = this;
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    });
    // console.log(options);
    wx: wx.request({
      url: getApp().globalData.domain + '/voucher/get_one_voucher',
      data: {
        voucher_id: options.id
      },
      // header: {},
      method: 'GET',
      header: {
        'Accept': 'application/json'
      },
      dataType: 'json',
      // responseType: 'text',
      success: function(res) {
        // console.log(res)
        that.setData({
          voucher: res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onShow(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  /* 转发*/
  onShareAppMessage: function(ops) {
    console.log(ops)
    if (ops.from === 'button') {
    }
    return {
      title: '桔子点餐',
      desc: '你的好友邀请你领取优惠券',
      imageUrl: '/img/my/coupon.1.1.jpg',
      path: 'pages/share/sheardetails?id=' + ops.target.dataset.id,
      success: function(res) {
        // // 转发成功
        // console.log(res)
        // // console.log("转发成功:" + JSON.stringify(res));
        // var shareTickets = res.shareTickets;
        // if (shareTickets.length == 0) {
        //   return false;
        // }
        // //可以获取群组信息
        // wx.getShareInfo({
        //   shareTicket: shareTickets[0],
        //   success: function (res) {
        //     // console.log(res)
        //   }
        // })
        wx.showShareMenu({
          // 要求小程序返回分享目标信息
          withShareTicket: true
        });
//         wx.getShareInfo(res) //获取转发详细信息        　　
//         if (res.shareTickets) {
//           　　 // 获取转发详细信息          　　
//           wx.getShareInfo({ 　　
//             shareTicket: res.shareTickets[0],
//             　success(res) {            　　
//               res.errMsg; // 错误信息              　　
//               res.encryptedData; // 解密后为一个 JSON 结构(openGId 群对当前小程序的唯一 ID)  　　
//               res.iv; // 加密算法的初始向量　
//             },
//         　　fail() {},
//         　　complete() {}        　　
//           });　　
//         }
      },
      fail: function(res) {
        // 转发失败
        // console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
})