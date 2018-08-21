import { convertToStarsArray, http } from "../../../utils/utils"
var app = getApp();
Page({
    data: {
        category: '',
        requestUrl: '',
        totalCount: 0,
        isEmpty: true,
        movies: []
    },
    onLoad(options) {
        var category = options.category
        this.data.category = category
        var dataUrl = ''
        switch (category) {
            case "正在热映":
                dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
                break
            case "即将上映":
                dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
                break
            case "豆瓣Top250":
                dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
                break
        }
        // 赋值给data的 requestUrl
        this.data.requestUrl = dataUrl
        this.getMovieListData(dataUrl)
    },

    onReady() {
        wx.setNavigationBarTitle({
            title: this.data.category
        })
    },
    // 滑动到底端
    onReachBottom() {
        var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20'
        http(nextUrl, this.callBack)
        wx.showNavigationBarLoading()
    },
    // 下拉事件
    onPullDownRefresh(event) {
        console.log(123)
        var refreshUrl = this.data.requestUrl + '?start=0&count=20'
        this.data.movies = []
        this.data.isEmpty = true
        this.data.totalCount = 0
        http(refreshUrl, this.callBack)
        wx.showNavigationBarLoading();
    },

    onMovieDetailTap(event) {
        var movieId = event.currentTarget.dataset.movieId
        wx.navigateTo({
            url: `/pages/movies/movie-detail/movie-detail?id=${movieId}`,
        })
    },

    getMovieListData(dataUrl) {
        http(dataUrl, this.callBack)
    },
    callBack(data) {
        var movies = []
        data.subjects.forEach((item, index) => {
            var obj = {}
            obj.movieId = item.id
            obj.headImg = item.images.large
            obj.title = item.title.length > 6 ? item.title.substring(0, 6)+'...' : item.title
            obj.average = item.rating.average
            obj.stars = convertToStarsArray(item.rating.stars)
            movies[index] = obj
        })

        // 如果不是第一次 加载数据 ,数据不为空
        if (!this.data.isEmpty) {
            movies = this.data.movies.concat(movies)
        } else {
            this.data.isEmpty = false
        }
        // 计算电影总数
        this.data.totalCount += 20
        console.log(this.data)
        this.setData({
            movies
        })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
    }
})