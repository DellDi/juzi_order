var app = getApp();
Page({
  data: {
    catename:"",
    foods:[],
    cart: [],
    curNav:1,
    cost:0,
    count:0,
    selected:0,
    menu_id:'',
    index:'',
    
  },
  numadd:function(e,id,index){
    if(e){
      id = e.currentTarget.dataset.id;
      index = e.currentTarget.dataset.index;
    }
  var that=this;
    wx.request({
      url: getApp().globalData.domain + 'Orderdish/add_cart',
      method: 'GET',
      data: {
        shop_id: 2,
        menu_id: id,
        open_id: getApp().globalData.openid
      },
      success: function (res) {
           if(res.data.code==200){
             var info = that.data.foods;
             info[that.data.selected].food[index].num++;
             var coun = 0;
             for (var i in info) {
               for (var j in info[i].food) {
                 coun += info[i].food[j].num
               }
             }
             that.setData({
               cost: that.data.cost + that.data.foods[that.data.selected].food[index].now_price,
               foods: info,
               count: coun
             })
           }else{
              wx.showToast({
                title: res.data.msg,
              })
           }
      }
    })  
  },
  numminus:function(e){
    // console.log(e)
    var that = this;

     wx.request({
        url: 'http://192.168.17.247/admin/Orderdish/del_cart',
        method: 'GET',
        data: {
          shop_id: 2,
          menu_id: e.currentTarget.dataset.id,
          open_id: getApp().globalData.openid
        },
        success: function (res) {
          // console.log(res)
         if(res.data.code==200){
           var info = that.data.foods;
           if (info[that.data.selected].food[e.currentTarget.dataset.index].num != 0) {
             info[that.data.selected].food[e.currentTarget.dataset.index].num--;
             var coun = 0;
             // for (var i in info) {
             for (var j in info[that.data.selected].food) {
               coun += info[that.data.selected].food[j].num
             }
             // console.log(coun)
             that.setData({
               cost: that.data.cost - that.data.foods[that.data.selected].food[e.currentTarget.dataset.index].now_price,
               foods: info,
               count: coun
             })
           }

           
          } else {
            wx.showToast({
              title: res.data.msg,
            })
          }
        }
        
      }) 
  },
  turnfoods:function(e){
    this.setData({
      selected:e.currentTarget.dataset.index,
      curNav: e.currentTarget.dataset.id
    })
  },
  detail:function(e){
     getApp().detail(e);
  },
  onLoad:function(options){
    var that=this;
    this.loaddishes();
  },
  loaddishes:function(){
    var page=this;
    wx.request({
      url: 'http://192.168.17.247/admin/Orderdish/food_list',
      method: 'GET',
      data: {
        shop_id: 2,
      },
      success: function (res) {
        // console.log(res)
        page.setData({
          foods: res.data,
        })
      }
    })    
  },
  onReady: function () {

  },
  onShow:function(){
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if(this.data.menu_id){
      this.numadd('', currPage.data.menu_id, currPage.data.index)
    }
  },
  toCart:function(){
    wx.navigateTo({
      url: '../menu/menualready',
    })
  }
})