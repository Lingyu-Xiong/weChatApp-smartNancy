//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '',
    wel: 'welcome',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgsrc: '../../images/wel-2.png',
    isUser:'',
    userId:'',
    hisrecohide:''
  },
  //事件处理函数
 bindGetUserInfo: function (e) {
   console.log(e.detail.userInfo)
   app.globalData.nickName = e.detail.userInfo.nickName
   app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
    wx.redirectTo({
      url: '../gender/gender'
    })
  },
  getHisreco:function(){
    wx.navigateTo({
      url: '../timeline/timeline',
    })
  },

  onLoad: function () {
    var isUser=wx.getStorageSync('isUser')
    //var userId = app.globalData.userId
    console.log(isUser, app.globalData.userId)
    if(isUser==3){
this.setData({
  hisrecohide:false
})
    }else{
      this.setData({
        hisrecohide: true
      })
    }
   
    },
  onReady: function () {

  },


})
