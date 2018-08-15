var app = getApp()

Page({
  data: {
    movieList: [],
    hasMore: true,
    type: 'in_theaters',
    warning: '没有更多的内容了....',
    page: 1,
    size: 20,
    show: false
  },
  // 加载列表数据
  loadMore: function() {
    if (!this.data.hasMore) return // 列表已经没有更多数据
    wx.showLoading({
      title: '拼命加载中...',
    })
    return app.douban.find(this.data.type, this.data.page++, this.data.size).then(res => {
      wx.hideLoading()
      if (res.subjects.length) {
        this.setData({ movieList: this.data.movieList.concat(res.subjects) }) //concat 连接两个或多个数组，不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
      }else{
        this.setData({ hasMore: false})
      }
    }).catch(d => {
      this.setData({ warning: '获取数据失败'})
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.type = options.type;
    // 刷新顶部标题
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.loadMore()
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  // onPullDownRefresh() {
  //   wx.stopPullDownRefresh()
  // },
  /**
   * 生命周期函数--上拉触底加载
   */
  onReachBottom:function() {
    this.loadMore()
  }
})