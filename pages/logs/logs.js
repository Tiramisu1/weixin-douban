//logs.js
Page({
  data: {
    image: '../../images/play.png',
    value: "",
    danmuList: [{
      text: '第 1s 出现的弹幕',
      color: '#ff0000',
      time: 1
    },
    {
      text: '第 3s 出现的弹幕',
      color: '#ff00ff',
      time: 3
    }]
  },
  onReady: function() { //生命周期函数--监听页面初次渲染完成
    this.videoCtx = wx.createVideoContext('myVideo')
  },
  play: function() {
    var image = this.data.image === '../../images/play.png' ? '../../images/pause.png' : '../../images/play.png';
    this.setData({
      image: image
    })
    if (this.data.image === '../../images/play.png') {
      this.videoCtx.pause();
    } else {
      this.videoCtx.play()
    }
  },
  getRandomColor: function() {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  },
  inputValue: '',
  bindInputBlur: function (e){
    this.inputValue = e.detail.value
  },
  searchOrder: function() {
    this.videoCtx.sendDanmu({
      text: this.inputValue,
      color: this.getRandomColor()
    })
  }
})