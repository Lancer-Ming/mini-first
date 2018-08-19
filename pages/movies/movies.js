import { convertToStarsArray } from "../../utils/utils"
var app = getApp();
// pages/movies/movies.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(app)
        var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3"
        var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3"
        var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3"

        this.getMovieListData(inTheatersUrl, 'theaters', '正在热映')
        this.getMovieListData(comingSoonUrl, 'comingSoon', '即将上映')
        this.getMovieListData(top250Url, 'top250', '豆瓣Top250')
    },
    getMovieListData(url, movieSetKey, category) {
        wx.request({
            url, //仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: res => {
                this.formatData(res.data.subjects, movieSetKey, category)
            }
        })
    },
    formatData(data, movieSetKey, categoryTitle) {
        var movies = []
        console.log(data)
        data.forEach((item, index) => {
            var obj = {}
            obj.movieId = item.id
            obj.headImg = item.images.large
            obj.title = item.title.length > 6 ? item.title.substring(0, 6)+'...' : item.title
            obj.average = item.rating.average
            obj.stars = convertToStarsArray(item.rating.stars)
            movies[index] = obj
        })

        var readyData = {}
        readyData[movieSetKey] = {
            movies, categoryTitle
        }

        this.setData(readyData)
    }
})