//获取应用实例
var app = getApp();

Page({
  data:{
    gender:''
  },
birthMale:function(e){
  console.log('男');   //男为0
  app.globalData.userGender = '0';
  wx.redirectTo({
    url: '../inputbirth/inputbirth',
  })
},
birthFemale: function (e) {
  console.log('女');   //女为1
  app.globalData.userGender = '1';
  wx.redirectTo({
    url: '../inputbirth/inputbirth',
  })
}
});