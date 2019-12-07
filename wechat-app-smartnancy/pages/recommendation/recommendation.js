
var app = getApp()
Page({ 
  data:{
    Color:'#2fcc85',
    items: [],
    selectreco:'',
    qr_id:'',
    loadmore:'',
    num:'',
  },
  
  checkboxChange :function(e){
    console.log('用户选择：', e.detail.value)
    this.setData({
      selectreco:e.detail.value
    })
  },

  //采纳建议后跳转到打卡界面
  getRecommendation: function () {
    getApp().globalData.istowelcome = false;    //设置全局变量判断是否跳转到欢迎页面
    var selectreco=this.data.selectreco
    var qr_id=this.data.qr_id
    console.log(selectreco)
    console.log(qr_id)
    wx.request({
      url: 'https://www.shisousuo.com/Nancy/recommendation/chooseRec',
      data: {
        userRecommendation:selectreco,
        qr_id:qr_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)  
        wx.redirectTo({
      url: '../reportdetails/reportdetails',
    })
      }
    })
  },

getHisreco:function(){
  wx.navigateTo({
    url: '../timeline/timeline',
  })
},

tosearchserver:function(){
wx.navigateTo({
  url: '../searchserver/searchserver',
})
},
loadmore:function(){
  var that=this
  var loadmore=this.data.loadmore
  that.setData({
    loadmore:true
  })
},
  onLoad:function(){
    wx.showLoading({
      title: 'Nancy正在分析中...',
      icon: 'loading'
    })
    var that=this
    var items=that.data.items
    var qr_id=that.data.qr_id
    console.log(app.globalData.userId)
    wx.request({
      url: 'https://www.shisousuo.com/Nancy/recommendation/recommendationByUser_id',
      //data: { user_id: 344},
      data: { user_id: app.globalData.userId},    
      success: function (res) {
        wx.hideLoading();
        console.log(res.data)
        console.log("length is: " + res.data.recommendation.length)
        if(res.data){
        that.setData({
          items:res.data.recommendation,
          num: res.data.recommendation.length,
          qr_id:res.data.qr_id,
          loadmore:false
        })
        }
      }
    })
    
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

})