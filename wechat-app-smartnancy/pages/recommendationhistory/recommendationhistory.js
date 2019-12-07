
var app = getApp()
Page({ 
  data:{
    Color:'#2fcc85',
    items: [],
    selectreco:'',
    qr_id:''
  },
  
  checkboxChange :function(e){
    console.log('用户选择：', e.detail.value)
    this.setData({
      selectreco:e.detail.value
    })
  },

  onLoad:function(options){
    var that=this
    var qr_id=options.qrid;
    var user_id = options.userid;
    wx.request({
      url: 'https://www.shisousuo.com/Nancy/recommendation/recoByQrIdAndUserId',
      data: { 
        // user_id: app.globalData.userId
        user_id: user_id,
        qr_id: qr_id
      },    
      success: function (res) {
        console.log(res.data);
        var data = res.data[0].reco;
        var item = new Array();
        for(var i=0; i<data.length; i++){
          item.push(data[i].task);
        }
        that.setData({
          items: item
        })
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