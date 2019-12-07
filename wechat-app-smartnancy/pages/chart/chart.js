var app = getApp()

Page({
  data: {
    index: 0,
    lastindex: '',
    answerindex: 0,
    hiddenimg: false,
    imgsrc: '../../images/top1.png',
    dingsrc: '../../images/ding.png',
    Color: '#2fcc85',
    questions: [],
    priquestions: [],
    check: '',
    opt: '',
    setFalse: '',
    userOption: [],
    userOptiontemp: '',
    hiddenbtn: '',
    allNum: '',
    answerNum: 0,
    dislast: true,
    disnext: false,
    dissub: false,
    T: '',
    lnhide: false,
    questionhide: '',
    partname: '',
    partnum: '',
    partindex: '',
    yinshi: 0,
    yundong: 0,
    manbing: 0,
    suyang: 0,
    yicong: 0,
    questionNum: [],
    showModal: false
  },

  toLast: function(e) {//上一题
    var that = this
    var index = this.data.index
    var check = this.data.check
    var userOptiontemp = this.data.userOptiontemp
    var questions = this.data.questions
    var lastindex = this.data.lastindex
    var questionNum = this.data.questionNum
    var userOption = this.data.userOption

    console.log("questionNum last question is :" + questionNum);
    if (index != 0) { //不为第一题
    
      if (questionNum.length > 0) {
        index = questionNum.pop();
      } else {
        index = index - 1;
      }

      that.setData({
        index: index,
        dislast: false,
      })

      if (questionNum.indexOf(index) != -1) {
        questionNum.splice(index, 1);
      }
      console.log("questionNum is:" + questionNum)

      console.log(index)
      if (questions[index] && questions[index].multi_choice == 0) { //判断单选多选
        that.setData({
          questionhide: false
        })
      } else {
        that.setData({
          questionhide: true
        })
      }

      //进度条
      var pp = this.data.prograssPrecent
      var allNum = this.data.allNum
      pp = Math.round(100 * (index - 1) / allNum)
      that.setData({
        prograssPrecent: pp
      })

      //判断是否为倒数第二题
      if (questions.length == (index + 2)) {
        console.log("last index is:" + index);
        console.log("last questions.length is:" + questions.length);
        that.setData({
          lnhide: false
        })
      }

    } else { //第一题
      this.setData({
        dislast: true,
      })
    }
    that.counttime()
  },

  toNext: function(e) { //下一题
    var that = this
    var questions = this.data.questions
    var index = this.data.index
    var check = this.data.check
    var userOption = this.data.userOption
    var questionNum = this.data.questionNum
    console.log("questionNum next question is :" + questionNum);

    if (questionNum.indexOf(index) == -1) {
      questionNum.push(index);
    }
    console.log("questionNum is:" + questionNum)
    if (questions[index + 1].is_health != questions[index].is_health) { //下一部分提示弹窗
      that.setData({
        showModal: true
      })
    }

    if (questions[index]) {
      if (questions[index].hide != "") { //遇到setfalse，跳过一题
        var k = parseInt(questions[index].hide);
        that.setData({
          index: index + k,
          check: false,
          dislast: false
        })
        index = index + k;
        if (questions[index] && questions[index].multi_choice == 0) { //判断单选多选
          that.setData({
            questionhide: false
          })
        } else {
          that.setData({
            questionhide: true
          })
        }

      } else {
        //跳转下一题
        that.setData({
          index: index + 1,
          check: false,
          dislast: false
        })
        if (questions[index + 1] && questions[index + 1].multi_choice == 0) { //判断单选多选
          that.setData({
            questionhide: false
          })
        } else {
          that.setData({
            questionhide: true
          })
        }
      }
    }

    if (!questions[index + 2]) { //是否为最后一题
      that.setData({
        lnhide: true
      })
    }
    console.log(this.data.index)
    //进度条
    var pp = this.data.prograssPrecent

    var allNum = this.data.allNum
    pp = Math.round(100 * (index + 1) / allNum)
    that.setData({
      prograssPrecent: pp
    })
    this.data.answerNum = index + 1
    console.log("answernum :" + this.data.answerNum)

    //十秒后无应答
    that.counttime()
    console.log(questions)

  },

  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    this.hideModal();
  },

  counttime: function() {//超过8s弹出提示
    var that = this
    var yinshi = this.data.yinshi,
      yundong = this.data.yundong,
      manbing = this.data.manbing,
      suyang = this.data.suyang,
      yicong = this.data.yicong
    var questions = this.data.questions
    var index = this.data.index
    var check = this.data.check
    var t = this.data.T
    clearTimeout(t)
    t = setTimeout(function() {
      wx.showModal({
        title: '提示',
        content: 'Nancy耐心等待着您，咱们继续吧！',
        confirmText: '继续',
        cancelText: '下一部分',
        success: function(res) {
          if (res.confirm) {
            console.log('用户选择继续')
            that.counttime()
          } else if (res.cancel) {
            console.log('用户选择不继续') //用户不继续答题，跳到下一类型的题
            var ishealth = questions[index].is_health
            console.log(ishealth)
            switch (ishealth) {
              case 0:
                index = yinshi;
                break;
              case 4:
                index = yinshi + yundong;
                break;
              case 2:
                index = yinshi + yundong + manbing;
                break;
              case 1:
                index = yinshi + yundong + manbing + suyang;
                break;
              case 3:
                that.submitanswer();
                clearTimeout(t);
                break
            }
            that.setData({
              index: index,
            })
            console.log(that.data.index)

            if (questions[index + 1] && questions[index + 1].multi_choice == 0) { 
              //判断单选多选
              that.setData({
                questionhide: false //单选
              })
            } else {
              that.setData({
                questionhide: true
              })
            }
            that.counttime()
          }
        }
      }) //要延时执行的代码  
    }, 45000) //延迟时间 这里是8秒  
    that.setData({
      T: t
    })
  },

  radioChange: function(e) {//获取用户选项
    var that = this
    var index = this.data.index
    var questions = this.data.questions
    var userOpt = this.data.userOption
    var opt = this.data.opt
    that.counttime()
    console.log(index)
    console.log('用户选择的answerId：', e.detail.value)
    var opt = e.detail.value

    //设置check值
    if (questions[index].multi_choice) { //为多选
      for (var i = 0; i < questions[index].option.length; i++) {
        questions[index].option[i].check = false;
        for (var k = 0; k < userOpt.length; k++) {
          if (userOpt[k] == questions[index].option[i].answerId)
            userOpt.splice(k, 1)
        }
      }

      for (var i = 0; i < questions[index].option.length; i++) {
        for (var j = 0; j < opt.length; j++) {
          if (opt[j] == questions[index].option[i].answerId) {
            questions[index].option[i].check = true;
            questions[index].hide = questions[index].option[i].setFalse;
          }
        }
      }
    } else { //为单选
      for (var i = 0; i < questions[index].option.length; i++) {
        questions[index].option[i].check = false;
        for (var k = 0; k < userOpt.length; k++) {
          if (userOpt[k] == questions[index].option[i].answerId)
            userOpt.splice(k, 1)
        }
      }

      for (var i = 0; i < questions[index].option.length; i++) {
        if (opt == questions[index].option[i].answerId) {
          questions[index].option[i].check = true;
          questions[index].hide = questions[index].option[i].setFalse;
        } else {
          questions[index].option[i].check = false;
        }
      }
    }

    that.setData({
      questions: questions
    })
    //用户答案数组  
    var answerindex = this.data.answerindex
    userOpt = userOpt.concat(opt)
    //userOpt = userOpt.toString().split(',')
    for (var i = 0; i < userOpt.length; i++) { //删除空答案
      if (userOpt[i] == '') {
        userOpt.splice(i, 1)
      }
    }
    userOpt = Array.from(new Set(userOpt)) //去重 
    that.setData({
      userOption: userOpt,
      userOptiontemp: userOpt,
      opt: opt,
      lastindex: userOpt.length - 1
    })
    console.log("userOpt is:" + userOpt)
  },

  submitanswer: function(e) {//提交答案
    var userOpt = this.data.userOption
    var t = this.data.T
    var questionNum = this.data.questionNum
    var questions = this.data.questions
    var userOptLast = new Array()

    clearTimeout(t)
    this.setData({
      dissub: true
    })

    /**
     * 有部分题（跳转）是用户返回上一题之后重新选择答案后跳转之前所答题后将其已选答案去除
     */
    //先将最后一题题号录入进去；
    questionNum.push(questions.length - 1);

    for (var i = 0; i < questionNum.length; i++) {
      var index = questionNum[i];
      for (var k = 0; k < userOpt.length; k++) {
        for (var n = 0; n < questions[index].option.length; n++) {
          if (userOpt[k] == questions[index].option[n].answerId)
            userOptLast.push(userOpt[k])
        }
      }
    }

    wx.showModal({
      title: '提示',
      content: '您已完成全部问卷！Nancy综合多年经验为您生成了全方位的专属健康评估，赶快查看吧！',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')

          wx.request({
            url: 'https://www.shisousuo.com/Nancy/saveIformation/saveAnswerTest',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              userOption: userOptLast,
              user_id: app.globalData.userId
            },
            success: function(res) {
              console.log(res.data)
              wx.redirectTo({
                url: '../reportdetails/reportdetails',
              })
            }
          })

        }
      }
    })

  },


  //加载问卷
  onLoad: function() {
    wx.showLoading({
      title: '数据加载中',
      icon: 'loading'
    })
    var that = this
    var index = this.data.index
    var questions = this.data.questions
    var allNum = this.data.allNum
    var dislast = this.data.dislast
    var questionhide = this.data.questionhide
    var yinshi = this.data.yinshi,
      yundong = this.data.yundong,
      manbing = this.data.manbing,
      suyang = this.data.suyang,
      yicong = this.data.yicong
    wx.request({
      url: 'https://www.shisousuo.com/Nancy/getSurvey/getQuestion',
      data: {
        user_id: app.globalData.userId
      },
      success: function(res) {
        wx.hideLoading();
        for (var i = 0; i < res.data.length; i++) {
          res.data[i]['hide'] = false; //添加hide属性 
          for (var j = 0; j < res.data[i].option.length; j++) {
            if (res.data[i].option[j].setFalse) {
              res.data[i]['setfalse'] = res.data[i].option[j].setFalse
              break
            } else {
              res.data[i]['setfalse'] = ''
            }
          } //添加每一题对应的setfalse属性
          if (res.data[i].question_type == 0) {
            res.data[i]['hiddenimg'] = false
            res.data[i]['hiddenques'] = false
          } else if (res.data[i].question_type == 1) {
            res.data[i]['hiddenimg'] = true
            res.data[i]['hiddenques'] = false
          } else {
            res.data[i]['hiddenimg'] = false
            res.data[i]['hiddenques'] = true
          }
          //增加hiddenimg属性 
          switch (res.data[i].is_health) {
            case 0:
              yinshi++;
              break;
            case 1:
              suyang++;
              break;
            case 2:
              manbing++;
              break;
            case 3:
              yicong++;
              break;
            case 4:
              yundong++;
              break;
          } //统计各部分个数
        }
        console.log(yinshi, yundong, manbing, suyang, yicong)
        that.setData({
          yinshi: yinshi,
          suyang: suyang,
          manbing: manbing,
          yicong: yicong,
          yundong: yundong
        })
        //添加part属性
        for (var i = 0; i < yinshi; i++) {
          res.data[i]['part_id'] = i + 1
          res.data[i]['part_name'] = '饮食部分'
          res.data[i]['part_num'] = yinshi
          res.data[i]['part_desc'] = '评估结果和健康建议'
        }
        for (var i = yinshi, k = 1; i < yinshi + yundong; i++, k++) {
          res.data[i]['part_id'] = k
          res.data[i]['part_name'] = '运动部分'
          res.data[i]['part_num'] = yundong
          res.data[i]['part_desc'] = '评估结果和健康建议'
        }
        for (var i = yinshi + yundong, k = 1; i < yinshi + yundong + manbing; i++, k++) {
          res.data[i]['part_id'] = k
          res.data[i]['part_name'] = '慢病风险部分'
          res.data[i]['part_num'] = manbing
          res.data[i]['part_desc'] = '评估结果'
        }
        for (var i = yinshi + yundong + manbing, k = 1; i < yinshi + yundong + manbing + suyang; i++, k++) {
          res.data[i]['part_id'] = k
          res.data[i]['part_name'] = '健康素养度部分'
          res.data[i]['part_num'] = suyang
          res.data[i]['part_desc'] = '评估结果'
        }
        for (var i = yinshi + yundong + manbing + suyang, k = 1; i < yinshi + yundong + manbing + suyang + yicong; i++, k++) {
          res.data[i]['part_id'] = k
          res.data[i]['part_name'] = '骨骼健康部分'
          res.data[i]['part_num'] = yicong
          res.data[i]['part_desc'] = '评估结果'
        }
        //添加check属性
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < res.data[i].option.length; j++) {
            res.data[i].option[j]['check'] = false
          }
        }

        if (res.data[0].multi_choice == 0) {
          questionhide = false
        } else {
          questionhide = true
        }
        that.setData({
          index: 0,
          questions: res.data,
          priquestions: res.data,
          allNum: res.data.length,
          dislast: true,
          questionhide: questionhide
        })
        console.log(res.data)
        that.counttime()
      }
    })
  },
  onUnload: function() {
    var t = this.data.T
    clearTimeout(t)
  }
})