//myreport.js
//获取应用实例
const app = getApp()

Page({
  data: {
    reportwidth: 0, //记录边框宽度
    disease: ['请选择疾病类型', '高血压', '高血脂', '高血糖'], //记录所有疾病类型,
    index: 0, //记录选择器选择项的索引
    pageWidth: 0,  
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../pages/welcome'
    })
  },

  //打卡页面
  clock: function () {
    wx.navigateTo({
      url: '../clock/clock',
    })
  },

  //查看报告详情
  reportDetails: function () {
    wx.navigateTo({
      url: '../reportdetails/reportdetails',
    })
  },

  //选择疾病类型
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          reportwidth: res.screenWidth - 50
        })
      },
    })


    // const ctx = wx.createCanvasContext('myCanvas');
    // var that = this;
    // wx.getSystemInfo({
    //   success: function(res) {
    //     var width = res.screenWidth;
    //     that.setData({
    //       pageWidth: width
    //     })
    //   },
    // })
    //ctx.drawImage('../../images/background.jpg', 0, 0,this.data.pageWidth,250);
    // var endX = this.data.pageWidth-20;  //记录结束点的横坐标
    // var space = (this.data.pageWidth-40)/6;   //记录每个点横坐标的间隔，暂时先相同
    // // Draw quadratic curve
    // ctx.beginPath();
    // ctx.moveTo(20, 125);  //起点
    // ctx.setFontSize(10);
    // ctx.setFillStyle("#9cbe67");
    // ctx.quadraticCurveTo(20 + space / 2, 200, 20 + space, 200)
    // ctx.fillText('Day 01', 5 + space, 220)
    // ctx.quadraticCurveTo(20 + 1.5*space, 200, 20 + 2 * space, 120)
    // ctx.fillText('Day 02', 5 + 2 * space, 140)
    // ctx.quadraticCurveTo(20 + 2.5 * space, 80, 20 + 3 * space, 80)
    // ctx.fillText('Day 03', 5 + 3 * space, 100)
    // ctx.quadraticCurveTo(20 + 3.5 * space, 80, 20 + 4 * space, 100)
    // ctx.fillText('Day 04', 5 + 4 * space, 120)
    // ctx.quadraticCurveTo(20 + 4.5 * space, 150, 20 + 5 * space, 150)
    // ctx.fillText('Day 05', 5 + 5 * space, 170)
    // ctx.quadraticCurveTo(20 + 5.5 * space, 150, 20 + 6 * space, 50)
    // //ctx.quadraticCurveTo(20, 100, 150, 100)
    // ctx.drawImage('../../images/start.png', 5, 100 ,30, 30);
    // ctx.drawImage('../../images/point.png', 15 + space, 195, 10, 10);
    // ctx.drawImage('../../images/point.png', 15 + 2 * space, 115, 10, 10);
    // ctx.drawImage('../../images/point.png', 15 + 3 * space, 75, 10, 10);
    // ctx.drawImage('../../images/point.png', 15 + 4 * space, 95, 10, 10);
    // ctx.drawImage('../../images/point.png', 15 + 5 * space, 145, 10, 10);
    // ctx.drawImage('../../images/end.png', 10 + 6 * space, 35, 20, 20);
    // ctx.setStrokeStyle('#9cbe67')
    // ctx.stroke()

    // ctx.draw()
  },

})
