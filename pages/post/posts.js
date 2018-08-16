import { postList } from '../../data/posts-data'
Page({
    onLoad() {
        this.setData({ postList })
    },
    onPostTap(event) {
        let id = event.currentTarget.dataset.postId
        wx.navigateTo({
            url: '/pages/post/post-detail/post-detail?id=' + id,
        })
    }
})