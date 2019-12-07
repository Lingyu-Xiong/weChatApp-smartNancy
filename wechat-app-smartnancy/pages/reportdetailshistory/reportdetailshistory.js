var wxCharts = require('../../utils/wxcharts.js');
import * as echarts from '../../utils/ec-canvas/echarts';
var app = getApp();
var oneRingChart = null;
var areaChart = null;
var totalscore = 0;

var isEmptyObject = function (e) {
  var temp;
  for (temp in e)
    return !1;
  return !0
}

function setOption(chart) {

  var option = {
    color: ["#37A2DA", "#32C5E9", "#67E0E3"],
    series: [{
      name: '业务指标',
      type: 'gauge',
      detail: {
        formatter: '{value}',
        height:2,
        fontSize: 24
      },
      axisLine: {
        show: true,
        fontSize: 8,
        lineStyle: {
          width: 15,
          shadowBlur: 0,
          color: [
            [0.6, '#fd666d'],
            [0.8, '#ffcd00'],
            [1, '#2fcc85']
          ]
        }
      },
      splitLine:{
        length: 12
      },
      data: [{
        value: totalscore
      }]
    }]
  };

  chart.setOption(option, true);

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundhidden: "none",
    canvashidden: "none",
    userpic: "../../images/me.png",
    username: "游客",
    healthscore: 0,
    diseasescore: 0,
    complyscore: 0,
    dietscore: 0,
    bodyscore: 0,
    literacyscore: 0,
    //totalscore: 60,
    windowheight: 0,
    windowWidth: 0,
    ec: {
      lazyLoad: true
    },
    backgroundimg: '',
    showModal: false,
    theme: "",
    userInfo: {}
  },

  //弹出框
  morecontent: function(e){
    var showModal = this.data.showModal;
    var theme = e.target.id;
    console.log(theme);
    this.setData({
      showModal: true,
      theme: theme
    })
  },

  onConfirm: function(){
    var showModal = this.data.showModal;
    this.setData({
      showModal: false
    })
  },

  //生成图片分享
  share: function(){
    wx.showLoading({
      title: '图片生成中~~',
    })
    const ecComponent = this.selectComponent('#mychart-dom-gauge');
    var gauge = "";
    ecComponent.canvasToTempFilePath({
      width: 250,
      height: 150,
      destWidth: 250,
      destHeight: 150,
      success: res => {
        console.log(res.tempFilePath);
        var that = this;
        const ctx = wx.createCanvasContext('shareImg');
        //设置背景色
        const backctx = wx.createCanvasContext('shareImgBackground');
        const grd = backctx.createLinearGradient(0, 0, this.data.windowWidth, this.data.windowheight+40)
        grd.addColorStop(0, '#e5f7fe')
        grd.addColorStop(1, '#f6fcff')
        backctx.setFillStyle(grd);
        backctx.fillRect(0, 0, this.data.windowWidth, this.data.windowheight+40);
        backctx.draw();
        //生成背景图片
        wx.canvasToTempFilePath({
          canvasId: 'shareImgBackground',
          success: function (resp) {
            //设置背景图片
            ctx.drawImage(resp.tempFilePath, 0, 0);
            //总评分文字
            ctx.setFontSize(15);
            ctx.fillText("综合评分", that.data.windowWidth / 2 - 25, 30);
            //轮盘
            ctx.drawImage(res.tempFilePath,that.data.windowWidth / 2 - 120, 20);
            //营养师
            ctx.drawImage('../../images/dietdoctor.png', that.data.windowWidth - 110, 170, 25, 25);
            ctx.fillText("在线营养师", that.data.windowWidth - 85, 188)
            //左边框
            ctx.rect(0, 210, that.data.windowWidth / 2 - 5, 70)
            ctx.setFillStyle('#fff')
            ctx.fillRect(0, 210, that.data.windowWidth / 2 - 5, 70)
            ctx.drawImage('../../images/healthscore.png', 10, 230, 30, 30)
            ctx.setFillStyle('#000')
            ctx.setFontSize(13);
            ctx.fillText("身体指标健康度", 50, 240);
            //左进度条
            ctx.rect(50, 250, that.data.windowWidth / 2 - 70, 10)
            ctx.setFillStyle('#f8f8f8')
            ctx.fillRect(50, 250, that.data.windowWidth / 2 - 70, 10)
            ctx.rect(50, 250, (that.data.windowWidth / 2 - 70) * (that.data.healthscore / 100), 10)
            if (that.data.healthscore == 0){
              ctx.setFillStyle('#fff')
            }else if (that.data.healthscore<60){
              ctx.setFillStyle('#fd666d')
            } else if (that.data.healthscore<80){
              ctx.setFillStyle('#ffcd00')
            }else{
              ctx.setFillStyle('#2fcc85')
            }  
            ctx.fillRect(50, 250, (that.data.windowWidth / 2 - 70) * (that.data.healthscore / 100), 10)
            ctx.setFontSize(18);
            ctx.fillText(that.data.healthscore + "", that.data.windowWidth / 2 - 35, 240);
            ctx.setFillStyle('#999');
            ctx.setFontSize(14);
            ctx.fillText('100', that.data.windowWidth / 2 - 35,275);
            // ctx.drawImage('../../images/morecontent.png', (that.data.windowWidth / 2 - 5)/2, 370, 20, 20)
            //右边框
            ctx.rect(that.data.windowWidth / 2 + 5, 210, that.data.windowWidth / 2 - 5, 70)
            ctx.setFillStyle('#fff')
            ctx.fillRect(that.data.windowWidth / 2 + 5, 210, that.data.windowWidth / 2 - 5, 70)
            ctx.drawImage('../../images/diseasescore.png', that.data.windowWidth / 2 + 15, 230, 30, 30)
            ctx.setFillStyle('#000')
            ctx.setFontSize(13);
            ctx.fillText("慢病风险度", that.data.windowWidth / 2 + 55, 240);
            //右进度条
            ctx.rect(that.data.windowWidth / 2 + 55, 250, that.data.windowWidth / 2 - 70, 10)
            ctx.setFillStyle('#f8f8f8')
            ctx.fillRect(that.data.windowWidth / 2 + 55, 250, that.data.windowWidth / 2 - 70, 10)
            ctx.rect(that.data.windowWidth / 2 + 55, 250, (that.data.windowWidth / 2 - 70) * (that.data.diseasescore / 100), 10)
            if (that.data.diseasescore == 0) {
              ctx.setFillStyle('#fff')
            } else if (that.data.diseasescore < 60) {
              ctx.setFillStyle('#2fcc85')
            } else if (that.data.diseasescore < 80) {
              ctx.setFillStyle('#ffcd00')
            } else {
              ctx.setFillStyle('#fd666d')
            } 
            ctx.fillRect(that.data.windowWidth / 2 + 55, 250, (that.data.windowWidth / 2 - 70) * (that.data.diseasescore / 100), 10)
            ctx.setFontSize(18);
            ctx.fillText(that.data.diseasescore + "", that.data.windowWidth - 30, 240);
            ctx.setFillStyle('#999');
            ctx.setFontSize(14);
            ctx.fillText('100', that.data.windowWidth - 30, 275);
            // ctx.drawImage('../../images/morecontent.png', that.data.windowWidth-(that.data.windowWidth / 2 - 5) / 2, 370, 20, 20);
            //左边框
            ctx.rect(0, 300, that.data.windowWidth / 2 - 5, 70)
            ctx.setFillStyle('#fff')
            ctx.fillRect(0, 300, that.data.windowWidth / 2 - 5, 70)
            ctx.drawImage('../../images/dietscore.png', 10, 320, 30, 30)
            ctx.setFillStyle('#000')
            ctx.setFontSize(13);
            ctx.fillText("饮食健康度", 50, 330);
            //左进度条
            ctx.rect(50, 340, that.data.windowWidth / 2 - 70, 10)
            ctx.setFillStyle('#f8f8f8')
            ctx.fillRect(50, 340, that.data.windowWidth / 2 - 70, 10)
            ctx.rect(50, 340, (that.data.windowWidth / 2 - 70) * (that.data.dietscore / 100), 10)
            if (that.data.dietscore == 0) {
              ctx.setFillStyle('#fff')
            } else if (that.data.dietscore < 60) {
              ctx.setFillStyle('#fd666d')
            } else if (that.data.dietscore < 80) {
              ctx.setFillStyle('#ffcd00')
            } else {
              ctx.setFillStyle('#2fcc85')
            }
            ctx.fillRect(50, 340, (that.data.windowWidth / 2 - 70) * (that.data.dietscore / 100), 10)
            ctx.setFontSize(18);
            ctx.fillText(that.data.dietscore + "", that.data.windowWidth / 2 - 35, 330);
            ctx.setFillStyle('#999');
            ctx.setFontSize(14);
            ctx.fillText('100', that.data.windowWidth / 2 - 35, 365);
            // ctx.drawImage('../../images/morecontent.png', (that.data.windowWidth / 2 - 5) / 2, 490, 20, 20);
            //右边框
            ctx.rect(that.data.windowWidth / 2 + 5, 300, that.data.windowWidth / 2 - 5, 70)
            ctx.setFillStyle('#fff')
            ctx.fillRect(that.data.windowWidth / 2 + 5, 300, that.data.windowWidth / 2 - 5, 70)
            ctx.drawImage('../../images/bodyscore.png', that.data.windowWidth / 2 + 15, 320, 30, 30)
            ctx.setFillStyle('#000')
            ctx.setFontSize(13);
            ctx.fillText("身体活跃度", that.data.windowWidth / 2 + 55, 330);
            //右进度条
            ctx.rect(that.data.windowWidth / 2 + 55, 340, that.data.windowWidth / 2 - 70, 10)
            ctx.setFillStyle('#f8f8f8')
            ctx.fillRect(that.data.windowWidth / 2 + 55, 340, that.data.windowWidth / 2 - 70, 10)
            ctx.rect(that.data.windowWidth / 2 + 55, 340, (that.data.windowWidth / 2 - 70) * (that.data.bodyscore / 100), 10)
            if (that.data.bodyscore == 0) {
              ctx.setFillStyle('#fff')
            } else if (that.data.bodyscore < 60) {
              ctx.setFillStyle('#fd666d')
            } else if (that.data.bodyscore < 80) {
              ctx.setFillStyle('#ffcd00')
            } else {
              ctx.setFillStyle('#2fcc85')
            }
            ctx.fillRect(that.data.windowWidth / 2 + 55, 340, (that.data.windowWidth / 2 - 70) * (that.data.bodyscore / 100), 10)
            ctx.setFontSize(18);
            ctx.fillText(that.data.bodyscore + "", that.data.windowWidth - 30, 330);
            ctx.setFillStyle('#999');
            ctx.setFontSize(14);
            ctx.fillText('100', that.data.windowWidth - 30, 365);
            // ctx.drawImage('../../images/morecontent.png', that.data.windowWidth - (that.data.windowWidth / 2 - 5) / 2, 490, 20, 20);
            //左边框
            ctx.rect(0, 390, that.data.windowWidth / 2 - 5, 70)
            ctx.setFillStyle('#fff')
            ctx.fillRect(0, 390, that.data.windowWidth / 2 - 5, 70)
            ctx.drawImage('../../images/doctorscore.png', 10, 410, 30, 30)
            ctx.setFillStyle('#000')
            ctx.setFontSize(13);
            ctx.fillText("骨骼健康度", 50, 420);
            //左进度条
            ctx.rect(50, 430, that.data.windowWidth / 2 - 70, 10)
            ctx.setFillStyle('#f8f8f8')
            ctx.fillRect(50, 430, that.data.windowWidth / 2 - 70, 10)
            ctx.rect(50, 430, (that.data.windowWidth / 2 - 70) * (that.data.complyscore / 100), 10)
            if (that.data.complyscore == 0) {
              ctx.setFillStyle('#fff')
            } else if (that.data.complyscore < 60) {
              ctx.setFillStyle('#fd666d')
            } else if (that.data.complyscore < 80) {
              ctx.setFillStyle('#ffcd00')
            } else {
              ctx.setFillStyle('#2fcc85')
            }
            ctx.fillRect(50, 430, (that.data.windowWidth / 2 - 70) * (that.data.complyscore / 100), 10)
            ctx.setFontSize(18);
            ctx.fillText(that.data.complyscore + "", that.data.windowWidth / 2 - 35, 420);
            ctx.setFillStyle('#999');
            ctx.setFontSize(14);
            ctx.fillText('100', that.data.windowWidth / 2 - 35, 455);
            // ctx.drawImage('../../images/morecontent.png', (that.data.windowWidth / 2 - 5) / 2, 610, 20, 20);
            //右边框
            ctx.rect(that.data.windowWidth / 2 + 5, 390, that.data.windowWidth / 2 - 5, 70)
            ctx.setFillStyle('#fff')
            ctx.fillRect(that.data.windowWidth / 2 + 5, 390, that.data.windowWidth / 2 - 5, 70)
            ctx.drawImage('../../images/dietdoctorscore.png', that.data.windowWidth / 2 + 15, 410, 30, 30)
            ctx.setFillStyle('#000')
            ctx.setFontSize(13);
            ctx.fillText("健康素养度", that.data.windowWidth / 2 + 55, 420);
            //右进度条
            ctx.rect(that.data.windowWidth / 2 + 55, 430, that.data.windowWidth / 2 - 70, 10)
            ctx.setFillStyle('#f8f8f8')
            ctx.fillRect(that.data.windowWidth / 2 + 55, 430, that.data.windowWidth / 2 - 70, 10)
            ctx.rect(that.data.windowWidth / 2 + 55, 430, (that.data.windowWidth / 2 - 70) * (that.data.literacyscore / 100), 10)
            if (that.data.literacyscore == 0) {
              ctx.setFillStyle('#fff')
            } else if (that.data.literacyscore < 60) {
              ctx.setFillStyle('#fd666d')
            } else if (that.data.literacyscore < 80) {
              ctx.setFillStyle('#ffcd00')
            } else {
              ctx.setFillStyle('#2fcc85')
            }
            ctx.fillRect(that.data.windowWidth / 2 + 55, 430, (that.data.windowWidth / 2 - 70) * (that.data.literacyscore / 100), 10)
            ctx.setFontSize(18);
            ctx.fillText(that.data.literacyscore + "", that.data.windowWidth - 30, 420);
            ctx.setFillStyle('#999');
            ctx.setFontSize(14);
            ctx.fillText('100', that.data.windowWidth - 30, 455);
            // ctx.drawImage('../../images/morecontent.png', that.data.windowWidth - (that.data.windowWidth / 2 - 5) / 2, 610, 20, 20);


            ctx.draw()
            setTimeout(function () {
              wx.canvasToTempFilePath({
                canvasId: 'shareImg',
                destWidth: that.data.windowWidth + 20,
                destHeight: that.data.windowheight,
                quality: 1,
                success: function (res) {
                  var tempFilePath = res.tempFilePath;
                  console.log("111"+tempFilePath);
                  //保存到相册
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: (res) => {
                      console.log(res);
                      wx.hideLoading();
                      wx.showModal({
                        title: '提示',
                        showCancel: false,
                        content: '图片已保存到您的相册中，可以分享到朋友圈啦~',
                      })
                    },
                    fail: (err) => {
                      console.log(err)
                    }
                  })
                },
                fail: function (res) {
                  console.log(res);
                }
              });
            }, 500);
          }
        })
        
      },
      fail: res => console.log(res)
    });

    // wx.canvasToTempFilePath({
    //   canvasId: 'shareImg',
    //   success: function (resp) {
    //     console.log(resp.tempFilePath)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var qr_id = options.qrid;
    var user_id = options.userid;
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-gauge');
    var that = this;
    wx.request({
      url: 'https://www.shisousuo.com/Nancy/saveIformation/getScoreByQrIdUserId',
      type: 'post',
      data: {
        user_id: user_id,
        qr_id: qr_id
      },
      success: function(res){
        console.log(res.data);
        var data = res.data;
        totalscore = res.data.totalScore;
        that.ecComponent.init((canvas, width, height) => {
          // 获取组件的 canvas、width、height 后的回调函数
          // 在这里初始化图表
          const chart = echarts.init(canvas, null, {
            width: 250,
            height: 200
          });
          setOption(chart);

          // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
          that.chart = chart;

          wx.canvasToTempFilePath({
            canvasId: 'mychart-gauge',
            success: function (res) {
              console.log(res.tempFilePath);

            }
          })

          // 注意这里一定要返回 chart 实例，否则会影响事件处理等
          return chart;
        });
        that.setData({
          healthscore: data.healthScore,
          diseasescore: data.diseaseScore,
          complyscore: data.complyScore,
          dietscore: data.dietScore,
          bodyscore: data.bodyScore,
          literacyscore: data.literacyScore
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var windowWidth = 320;
    var that = this;
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-gauge');
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
      that.setData({
        windowWidth: windowWidth,
        windowheight: res.windowHeight
      })
      console.log(windowWidth);
    
  },

  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
      categories.push('2016-' + (i + 1));
      data.push(Math.random() * (20 - 10) + 10);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },

  checkSettingStatu: function (cb) {
    var that = this;
    // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
    wx.getSetting({
      success: function success(res) {
        var authSetting = res.authSetting;
        if (isEmptyObject(authSetting)) {
          //第一次
          console.log("第一次")
        } else {
          // 没有授权的提醒
          console.log("授权")
          if (authSetting['scope.userInfo'] === false) {
            wx.showModal({
              title: '用户未授权',
              content: '如需正常使用该小程序功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: function success(res) {
                      console.log()
                    }
                  });
                }
              }
            })
          } else if (authSetting['scope.userInfo'] === true) {
            console.log("true");
            //该处用户获取用户的一些授权信息
            if (that.data.userInfo) {
              var nickname = that.data.userInfo.nickName;
              var gender = that.data.userInfo.gender
              //性别 0：未知、1：男、2：女
              if (gender == 1) {
                gender = "True"
              } else if (gender == 2) {
                gender = "False"
              } else {
                gender = "True"
              }

            }
          } else {
            console.log("没有信息")
          }
        }
      },
      fail: function(){
        console.log("又fail")
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var that = this;
    // setTimeout(function () {

    //   wx.hideToast()

    //   that.checkSettingStatu();

    // }, 1000) 
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'SmartNancy',
      path: '/page/welcome/welcome',
      success: function (res) {
        // 转发成功
        console.log("转发成功");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败");
      }
    }  
  }
})