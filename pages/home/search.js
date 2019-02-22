// pages/homearch.js
var app = getApp();
Page({
  data: {
    inputVal: '',
    hidden: true,
    food: [],
    modalhidden: true,
    searchRecord: [],
    relsut: true,
    placeholder: ''
  },
  onLoad: function (options) {
    this.openHistorySearch()
    if (wx.getStorageSync('searchRecord')) {
      var searchRecord = wx.getStorageSync('searchRecord');
      console.log(searchRecord)
      this.setData({
        placeholder: searchRecord[0].value
      })
    }
  },
  openHistorySearch: function () {
    this.setData({
      searchRecord: wx.getStorageSync('searchRecord') || [], //若无储存则为空
    })
  },
  bindkeyInput: function (e) {
    this.setData({
      relsut: true,
      inputVal: e.detail.value
    })
  },
  searchBtn: function () {
    this.searchSubmitFn()
  },
  focusInputEvent: function () {
    this.setData({
      relsut: true,
      placeholder: ''
    })
  },
  hotWordSearch: function (event) {  //点击热词搜索
    this.setData({
      inputVal: event.currentTarget.dataset.word
    });
    this.searchSubmitFn(event.currentTarget.dataset.word);
  },
  searchSubmitFn: function (word) {
    var that = this;
    that.setData({ hidden: false });
    if (this.data.inputVal == '' && this.data.placeholder == '') {
      that.setData({
        modalhidden: false,
        hidden: true,
        relsut: false
      })
      return;
    }
    else if (this.data.placeholder != '') {
      var keywords = this.data.placeholder
    }
    else {
      var keywords = word.detail ? word.detail.value.input : word;
    }
    console.log(keywords)
    wx: wx.request({
      url: getApp().globalData.domain + 'Menu/menu_search',
      method: 'GET',
      data: {
        shopid: 2,
        keywords: keywords
      },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({
            food: res.data.foods,
            hidden: true,
            relsut: false
          })
          that.setSearchStorage()          
        } else {
          that.setData({
            hidden: true,
            relsut: true
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'none',  
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器繁忙..',
        })
      }
    })
  },
  hideModal: function () {
    this.setData({
      modalhidden: true
    })
  },
  clearinput: function () {
    this.setData({
      inputVal: '',
      placeholder: ''
    })
  },
  setSearchStorage: function (e) {
    var that = this;
    var inputVal = that.data.inputVal;
    var searchRecord = this.data.searchRecord;
    if (inputVal == '') {
      //输入为空时的处理
    } else {
      //将搜索值放入历史记录中,只能放前五条
      if (searchRecord.length < 10) {
        searchRecord.unshift({
          value: inputVal
        })
      } else {
        searchRecord.pop() //删掉旧的时间最早的第一条
        searchRecord.unshift({
          value: inputVal
        })
      }
      for (let i = 1; i < searchRecord.length; i++) {  //已有记录删除重复的
        if (inputVal == searchRecord[i].value) {
          searchRecord.splice(i, 1);
          break;
        }
      }
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecord', searchRecord)
    }
  },
  historyDelFn: function () {
    wx.clearStorageSync('searhRecord')
    this.setData({
      searchRecord: []
    })
  },
  detail: function (e) {
    getApp().detail(e)
  },
  searchBtn: function (word) {
    this.searchSubmitFn(word.detail.value)
  }

})
