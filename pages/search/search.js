var app = getApp()

Page({
  data: {
    search: '',
    movieList: [],
    hasmore: false,
    page: 1,
    size: 20,
    warning: '没有更多内容了....'
  },
  loadMore: function () {
    if (!this.data.hasMore) return
    wx.showLoading({ title: '拼命加载中....' })
    return app.douban.find('search', this.data.page++, this.data.size, this.data.search)
      .then(d => {
        if (d.subjects.length) {
          wx.hideLoading();
          this.setData({ movieList: this.data.movies.concat(d.subjects)})
        } else {
          this.setData({ hasMore: false})
        }
      })
      .catch(e => {
        this.setData({ warning: '获取数据异常'})
      })
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '搜索'
    })
  },
  clearSearch: function() {
    this.setData({
      search: ''
    })
  },
  searchMovie: function(e) {
    if (!e.detail.value) return
    this.setData({ movies: [], page: 1 })
    this.setData({ hasMore: true, search: e.detail.value })
    this.loadMore()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})