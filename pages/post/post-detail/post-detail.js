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
        postsCollected[this.data.currentPostId] = ! postsCollected[this.data.currentPostId]
        // set 到 Storage 里
        wx.setStorageSync('post-collection', postsCollected)
        // 赋值在data里
        this.setData({
            collected: postsCollected[this.data.currentPostId]
        })
    }
})