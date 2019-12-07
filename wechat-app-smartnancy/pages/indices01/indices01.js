var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:'',
    index:'',
    indices01:'',
    indices02:'',
    indices:'',
    ishighblood:false,
    firstfocus: true,
    secondfocus: false
  },

  //获取第一个输入框值
  firstcontent: function(e){
    var content = e.detail.value;
    var that = this;
    console.log(content.length);
    if(content.length == 3){
      that.setData({
        firstfocus: false,
        secondfocus: true
      })
    }
  },

//确定，提交
indicesSubmit:function(e){
  var that=this
  var index=this.data.index
  var status=this.data.status
  if (index==1||status.length==1){//选了两个疾病，只有第二个有指标;或选了一个疾病有指标
    var indices = this.data.indices
    that.setData({
      indices: e.detail.value
    })
    app.globalData.indices = this.data.indices
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

  }else if(status[1].indices==''){//选了两个疾病，第二个没有指标
    var indices = this.data.indices
    that.setData({
      indices: e.detail.value
    })
    app.globalData.indices = this.data.indices
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

  }else{//选了两个疾病，都有指标，进入第二个指标页面
    var indices01 = this.data.indices01
    that.setData({
      indices01: e.detail.value
    })
    wx.setStorageSync('indices01', this.data.indices01)//将第一个指标值写入缓存
    var select = JSON.stringify(status)
    wx.redirectTo({
      url: '/pages/indices02/indices02?select='+select,
    })
  }

},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var select = JSON.parse(options.select);
    var ishighblood=this.data.ishighblood
    console.log(select)
    this.setData({
      status:select
    })
      if(select[0].indices!=''){
        if(select[0].disease=="高血压"){
          ishighblood=true
        }
        this.setData({
          index:0,
          ishighblood:ishighblood
        })
      }else{
        if (select[1].disease == "高血压") {
          ishighblood = true
        }
        this.setData({
          index: 1,
          ishighblood: ishighblood
        })
      }
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