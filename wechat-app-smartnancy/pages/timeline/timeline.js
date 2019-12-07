var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    allYears: [],
    allDates: [
      {
        year: "2018",
        day: "05-10"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      icon: 'loading'
    })
    var that = this;
    var res = wx.getSystemInfoSync();
    var windowHeight = res.windowHeight;
    that.setData({
      windowHeight: windowHeight
    })
    wx.request({
      url: 'https://www.shisousuo.com/Nancy/saveIformation/getAllScore',
      data: {
        user_id: app.globalData.userId,
        //user_id: 354
      },
      success: function (resp) {
        wx.hideLoading();
        var data = resp.data;
        console.log(data);
        var allYears = new Array();
        var allDates = new Array();
        for(var i=0; i<data.length; i++){
          var year = data[i].reportTime.split(" ")[0].split("-")[0];
          var date = data[i].reportTime.split(" ")[0].split("-")[1] + "-" + data[i].reportTime.split(" ")[0].split("-")[2];
          var oneDate = {
            year: year,
            day: date,
            time: data[i].reportTime.split(" ")[1],
            qrId: data[i].qrId,
            userid: data[i].userId
          };
          allDates.push(oneDate);
          if(i == 0){
            allYears.push(year);
          }else{
            if(year != allYears[allYears.length-1]){
              allYears.push(year);
            }
          }
        }
        that.setData({
          allYears: allYears,
          allDates: allDates
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