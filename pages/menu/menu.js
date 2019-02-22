var app = getApp();
Page({
  data: {
    goods: {},
    goodsList: [],
    cart: {
      count: 0,
      total: 0,
      list: {}
    },
    showCartDetail: true,
    scrollTop:0,
    menuFixed: false,
    status:false
  },
  onLoad: function (options) {
    var that = this;
    that.clear_cart();
    var count = this.data.cart.count;
    var total = this.data.cart.total;
    that.setData({
      tableno:getApp().globalData.tableno,
      count:count,
      total:total
      })
    that.coupons();
    that.get_access_token();
    wx: wx.request({
      url: getApp().globalData.domain + 'Orderdish/foodlist',
      data: {
        shopid: getApp().globalData.shopid,
      },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        console.log(res)
        wx.setStorageSync('goods', res.data.food);
        wx.setStorageSync('goodsList',res.data.food_type_list)
      that.setData({
        goods:res.data.food,
        goodsList:res.data.food_type_list,
        classifySeleted: res.data.food_type_list[0].id
      })
      }
    })
  },
  onShow: function () {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if (this.data.menu_id) {
      this.addCart( currPage.data.menu_id)
    }
  },
  tapadd:function(e){
    this.setData({
      showCartDetail: true
    })
    this.addCart(e.currentTarget.dataset.id);
  },
  tapAddCart: function (e) {
    this.addCart(e.currentTarget.dataset.id);
  },
  numminus: function (e) {
    this.minu(e.currentTarget.dataset.id);
  },
  tapReduceCart: function (e) {
    this.reduceCart(e.currentTarget.dataset.id);
  },
  addCart: function (id) {
    var that = this;
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/add_cart',
      data: {
        shop_id: getApp().globalData.shopid,
        menu_id: id,
        open_id: getApp().globalData.openid
      },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        if (res.data.code == 200) {
          var goods = that.data.goods;
          var carr = that.data.cart.list;
          var num = that.data.cart.list[id] || 0;
          that.data.cart.list[id] = num + 1;
          goods[id].num++;
          that.setData({
            goods: goods,
            carr:carr
          })
          that.countCart();
        } else {
          wx.showToast({
            title: res.data.msg,
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
  minu: function (id) {
    var that=this;
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/del_cart',
      data: {
        shop_id: getApp().globalData.shopid,
        menu_id:id,
        open_id: getApp().globalData.openid
      },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        if (res.data.code == 200) {
          var goods = that.data.goods;
          var carr = that.data.cart.list;
          var num = that.data.cart.list[id] || 0;
          if (goods[id].num >=1) {
            goods[id].num--;
            that.data.cart.list[id] = num - 1;
            if (goods[id].num==0){
              delete that.data.cart.list[id];              
            }
          }
          else{
            delete that.data.cart.list[id];
          }
          that.setData({
            goods: goods,
            showCartDetail:true,
            carr:carr
          })
          that.countCart();
          }
        else {
          wx.showToast({
            title: res.data.msg,
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
  reduceCart: function (id) {
    var that = this;
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/del_cart',
      data: {
        shop_id: getApp().globalData.shopid,
        menu_id: id,
        open_id: getApp().globalData.openid
      },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        if (res.data.code == 200) {
          var goods = that.data.goods;
          var carr = that.data.cart.list;
          var num = that.data.cart.list[id]||0;
          if (num <1) {
            delete that.data.cart.list[id];
          } else {
            that.data.cart.list[id] = num - 1;
            goods[id].num--;
            if (goods[id].num == 0) {
              delete that.data.cart.list[id];
            }
          }
          that.setData({
            goods: goods,
            carr:carr
          })
          that.countCart();
        }
        else {
          wx.showToast({
            title: res.data.msg,
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
  countCart: function () {
    var count = 0,
      total = 0;
    for (var id in this.data.cart.list) {
      var goods = this.data.goods[id];
      count += this.data.cart.list[id];
      total = this.accAdd(total,goods.now_price * this.data.cart.list[id]);
    }
    this.data.cart.count = count;
    this.data.cart.total = total;
    this.setData({
      cart: this.data.cart,
      count:count,
      total:total
    });
  },
  follow: function () {
    this.setData({
      followed: !this.data.followed
    });
  },
  onGoodsScroll: function (e) {
    //  console.log(e)
    var scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = this.data.goodsList.length;
    this.data.goodsList.forEach(function (classify, i) {
      var _h = 70 + classify.menu_ids.length * 170;
      if (scrollTop >= h - 100 / scale) {
        classifySeleted = classify.id;
      }
      h += _h;
    });
    this.setData({
      classifySeleted: classifySeleted,
      menuFixed: true
    });
    this.setData({
      menuFixed: false
    })
  },
  detail: function (e) {
    getApp().detail(e)
  },
  tapClassify: function (e) {
    // console.log(e)
    var id = e.target.dataset.id;
    this.setData({
      classifyViewed: id
    });
    var self = this;
    setTimeout(function () {
      self.setData({
        classifySeleted: id
      });
    }, 100);
  },
  showCartDetail: function () {
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
  },
  hideCartDetail: function () {
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
  },
  bindcoupont: function (e) {
    var voucher_id = e.currentTarget.dataset.id;
    var that = this;
    // console.log(getApp().globalData.openid)
    // return false;
    wx: wx.request({
      url: getApp().globalData.domain + 'Voucher/receive',
      method: 'GET',
      data: {
        voucher_id: voucher_id,
        openid: getApp().globalData.openid
      },
      // method: 'post',
      // header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        // console.log(res)
        if (res.data.result == 1) {
          wx.showToast({
            title: res.data.msg,
            content: '',
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            content: '',
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器繁忙..',
        })
      },
      complete: function (res) { },
    })
  },
  coupons: function () {
    var page = this;
    wx.request({
      url: getApp().globalData.domain + 'Voucher/menu_voucher',
      data: {
        shop_id: getApp().globalData.shopid,
      },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        // console.log(res.data)
         var status=(res.data.status==1)?false:true;
         console.log(status)
        page.setData({
          menu_voucher: res.data.voucher[0],

          status: status

        })
      },
      fail: function () {
        wx.showToast({
          title: '服务器繁忙..',
        })
      }
    })
  },
  // 两个浮点数求和 
  accAdd: function (num1, num2) {
    var r1, r2, m;
    try {
      r1 = num1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = num2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return Math.round(num1 * m + num2 * m) / m;
  }
  ,
  // 两个浮点数相减 
  accSub: function (num1, num2) {
    var r1, r2, m, n;
    try {
      r1 = num1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = num2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
  },
  submit: function (e) {
    var that = this;
    var tableno = getApp().globalData.tableno ? getApp().globalData.tableno : '';
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/create_order',
      data: {
        open_id: getApp().globalData.openid,
        shop_id: getApp().globalData.shopid,
        tableno: tableno,
        // price:price
      },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        console.log(res)
        if (res.data.status) {
          var data = {};
          //发送模板消息
          wx: wx.request({
            url: 'https://diancan.zhonghaokeji.net/index.php/api/Getopenid/send4',
            data: {
              access_token: that.data._access_token,
              template_id: 'UkNEcD133gmivVXFAk2jXdw85Bax4U1cL9gqyKZD-Ec',
              form_id: e.detail.formId,
              _access_token: that.data._access_token,
              openid: getApp().globalData.openid,
                "keyword1":res.data.arr.order_num,
                "keyword2":res.data.arr.shop_name, 
                "keyword3": res.data.arr.txt, 
                "keyword4":res.data.arr.order_create_time
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
            url: '../menu/confirmmenu?order_num=' + res.data.arr.order_num
          })
        } else {
          wx.showToast({
            title: '服务器异常..',
            icon: '',
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器繁忙..',
        })
      }
    })
  }, clear_cart: function () {
    var page = this;
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/clear_cart',
      data: {
        openid: getApp().globalData.openid,
      },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {

      },
      fail: function () {
        wx.showToast({
          title: '服务器繁忙..',
        })
      }
    })
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
  clearcart:function(){
  this.data.cart.list={};
  var carr = this.data.cart.list;
  var count = this.data.cart.count;
  var total = this.data.cart.total;
  this.setData({
    carr:carr,
    goods:wx.getStorageSync('goods'),
    goodsList:wx.getStorageSync('goodsList'),
    count:0,
    total:0
  })
    this.clear_cart();
  }
})

