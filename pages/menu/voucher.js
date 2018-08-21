var id;
Page({
  data: {
    voucher:[],
  },
  onLoad: function (options) {
    this.openHistorySearch();
    var that = this;
    that.setData({
      date:options.data,
      price:options.price
    })
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/voucher',
      method: 'GET',
      data: {
        date: this.data.date,

      },
      success: function (res) {
        console.log(res);
        that.setData({
          voucher: res.data
          // cutMonney:res.data[index].voucher_num
        })
      }
    })
  },
  openHistorySearch: function () {
    this.setData({
      uhide: wx.getStorageSync('uhide') || '',//若无储存则为空
    })
  },
  choseTxtColor: function (e) {
    var that = this;
    var uhide = this.data.uhide;
    var item = this.data.item;
    var itemId = e.currentTarget.dataset.id;
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
   
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/full_money',
      method: 'GET',
      data: {
        binding_id: itemId,
        price:that.data.price
      },
      success: function (res) {
        console.log(res);
        if(res.data.msg==1){
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
          prevPage.setData({
            id: e.currentTarget.dataset.id,
            cutMonney: e.currentTarget.dataset.cutmonney,
          });
          wx.navigateBack({
            delta: 1
          })
        }else{
          wx.showToast({
            title: '不能使用',
            icon: '',          
          })
        }

      }
    })
    console.log(e)

  }
})