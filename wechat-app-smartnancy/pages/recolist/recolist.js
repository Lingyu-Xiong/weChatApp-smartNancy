var app = getApp()
Page({
  data: {
    lists: [
      {
        qr_id: '1',
        time: '2018-06-12',
        open: false,
        reco: [{ recommendationDetails: "一顿饭包含" }, { recommendationDetails: "一顿饭包含" }, { recommendationDetails: "一顿饭包含"}]
      },
      {
        qr_id: '2',
        time: '2018-06-13',
        open: false,
        reco: [{ recommendationDetails: "一顿饭" }, { recommendationDetails: "一顿饭包含" }, { recommendationDetails: "一顿饭包含" }]
      }],
      list:[],

  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].qrId == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },

  onLoad: function () {
    var that=this
    wx.request({
      url: 'https://www.shisousuo.com/Nancy/recommendation/HistoryReco',
      data: { user_id: app.globalData.userId },
      success: function (res) {
        var listData = res.data
        for (var i = 0; i < res.data.length; i++) {
          listData[i]['open'] = false; //添加open属性 
        }
        that.setData({
          list: listData
        })
        console.log(listData)
      }
    })

    const ctx = wx.createCanvasContext('myCanvas')
    ctx.beginPath()
    ctx.moveTo(50, 0)
    ctx.lineTo(50, 30)
    ctx.setStrokeStyle('#000')  
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(50, 40, 10, 0, 2 * Math.PI)
    ctx.setFillStyle('#2fcc85')
    ctx.fill()
   
    ctx.beginPath()
    ctx.moveTo(50, 50)
    ctx.lineTo(50, 80)
    ctx.setStrokeStyle('#000')
    ctx.stroke()

    ctx.draw()
  }

})
