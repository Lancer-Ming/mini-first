import { postList } from '../../../data/posts-data'
Page({
    data: {
        currentPostId: '',
        collected: ''
    },
    onLoad(option) {
        this.data.currentPostId = option.id
        var postId = option.id
            // 将文章获取到
        this.setData({ post: postList[postId] })

        // 获取缓存里的收藏数据
        var postsCollected = wx.getStorageSync('post-collection')
            // 如果存在
        if (postsCollected) {
            var collected = postsCollected[postId] || false
            this.setData({
                    collected
                })
                // 否则自己加一个
        } else {
            var postsCollected = {}
            postsCollected[postId] = false
            wx.setStorageSync('post-collection', postsCollected)
        }
    },

    // 点击收藏按钮
    onCollect(event) {
        // 获取储存的收藏数据
        var postsCollected = wx.getStorageSync('post-collection')

        this.onShowModal(postsCollected)
    },
    onShowToast(postsCollected, collected) {
        wx.showToast({
            title: collected ? "收藏成功" : "取消成功",
            icon: "success"
        })
    },
    onShowModal(postsCollected) {

        // 提示
        wx.showModal({
            title: "收藏",
            content: postsCollected[this.data.currentPostId] ? "确认取消收藏么？" : "确认收藏么？",
            showCancel: true,
            cancelText: "取消",
            cancelColor: "#333",
            confirmText: "确定",
            confirmColor: "#405f80",
            success: (res) => {
                if (res.confirm) {
                    postsCollected[this.data.currentPostId] = !postsCollected[this.data.currentPostId]
                        // set 到 Storage 里
                    wx.setStorageSync('post-collection', postsCollected)
                        // 赋值在data里
                    var collected = postsCollected[this.data.currentPostId]
                    this.setData({
                        collected
                    })
                    this.onShowToast(postsCollected, collected)
                }
            }
        })
    },
    // 分享
    onShare(event) {
        var itemList = [
            '分享到微信好友',
            '分享到朋友圈',
            '分享到QQ空间',
            '分享到微博',
        ]
        wx.showActionSheet({
            itemList,
            itemColor: '#405f80',
            success: (res) => {
                wx.showToast({
                    title: `您想要的功能-"${itemList[res.tapIndex]}"暂时没有！`,
                    icon: 'none'
                })
            }
        })
    }
})