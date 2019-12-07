var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '',
    index: '',
    indices01: '',
    indices02: '',
    indices: '',
    ishighblood:false
  },

  indicesSubmit: function (e) {
    var that = this
    var index = this.data.index
    var indices02=this.data.indices02
    var indices01=this.data.indices01
    var indices=this.data.indices  
      indices02=e.detail.value 
      console.log(indices01)
      console.log(indices02)
      for (var item in indices02) {
        indices01[item] = indices02[item];
      }
      console.log(indices01)
      app.globalData.indices = indices01
      //提交信息

      var info = getApp().globalData;
      console.log(info)
      //提交用户基本信息
      wx.request({
        url: 'https://www.shisousuo.com/Nancy/login/newUserLogin',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: info,
        success: function (res) {
          console.log(res.data)
          console.log(res.data.user_id)
          app.globalData.userId = res.data.user_id
          wx.showModal({
            title: '提示',
            content: '太棒了，Nancy已经了解您的基本情况啦！接下来，Nancy还想和您聊聊平时的饮食习惯和生活方式，这样才能给您提供最适合的营养建议哦！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.redirectTo({
                  url: '/pages/chart/chart',
                })
              }
            }
          })
        }
      })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var ishighblood=this.data.ishighblood
    var select = JSON.parse(options.select);
    console.log(select)
    if (select[1].disease == "高血压") {
      ishighblood = true
    }
    that.setData({
      status: select,
      index: 1,
      ishighblood:ishighblood
    })
    wx.getStorage({//获取缓存
      key: 'indices01',
      success: function (res) {
        that.setData({
          indices01: res.data
        })
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})