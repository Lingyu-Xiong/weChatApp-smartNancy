var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    status: [],
    selectid: [],
    selectstatus: [],
    statuslen: '',
    hidden: '',
    indices: '',
    btncolor: [],
    distobedev: ''
  },

  toggleBtn: function(e) {
    //下拉表单效果
    var that = this;
    var list = this.data.status
    var id = e.currentTarget.id
    var status = this.data.status
    var selectid = this.data.selectid
    var selectstatus = this.data.selectstatus

    if (selectid.length > 1 && selectid.indexOf(id) == -1) { //控制最多选择两个疾病
      wx.showModal({
        title: '提示',
        content: '最多可选择两种疾病！',
      })
    } else {
      for (var i = 0, len = list.length; i < len; i++) {
        //如果被点击，则变颜色
        if (list[i].diseaseId == id) {
          list[i].toggle = !list[i].toggle
          list[i].btncolor = !list[i].btncolor //改变按钮颜色
        }
      }

      //获取用户选择的疾病id和疾病list
      if (selectid.indexOf(id) == -1) {
        selectid.push(id)
        selectstatus.push(status[id - 1])
      } else {
        var repeatid = selectid.indexOf(id)
        selectid.splice(repeatid, 1)
        for (var i = 0; i < selectstatus.length; i++) {
          if (status[id - 1].diseaseId == selectstatus[i].diseaseId) {
            selectstatus.splice(i, 1)
          }
        }
      }
      if (selectid.indexOf("1") != -1) {
        for (var i = 0, len = list.length; i < len; i++) {
          if (list[i].diseaseId != 1) {
            list[i].distobedev = false;
          }
        }
      } else {
        for (var i = 0, len = list.length; i < len; i++) {

          if (list[i].diseaseId == 1) {
            list[i].distobedev = false;
          }
        }
      }
      if (selectid.length == 0) {
        for (var i = 0, len = 4; i < len; i++) {
          list[i].distobedev = true;
        }
      }
      that.setData({
        status: list,
        selectid: selectid,
        selectstatus: selectstatus
      })
    }
    app.globalData.disease = this.data.selectid
  },

  toIndices: function(e) {
    var that = this
    var selectid = this.data.selectid
    var selectstatus = this.data.selectstatus
    if (selectid == "") {
      wx.showModal({
        title: '提示',
        content: '请选择您的健康状况！',
      })
    } else if (selectstatus.length == 1 && selectstatus[0].indices == '') { //用户只选了一个疾病，且疾病没有指标
      //用户所有基本信息
      app.globalData.indices = this.data.indices
      var info = getApp().globalData;
      console.log(info)
      //提交用户基本信息
      wx.request({
        url: 'https://www.shisousuo.com/Nancy/login/newUserLogin',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: info,
        success: function(res) {
          console.log(res.data)
          console.log(res.data.user_id)
          app.globalData.userId = res.data.user_id
          wx.showModal({
            title: '提示',
            content: '太棒了，Nancy已经了解您的基本情况啦！接下来，Nancy还想和您聊聊平时的饮食习惯和生活方式，这样才能给您提供最适合的营养建议哦！',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.redirectTo({
                  url: '/pages/chart/chart',
                })
              }
            }
          })
        }
      })


    } else if (selectid.length == 2 && selectid.indexOf("1") != -1) {
      wx.showModal({
        title: '提示',
        content: '选择其他疾病时，不能选择健康状况良好！',
      })
    } else {

      console.log("selectstatus is :" + selectstatus)
      console.log("selectid is :" + selectid)

      var select = JSON.stringify(selectstatus)
      //进入填写指标页面
      wx.redirectTo({
        url: '/pages/indices01/indices01?select=' + select
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '数据加载中',
      icon: 'loading'
    })
    var that = this
    var status = this.data.status
    var statuslen = this.data.statuslen
    wx.request({
      url: 'https://www.shisousuo.com/Nancy/getDisease/disease_indices_id',
      success: function(res) {
        var listData = res.data
        for (var i = 0; i < res.data.length; i++) {
          listData[i]['toggle'] = false; //添加toggle 属性 
        }
        for (var i = 0; i < res.data.length; i++) {
          listData[i]['btncolor'] = false; //添加btncolor属性 
          if (i < 4) {
            listData[i]['distobedev'] = true
          } else {
            listData[i]['distobedev'] = false
          }
        }
        that.setData({
          status: listData
        })
        console.log(listData)
      }
    })
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})