var wxCharts = require('../../utils/wxcharts.js');
var areaChart = null;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    healthscore: 0,
    diseasescore: 0,
    complyscore: 0,
    dietscore: 0,
    bodyscore: 0,
    literacyscore: 0,
    //totalscore: 60,
    dates: [],
    totalscores: [],
    canvashidden: false
  },

  touchHandler: function (e) {
      console.log(areaChart.getCurrentDataIndex(e));
      areaChart.showToolTip(e);
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var res = wx.getSystemInfoSync();
    var windowWidth = res.windowWidth;
    that.setData({
      windowWidth: windowWidth
    })
    console.log(windowWidth);
    wx.request({
      url: 'https://www.shisousuo.com/Nancy/saveIformation/getAllScore',
      data: {
        user_id: app.globalData.userId,
      },
      success: function(resp){
        var data = resp.data;
        console.log(data);
        var dates = new Array();
        var totalscores = new Array();
        for(var i=0; i<data.length; i++){
          dates.push(data[i].reportTime);
          totalscores.push(data[i].totalScore);
        }
        that.setData({
          dates: dates,
          totalscores: totalscores
        })
        areaChart = new wxCharts({
          canvasId: 'areaCanvas',
          type: 'area',
          categories: that.data.dates,
          animation: true,
          series: [{
            name: '综合评分',
            data: that.data.totalscores,
            format: function (val) {
              return val;
            }
          }],
          yAxis: {
            title: '综合评分',
            format: function (val) {
              return val.toFixed(2);
            },
            min: 0,
            fontColor: '#8085e9',
            gridColor: '#8085e9',
            titleFontColor: '#f7a35c'
          },
          xAxis: {
            fontColor: '#7cb5ec',
            gridColor: '#7cb5ec'
          },
          extra: {
            legendTextColor: '#cb2431'
          },
          width: that.data.windowWidth + 12,
          height: 200
        });
      },
      fail: function(){
        console.log("error2222222222");
      }
    })
    // areaChart = new wxCharts({
    //   canvasId: 'areaCanvas',
    //   type: 'area',
    //   categories: this.data.dates,
    //   animation: true,
    //   series: [{
    //     name: '综合评分',
    //     data: this.data.totalscores,
    //     format: function (val) {
    //       return val;
    //     }
    //   }],
    //   yAxis: {
    //     title: '综合评分',
    //     format: function (val) {
    //       return val.toFixed(2);
    //     },
    //     min: 0,
    //     fontColor: '#8085e9',
    //     gridColor: '#8085e9',
    //     titleFontColor: '#f7a35c'
    //   },
    //   xAxis: {
    //     fontColor: '#7cb5ec',
    //     gridColor: '#7cb5ec'
    //   },
    //   extra: {
    //     legendTextColor: '#cb2431'
    //   },
    //   width: that.data.windowWidth + 12,
    //   height: 200
    // });
  },
// 获取某一天具体的评分
  // wx.request({
  //   url: 'http://139.198.124.242:17080/saveIformation/getScore',
  //   data: {
  //     user_id: app.globalData.userId,
  //   },
  //   success: function (res) {
  //     console.log(res.data);
  //     var data = res.data;
  //     that.setData({
  //       healthscore: data.healthScore,
  //       diseasescore: data.diseaseScore,
  //       complyscore: data.complyScore,
  //       dietscore: data.dietScore,
  //       bodyscore: data.bodyScore,
  //       literacyscore: data.literacyScore
  //     })
  //   }
  // })
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