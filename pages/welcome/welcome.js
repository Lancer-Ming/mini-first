Page({
    onTap() {
        wx.switchTab({
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