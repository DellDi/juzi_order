var rpn = require('../../utils/rpn.js')
Page({
  data: {
    _access_token: '',
    assignseat: null,
    selectseat: null,
    array: [],
    clockswitch: '',
    pointswitch: '',
    // objectArray: [{
    //   id: 0,
    //   name: '美国'
    // },
    // {
    //   id: 1,
    //   name: '中国'
    // },
    // {
    //   id: 2,
    //   name: '巴西'
    // },
    // {
    //   id: 3,
    //   name: '日本'
    // }
    // ],

    index: 0,
    multiArray: [
      [],
      [],
      []
    ],
    clockname: '',
    // objectMultiArray: [
    //   [{
    //     id: 0,
    //   },
    //   {
    //     id: 1,
    //   },
    //   {
    //     id: 3,
    //   },
    //   {
    //     id: 4,
    //   },
    //   {
    //     id: 5,
    //   },
    //   {
    //     id: 6,
    //   }
    //   ],
    //   [{
    //     id: 0,
    //   },
    //   {
    //     id: 1,
    //   },
    //   {
    //     id: 2,
    //   },
    //   {
    //     id: 3,
    //   },
    //   {
    //     id: 4,
    //   }
    //   ],
    //   [{
    //     id: 0,
    //   }

    //   ]
    // ],
    multiIndex: [0, 0, 0],
  },

  onLoad: function (options) {

    var that = this;
    that.get_access_token();
    var domain = getApp().globalData.domain;
    wx: wx.request({
      url: domain + 'Appointment/get_appoint_date',
      method: 'GET',
      data: {
        shopid: wx.getStorageSync('shopid')
      },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        // res.data.arr[2] = res.data.time_period[0][0]
        that.setData({
          shopRes: res.data.shopRes,
          classes: res.data.classes,
          multiArray: res.data.arr,
          array: res.data.tables,
          ids: res.data.ids,
          // clockname:res.data.arr[1][0],
          // clock: res.data.time_period[0][0][0]
        })
        if (res.data.time_period){
          res.data.arr[2] = res.data.time_period[0][0]
          that.setData({
            clockname: res.data.arr[1][0],
            clock: res.data.time_period[0][0][0]
          })
        }
        that.data.multiArray = res.data.arr;
        // that.data.objectMultiArray = res.data.objectMultiArray;
        that.data.clocknames = res.data.time_period;
        that.data.array = res.data.tables;

      },
      fail: function (res) { },
      complete: function (res) { },
    })


  },
  get_access_token: function () {
    var that = this;
    var APPID = 'wx8518366e7f373603';
    var APPSECRET = 'f5cfca9207544afce984279dc253b0ad';
    wx.request({
      url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + APPSECRET,
      data: {

      },
      success: function (res) {
        // console.log(res);
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
   

    console.log(this.data)

  },
  bindPickerChange: function (e) {

    console.log('id', e.target.dataset.id)
    console.log(e)
    console.log('value', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function (e) {
    // console.log(e)
    // return false;
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
        content: '手机号不能为空',
      })
      return false;
    }
    var that = this;
    var domain = getApp().globalData.domain;
    wx: wx.request({
      url: domain + 'Appointment/appoint',
      method: 'GET',
      data: {
        shopid: wx.getStorageSync('shopid'),
        openid: wx.getStorageSync('openid'),
        appointtime: e.detail.value.appointtime,
        table_id: e.detail.value.table_id,
        fullname: e.detail.value.fullname,
        mobile: e.detail.value.mobile,
        // id:id
      },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        // console.log(res)
        var data = {};
        if (res.data.status == 1) {

          //发送模板消息
          data = {
            url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + that.data._access_token,
            template_id: 'rH8TYa-IU5p1ugxRqyh59_-7tJ2mvR5kQnKC9Ux3A3k',
            form_id: e.detail.formId,
            _access_token: that.data._access_token,
            openid: wx.getStorageSync('openid'),
            message: {
              "keyword1": { "value": res.data.appointResult.shop_name, "color": "#173177" },
              "keyword2": { "value": res.data.appointResult.table_num, "color": "#173177" },
              "keyword3": { "value": res.data.appointResult.order_num, "color": "#173177" },
              "keyword4": { "value": res.data.appointResult.appoint_time, "color": "#173177" },
              "keyword5": { "value": res.data.appointResult.appoint_detail, "color": "#173177" },
            }
          };
          // console.log(data)
          getApp().send_message(data)
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
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})