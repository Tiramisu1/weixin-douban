module.exports = function(api, path, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${api}/${path}`,
        data: Object.assign({}, params),  //Object.assign复制params进{}，ru如果有相同的参数会替换为Parmas中的值，没有则新增
        header: {'Content-Type': 'json'},
        success: resolve,
        fail: reject
      })
    })
}