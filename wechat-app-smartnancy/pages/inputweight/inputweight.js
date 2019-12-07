var app = getApp()
const weights = []
for (let i = 30; i <= 150; i++) {
  weights.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifusepound: false,
    weights: weights,
    condition:false,
    index:35
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


  questionsnext: function(){
    /*
    if(this.data.weight == ""){
      wx.showModal({
        title: '提示',
        content: '请填写体重数据！',
      })
    }else{
      var ifusepound = this.data.ifusepound;
      if(ifusepound){
        app.globalData.userWeight = this.data.weight ;
        app.globalData.weight_unit="pound"
      }else{
        app.globalData.userWeight = this.data.weight ;
        app.globalData.weight_unit = "kg"
      }*/
    var index = this.data.index;
    app.globalData.userWeight = this.data.weights[index];
    app.globalData.weight_unit = "kg";
    console.log(this.data.weights[index])
      wx.redirectTo({
        url: '../disease/disease',
      })
    
  },

  getWeight: function(e){
    this.setData({
      weight: e.detail.value
    })
  },

  ifUsePound: function(e){
    console.log(e.detail.value);
    this.setData({
      ifusepound : e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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