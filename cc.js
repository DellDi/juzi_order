Page({
  data: {
    _access_token: '',
    assignseat: null,
    selectseat: null,
    array: [],
    clockswitch: '',
    pointswitch: '',
    objectArray: [{
      id: 0,
      name: '美国'
    },
    {
      id: 1,
      name: '中国'
    },
    {
      id: 2,
      name: '巴西'
    },
    {
      id: 3,
      name: '日本'
    }
    ],

    index: 0,
    multiArray: [
      [],
      [],
      []
    ],
    clockname: '',
    objectMultiArray: [
      [{
        id: 0,
      },
      {
        id: 1,
      },
      {
        id: 3,
      },
      {
        id: 4,
      },
      {
        id: 5,
      },
      {
        id: 6,
      }
      ],
      [{
        id: 0,
      },
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 4,
      }
      ],
      [{
        id: 0,
      }

      ]
    ],
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
        // console.log(res.data)
        that.setData({
          //  multiArray: multiArray,
          shopRes: res.data.shopRes,
          classes: res.data.classes,
          multiArray: res.data.arr,
          array: res.data.tables,
          ids: res.data.ids
        })
        that.data.multiArray = res.data.arr;
        that.data.objectMultiArray = res.data.objectMultiArray;
        that.data.clockname = res.data.time_period;
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
  bindNumPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      numIndex: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    //  console.log(e.detail.column)
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    var length = this.data.multiArray[1].length;
    var clockswitch = '';
    var pointswitch = '';
    data.multiIndex[e.detail.column] = e.detail.value;

    for (var i = 0; i < length; i++) {
      var a = 'case ' + i + ':\n' +
        ' data.multiArray[2]  = [' + this.data.clockname[i][0] + ']; ' +
        '\n break;';
      clockswitch += '\n' + a;
    }

    for (var i = 0; i < length; i++) {
      var b = 'case ' + i + ':\n' +
        ' data.multiArray[1]  = [' + this.data.multiArray[1] + '];' +
        '\n data.multiArray[2]  = [' + this.data.multiArray[2] + '];' +
        '\n break;';
      pointswitch += '\n' + b;
    }



    ' switch (' + e.detail.column + ') {\n' +   //改变的列
      'case 0:\n' +                    //为0时
      'switch (' + data.multiIndex[0] + ') {\n' +   //第一列的值
      pointswitch +
      '}\n' +
      ' data.multiIndex[1] = 0;\n' +      //第二列的值
      'data.multiIndex[2] = 0;\n' +       //第三列的值
      ' break;\n' +
      'case 1:\n' +                        // 改变的列值为1
      'switch (' + data.multiIndex[0] + ') {\n' +    //第一列 
      'case 0:\n' +
      'switch (' + data.multiIndex[1] + ') {\n' +     //第二列 
      clockswitch +
      '}\n' +
      'break;\n' +
      '}\n' +
      'switch (' + data.multiIndex[1] + ') {\n' +      // 第二列
      clockswitch +
      '}\n' +
      'data.multiIndex[2] = 0;\n' +     //第三列的值
      'break;\n' +
      '}'


    console.log(' switch (' + e.detail.column + ') {\n' +   //改变的列
      'case 0:\n' +                    //为0时
      'switch (' + data.multiIndex[0] + ') {\n' +   //第一列的值
      pointswitch +
      '}\n' +
      ' data.multiIndex[1] = 0;\n' +      //第二列的值
      'data.multiIndex[2] = 0;\n' +       //第三列的值
      ' break;\n' +
      'case 1:\n' +                        // 改变的列值为1
      'switch (' + data.multiIndex[0] + ') {\n' +    //第一列 
      'case 0:\n' +
      'switch (' + data.multiIndex[1] + ') {\n' +     //第二列 
      clockswitch +
      '}\n' +
      'break;\n' +
      '}\n' +
      'switch (' + data.multiIndex[1] + ') {\n' +      // 第二列
      clockswitch +
      '}\n' +
      'data.multiIndex[2] = 0;\n' +     //第三列的值
      'break;\n' +
      '}')

    this.setData(data);
  },
  bindPickerChange: function (e) {

    console.log('id', e.target.dataset.id)
    // console.log(e)
    console.log('value', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log(e)
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