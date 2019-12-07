var app = getApp();
const weights = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobs: [],
    index: [0],  //记录选择索引 
    condition: false,
  },

  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },

  bindChange: function (e) {
    this.setData({
        index: e.detail.value,
    })
    console.log(e.detail.value)
  },

  heightnext: function(){
    var index = this.data.index;
    console.log(parseInt(index[0])+1);
    app.globalData.userJob = parseInt(index[0])+1;
    wx.redirectTo({
      url: '../inputheight/inputheight',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'https://www.shisousuo.com/Nancy/login/getProfession',
      success:function(res){
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          weights.push(res.data[i].profession)
        }

        that.setData({
          jobs: weights
        })
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