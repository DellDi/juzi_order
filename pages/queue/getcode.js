// pages/queue/getcode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: "6~8",
    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '', //获取到的手机栏中的值
    checkcode: null,
    check: '',
    _access_token: '',
  },

  //获取手机栏input中的值
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },


  //获取验证码按钮
  bindButtonTap: function() {
    var that = this;

    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })

    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值

    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空

    if (phone == '') {
      warn = "号码不能为空";
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      warn = "手机号格式不正确";
    } else {
      //当手机号正确的时候提示用户短信验证码已经发送
      wx.showToast({
        title: '短信验证码已发送',
        icon: 'none',
        duration: 2000
      });

      //设置一分钟的倒计时
      var interval = setInterval(function() {
        currentTime--; //每执行一次让倒计时秒数减一
        that.setData({
          text: currentTime + 's', //按钮文字变成倒计时对应秒数

        })
        //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            text: '重新发送',
            currentTime: 61,
            disabled: false,
            color: '#929fff'
          })
        }
      }, 1000);

    };

    //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
    if (warn != null) {
      wx.showModal({
        title: '提示',
        content: warn
      })

      that.setData({
        disabled: false,
        color: '#929fff'
      })
      return;

    }
    wx: wx.request({
      url: getApp().globalData.domain + 'Queue/get_mobile_code',
      // method: 'GET',
      data: {
        mobile: phone
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function(res) {
        // wx.setStorageSync('code', res.data.code);
        getApp().globalData.code = res.data.code
        // that.setData({
        //   queue_lst: res.data
        // })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.get_access_token();
    that.setData({
      id: options.id,
      type: options.type
    })
  },

  niming: function(e) {
    // var check = ''
    if (e.detail.value == '') {
      this.data.check = 0
    } else {
      this.data.check = 1
    }
  },
  checkcode: function(e) {
    var that = this;
    if (e.detail.value !== getApp().globalData.code) {
      that.data.checkcode = 0;
    } else {
      that.data.checkcode = 1;
    }
  },
  get_access_token: function () {
    var that = this;
    wx.request({
      url: "https://diancan.zhonghaokeji.net/index.php/api/Getopenid/get1",
      data: {

      },
      success: function (res) {
        console.log(res)
        that.setData({
          _access_token: res.data.access_token//将_access_token存起来

        })
      }
    })
  },  
  // 排队
  formSubmit: function(e) {
    var that = this;
    if (!e.detail.value.mobile){
      wx.showToast({
        title: '验证码不能为空',
        icon: '',
        image: '',
      })
      return false;
    }
    if (that.data.checkcode == 0) {
      wx.showToast({
        title: '验证码不正确',
        icon: 'none',
        duration: 1500
      })
    } else {
      that.imm_lineup(e);
    }
  },
  //立即排队
  imm_lineup: function(e) {
    var that=this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Queue/queue_code',
      // method: 'GET',
      data: {
        shopid: getApp().globalData.shopid,
        openid: getApp().globalData.openid,
        mobile: e.detail.value.mobile,
        table_type_id: e.detail.value.table_type_id,
        is_send: this.data.check
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function(res) {
        console.log(that.data._access_token)
        var data = {};
        if (res.data.queue_status == 1) {
          //发送模板消息
          wx: wx.request({
            url: 'https://diancan.zhonghaokeji.net/index.php/api/Getopenid/send4',
            data: {
              access_token: that.data._access_token,
              template_id: 'cxsrvGIRBmLCUiQVwKF5R1kbWsv58Ps4jQMsioFLG0U',
              form_id: e.detail.formId,
              _access_token: that.data._access_token,
              openid: getApp().globalData.openid,
                "keyword1": res.data.arr.shop_name, 
                "keyword2":res.data.arr.table_type, 
                "keyword3": res.data.arr.count,
                "keyword4": res.data.arr.queue_no
             
            },
            method: 'post',
            // header: { "Content-Type": "application/json" },
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              console.log(res)
            },
            fail: function (res) { },
            complete: function (res) { },
          })
          wx.reLaunch({
            url: './queueres?num=' + res.data.arr.count + '&queue_no=' + res.data.arr.queue_no +
              '&table_type=' + res.data.arr.table_type + '&queue_id=' + res.data.arr.queue_id,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }

})