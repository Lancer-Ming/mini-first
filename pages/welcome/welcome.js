Page({
  onTap() {
    wx.redirectTo({
      url: '../post/posts',
    })
  },

  onUnload() {
    console.log('onUnload')
  },
  onHide() {
    console.log('onHide')
  }
})