Component({
  relations: {
  },
  properties: {
    show: Boolean,
    type: String,
    click_again: Boolean,
  },

  data: {

  },

  methods: {
    confirm: function () {
      this.cover()
    },
    // 阻止冒泡
    stop() { },
    cover() {
      this.setData({
        show: false
      })
    },
    getUserInfo(e) {
      this.triggerEvent('_getUserInfo', e)
    },
  },
  ready() {

  }
})
