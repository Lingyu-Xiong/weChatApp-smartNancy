Page({
  data: {
    Color: '#12b7f5',
    items: [
      { name: '1', value: '每周最多吃一次高脂肪肉类' },
      { name: '2', value: '避免煎炸、爆炒等烹饪方式，选择清炒、蒸、煮等', checked: 'true' },
      { name: '3', value: '每周最多吃一次动物内脏，例如猪肝、牛杂、腰花等' },
      { name: '4', value: '避免顿顿精米白面，加入全谷物' },
      { name: '5', value: '每天最多吃一次高糖点心' },
    ],

  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  
  onload: function () {

  }

})