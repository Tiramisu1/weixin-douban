var app = getApp()

Page({
  data: {
    soonList: [],
    message: '',
    hotList: [],
    topList: [],
    type1: 'in_theaters',
    type2: 'coming_soon',
    type3: 'top250'
  },
  //计算评价星星
  getStars: function(dataList) {
    for (var i = 0; i < dataList.length; i++) {
      dataList[i].stars = [] //添加需要的star数组
      var data = dataList[i].rating.average / 2 //除以2，以便换5星
      var score = Math.floor(data * 2) / 2; //四舍五入
      var hasDEcimal = score % 2 !== 0; //判断奇偶
      var integer = Math.floor(score); //取整
      for (var n = 0; n < integer; n++) { //整数添加满星
        dataList[i].stars.push(1);
      }
      if (hasDEcimal) { //奇数添加半星
        dataList[i].stars.push(2)
      }
      while (dataList[i].stars.length < 5) { //其余为空星
        dataList[i].stars.push(0)
      }
    }
    return dataList
  },
  // 获取正在热映电影列表
  getMovieList: function (type) {
    var that = this;
    app.douban.find(type, 1, 20).then(res => {
      wx.hideLoading();
      var data = res.subjects;
      that.getStars(data);
      if (type == 'in_theaters') {
        that.setData({ hotList: data })
      } else if (type == 'coming_soon') {
        that.setData({ soonList: data })
      }else {
        that.setData({ topList: data})
      }
    })
  },
  onLoad: function(options) {  //生命周期函数，页面加载时
    wx.showLoading({
      title: '拼命加载中....'
    })
    this.getMovieList(this.data.type1);
    this.getMovieList(this.data.type2);
    this.getMovieList(this.data.type3)
  }
})