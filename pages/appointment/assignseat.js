// pages/appointment/assignseat.js
var app = getApp();
Page({
  data: {
    cateItems: [ // 展示的数据
      {
        cate_id: 1,
        cate_name: "全部",
        // ishaveChild: true,
        children: [{
            child_id: 1,
            name: '大厅1号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
          },
          {
            child_id: 2,
            name: '大厅2号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
          },
          {
            child_id: 3,
            name: '大厅3号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
          },
          {
            child_id: 4,
            name: '大厅4号',
            num: '3~6人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
          },
          {
            child_id: 5,
            name: '大厅5号',
            num: '3~6人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
          },
          {
            child_id: 6,
            name: '大厅6号',
            num: '3~6人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
          },
          {
            child_id: 7,
            name: '大厅7号',
            num: '6~9人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
          },
          {
            child_id: 8,
            name: '大厅8号',
            num: '6~9人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
          },
          {
            child_id: 9,
            name: '大厅9号',
            num: '6~9人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
          },
          {
            child_id: 10,
            name: '1号包桌',
            num: '>10人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
          },
          {
            child_id: 11,
            name: '2号包桌',
            num: '>10人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
          },
          {
            child_id: 12,
            name: '3号包桌',
            num: '>10人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
          },
          {
            child_id: 13,
            name: '3号包桌',
            num: '6~9人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
          },
          {
            child_id: 14,
            name: '牡丹厅',
            num: '6~9人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
          },
          {
            child_id: 14,
            name: 'VIP厅',
            num: '6~9人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
          }



        ]
      },
      {
        cate_id: 2,
        cate_name: "大厅",
        ishaveChild: true,
        children: [{
            child_id: 1,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161212/14815381301.jpg"
          },
          {
            child_id: 2,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161212/14815381411.jpg"
          },
          {
            child_id: 3,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161212/148153815181.jpg"
          },
          {
            child_id: 4,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161212/148153815759.jpg"
          },
          {
            child_id: 5,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161212/148153816983.jpg"
          },
          {
            child_id: 6,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161212/148153817721.jpg"
          },
          {
            child_id: 7,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161212/148153819354.jpg"
          },
          {
            child_id: 8,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161215/148179053369.jpg"
          },
          {
            child_id: 5,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161212/148153816983.jpg"
          },
          {
            child_id: 6,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161212/148153817721.jpg"
          },
          {
            child_id: 7,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161212/148153819354.jpg"
          },
          {
            child_id: 8,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161215/148179053369.jpg"
          },
          {
            child_id: 7,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161212/148153819354.jpg"
          },
          {
            child_id: 8,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161215/148179053369.jpg"
          },
          {
            child_id: 5,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161212/148153816983.jpg"
          },


        ]
      },
      {
        cate_id: 3,
        cate_name: "包厢",
        ishaveChild: true,
        children: [{
            child_id: 1,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815978910.jpg"
          },
          {
            child_id: 2,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159789883.jpg"
          },
          {
            child_id: 3,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815979307.jpg"
          },
          {
            child_id: 4,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159765589.jpg"
          },
          {
            child_id: 1,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815978910.jpg"
          },
          {
            child_id: 2,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159789883.jpg"
          },
          {
            child_id: 3,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815979307.jpg"
          },
          {
            child_id: 4,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159765589.jpg"
          },
          {
            child_id: 1,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815978910.jpg"
          },
          {
            child_id: 2,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159789883.jpg"
          },
          {
            child_id: 3,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815979307.jpg"
          },
          {
            child_id: 4,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159765589.jpg"
          },
          {
            child_id: 2,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159789883.jpg"
          },
          {
            child_id: 3,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815979307.jpg"
          },
          {
            child_id: 4,
            name: '大厅4号',
            num: '1~3人',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159765589.jpg"
          }
        ]
      }

    ],
    curNav: 1, // 控制当前那个按钮点亮
    curIndex: 0 //根据此参数来拿第几个分类的数据
  },

  //事件处理函数  
  switchRightTab: function(e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  detail: function(e) {
    getApp().detail(e);
  },

  //下拉刷新

  // onPullDownRefresh: function () {
  //   this.init();//初始化页面的接口请求
  //   wx.stopPullDownRefresh();//关闭下拉刷新
  // },



  click: function(e) {
    console.log(e)
  },
  onLoad: function(options) {
    var that = this;
    var domain = getApp().globalData.domain;
    wx: wx.request({
      url: domain + 'Appointment/appoint_table',
      method: 'GET',
      data: {
        shopid: wx.getStorageSync('shopid')
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log(res);
        that.setData({
          //  multiArray: multiArray,
          cateItems: res.data,


          //  objectMultiArray: res.data.objectMultiArray
        })

        // that.data.cateItems = res.data;

        console.log(that.data)

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  select_seat: function(e) {
    // console.log(e)
    var selected = e.currentTarget.dataset.value;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'appointment?id=' + id + '&selected=' + selected
    })
  }

})