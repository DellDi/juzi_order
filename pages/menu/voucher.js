var id;
Page({
  data: {
    cash_voucher: [],
    full_cut_voucher: [],
    disable: []
  },
  onLoad: function(options) {
    this.openHistorySearch();
    var that = this;
    that.setData({
      order_num: options.order_num,
      price: options.price
    })
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/voucher',
      // method: 'GET',
      data: {
        order_num: this.data.order_num,
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      success: function(res) {
        that.setData({
          cash_voucher: res.data.cash_voucher,
          full_cut_voucher: res.data.full_cut_voucher,
          disable: res.data.disable
        })
      }
    })
  },
  openHistorySearch: function() {
    this.setData({
      uhide: wx.getStorageSync('uhide') || '', //若无储存则为空
    })
  },
  choseTxtColor: function(e) {
    var that = this;
    var uhide = this.data.uhide;
    var itemId = e.currentTarget.dataset.id;
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/full_money',
      // method: 'GET',
      data: {
        binding_id: itemId,
        price: that.data.price
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data.msg == 1) {
          wx.setStorageSync('uhide', itemId)
          if (uhide == itemId) {
            that.setData({
              uhide: 0
            });
          } else {
            that.setData({
              uhide: itemId
            })
          }
          console.log(that.data.uhide)
          prevPage.setData({
            id: e.currentTarget.dataset.id,
            cutMonney: e.currentTarget.dataset.cutmonney,
          });
          wx.navigateBack({
            delta: 1
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '服务器繁忙..',
        })
      }
    })
  }
})