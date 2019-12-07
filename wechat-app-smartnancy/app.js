//app.js
var app = getApp();

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          console.log(res.code);
          var code = res.code;
          
          wx.request({
            url:  'http://139.198.124.242:17080/login/getUserStatus',
            data: {
              code: code
            },
            success: function(resp){
              var data = resp.data;
              console.log(data)
                  that.globalData.openid = data.openid;      
                  that.globalData.userId=data.userId
              wx.setStorageSync('isUser',data.isUser)  
              //wx.setStorageSync('userId', data.userId)
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log('已授权')
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          console.log('未授权')
        }
      }
    })
    
    console.log(this.globalData.nickName);
  },
  globalData: {
    nickName:'',
    avatarUrl:'',
    openid: "",
    userId:''
  }
})