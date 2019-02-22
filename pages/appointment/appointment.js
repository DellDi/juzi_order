var rpn = require('../../utils/rpn.js')
Page({
  data: {
    _access_token: '',
    assignseat: null,
    selectseat: null,
    array: [],
    clockswitch: '',
    pointswitch: '',
    index: 0,
    multiArray: [],
    clockname: '',
    multiIndex: [0, 0, 0],
  },

  onLoad: function (options) {

    var that = this;
    that.get_access_token();
    var domain = getApp().globalData.domain;
    wx: wx.request({
      url: domain + 'Appointment/get_appoint_date',
      // method: 'GET',
      data: {
        shopid: getApp().globalData.shopid
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        that.setData({
          shopRes: res.data.shopRes,
          classes: res.data.classes,
          multiArray: res.data.arr,
          array: res.data.tables,
          ids: res.data.ids,
        })
        if (res.data.time_period){
          res.data.arr[2] = res.data.time_period[0][0]
          that.setData({
            clockname: res.data.arr[1][0],
            clock: res.data.time_period[0][0][0]
          })
        }
        that.data.multiArray = res.data.arr;
        that.data.clocknames = res.data.time_period;
        that.data.array = res.data.tables;

      },
      fail: function (res) { 
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function (res) { },
    })


  },
  get_access_token: function () {
    var that = this;
    wx.request({
      url: "https://diancan.zhonghaokeji.net/index.php/api/Getopenid/get1",
      data: {

      },
      success: function (res) {
        that.setData({
          _access_token: res.data.access_token//将_access_token存起来

        })
      }
    })
  },

  bindMultiPickerColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    this.data.multiIndex[e.detail.column] = e.detail.value;
    this.data.multiArray[2] = this.data.clocknames[this.data.multiIndex[1]][0];
    if(e.detail.column==1){
        this.setData({
          clockname: this.data.multiArray[1][this.data.multiIndex[1]],
          clock: this.data.clocknames[this.data.multiIndex[1]][0][0],
          multiArray: this.data.multiArray,
          multiIndex:this.data.multiIndex
        })
    }else{
      this.setData({
        clockname: this.data.multiArray[1][this.data.multiIndex[1]],
        clock: this.data.clocknames[this.data.multiIndex[1]][0][this.data.multiIndex[2]],
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      })
    }
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  formSubmit: function (e) {
    if (!e.detail.value.fullname) {
      wx.showModal({
        title: '',
        content: '姓名不能为空',
      })
      return false;
    }
    if (!e.detail.value.mobile) {
      wx.showModal({
        title: '',
        content: '电话不能为空',
      })
      return false;
    }
    var that = this;
    var domain = getApp().globalData.domain;
    wx: wx.request({
      url: domain + 'Appointment/appoint',
      // method: 'GET',
      data: {
        shopid: getApp().globalData.shopid,
        openid: getApp().globalData.openid,
        appointtime: e.detail.value.appointtime,
        table_id: e.detail.value.table_id,
        fullname: e.detail.value.fullname,
        mobile: e.detail.value.mobile,
        // id:id
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        var data = {};
        if (res.data.status == 1) {
          wx:wx.request({
            url: 'https://diancan.zhonghaokeji.net/index.php/api/Getopenid/send5',
            data: {
              access_token:that.data._access_token,
              template_id: 'Yw1vXTP044qtiLJ0tgVKkPE4lQ6aGOns3ogJcLaCQng',
              form_id: e.detail.formId,
              _access_token: that.data._access_token,
              openid: getApp().globalData.openid,
                "keyword1":res.data.appointResult.shop_name,
                "keyword2": res.data.appointResult.table_num, 
                "keyword3": res.data.appointResult.order_num,
                "keyword4":res.data.appointResult.appoint_time, 
                "keyword5": res.data.appointResult.appoint_detail
              },
            method: 'post',
            // header: { "Content-Type": "application/json" },
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
            },
            fail: function(res) {},
            complete: function(res) {},
          })
          wx.navigateTo({
            url: './appointdetail?order_num=' + res.data.appointResult.order_num +
              '&order_date=' + res.data.appointResult.appoint_time + '&appoint_detail=' + res.data.appointResult.appoint_detail + '&id=' + res.data.appointResult.id + '&shop_name=' + res.data.appointResult.shop_name + '&table_num=' + res.data.appointResult.table_num
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '服务器繁忙..',
        })
       },
      complete: function (res) { },
    })
  }
})