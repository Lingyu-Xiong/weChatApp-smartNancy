//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPic: '',
    nackName: ''
  },

  myreport: function(){
    wx.navigateTo({
      url: '../myreport/myreport',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.nickName) {
      this.setData({
        userPic: app.globalData.avatarUrl,
        nickName: app.globalData.nickName
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log(123)
      app.userInfoReadyCallback = res => {
        this.setData({
          userPic: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      }
    } else {
      console.log(222)
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log("sss");
          console.log(res.userInfo)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userPic: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName
          })
        },
        error: function(){
          console.log("error");
        }
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