var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageWidth: 0,
    tabs: ['完成进度','任务排名'],  //记录tab标签 
    activeIndex: 0,   //记录第几个tab标签被选中
    sliderWidth:0,
    sliderOffset: 0,
    sliderLeft: 0,
    stepwidth: 0
  },

  //标签切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const ctx = wx.createCanvasContext('myCanvas');
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var width = res.screenWidth;
        that.setData({
          pageWidth: width,
          sliderWidth: (res.windowWidth-30) / that.data.tabs.length,
          sliderLeft: (res.windowWidth - 30) / that.data.tabs.length * that.data.activeIndex,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          stepwidth: (res.windowWidth-50)/3-5
        })
      },
    })
    //ctx.drawImage('../../images/background.jpg', 0, 0,this.data.pageWidth,250);
    var endX = this.data.pageWidth-20;  //记录结束点的横坐标
    var space = (this.data.pageWidth-40)/6;   //记录每个点横坐标的间隔，暂时先相同
    // Draw quadratic curve
    ctx.beginPath();
    ctx.moveTo(20, 100);  //起点
    ctx.setFontSize(10);
    ctx.setFillStyle("#2fcc85");
    ctx.quadraticCurveTo(20 + space / 2, 160, 20 + space, 160)
    ctx.fillText('Day 01', 5 + space, 180)
    ctx.quadraticCurveTo(20 + 1.5*space, 160, 20 + 2 * space, 80)
    ctx.fillText('Day 02', 5 + 2 * space, 100)
    ctx.quadraticCurveTo(20 + 2.5 * space, 50, 20 + 3 * space, 50)
    ctx.fillText('Day 03', 5 + 3 * space, 70)
    ctx.quadraticCurveTo(20 + 3.5 * space, 50, 20 + 4 * space, 120)
    ctx.fillText('Day 04', 5 + 4 * space, 140)
    ctx.quadraticCurveTo(20 + 4.5 * space, 150, 20 + 5 * space, 150)
    ctx.fillText('Day 05', 5 + 5 * space, 170)
    ctx.quadraticCurveTo(20 + 5.5 * space, 150, 20 + 6 * space, 60)
    //ctx.quadraticCurveTo(20, 100, 150, 100)
    ctx.drawImage('../../images/start.png', 5, 75 ,30, 30);
    ctx.drawImage('../../images/point.png', 15 + space, 155, 10, 10);
    ctx.drawImage('../../images/point.png', 15 + 2 * space, 75, 10, 10);
    ctx.drawImage('../../images/point.png', 15 + 3 * space, 45, 10, 10);
    ctx.drawImage('../../images/point.png', 15 + 4 * space, 115, 10, 10);
    ctx.drawImage('../../images/point.png', 15 + 5 * space, 145, 10, 10);
    ctx.drawImage('../../images/end.png', 10 + 6 * space, 45, 20, 20);  
    ctx.setStrokeStyle('#2fcc85');
    ctx.stroke()

    ctx.draw()
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