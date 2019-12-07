// pages/infoInput/infoInput.js


Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    Color:'#2fcc85',
    date: '2000-01-01',
    region: ['广东省', '广州市', '海珠区'],
    array: ['政府、企事业单位等工作人员（包含退休）','专业技术工作者（医生、教师、工程师等）','工人、农民','服务行业人员（厨师、保安等)','其他'],
    index:0,
    height:'',
    weight:'',
    submited:true,
    hidden: false,
    nocancel: true,
    imgsrc:'../../images/welcome.jpg',
    status: [
        {
          id: '0',
          name: '健康状况良好',
          father:'00',
          paramerters:[]
        },
        {
          id: '1',
          name: '高血脂',
          father:'00',
          parameters:[{
            id:11,
            name:'xx'
          },{
            id:12,
            name:'xxx'
          }]
        },
        {
          id: '2',
          name: '糖尿病',
          father:'0',
          parameters: [{
            id: 13,
            name: 'xx'
          }, {
            id: 14,
            name: 'xxx'
          }]
        },
        {
          id: '3',
          name: '高血压',
          father:'0',
          paramerters: []

        },
        {
          id: '4',
          name: '肥胖',
          father:'0',
          paramerters: []
        },
        {
          id: '5',
          name: '慢性痛风',
          father:'0',
          paramerters: []
        },
        {
          id: '6',
          name: '妊娠期糖尿病',
          father:'0',
          paramerters: []
        },
      ],
    selectstatus: [],
    
  },

  
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  bindJobChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  checkboxChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var that = this  
    var selectid=e.detail.value
    console.log(selectid)
    that.data.selectstatus=[]
    for (var i = 0;selectid[i];i++){
      that.data.selectstatus.push(that.data.status[selectid[i]])
    }
    console.log(that.data.selectstatus)  
    this.setData({
      selectstatus: that.data.selectstatus
    })
  },

  inputpara: function (e) {
    this.setData({
      para: e.detail.value
    })
  },

  inputHeight:function(e){
    this.setData({
      height:e.detail.value
    })
    if (this.data.height && this.data.weight) {
      this.setData({ submited: false });
  }},

  inputWeight: function (e) {
    this.setData({
      weight: e.detail.value
    })
    if (this.data.height && this.data.weight) {
      this.setData({ submited: false });
  }},

  

  Submit:function(e) {
    if (this.data.height && this.data.weight) {
      var that=this;
      var formData = e.detail.value;
      console.log(formData);
      wx.showModal({
        title: '提示',
        content: '基本信息填好啦，Nancy只需要再了解下您平时的生活小习惯就可以为您提供专业定制化的养生小建议啦！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../chart/chart'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      });
      
    }
     else{
      wx.showModal({
        title:'提示',
         content: '请填写完整信息！',
        icon: 'loading',
       })
     }
  },

  

  confirm: function () {
    this.setData({
      hidden:true
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
    wx.showModal({
     title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    */  

    
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