import { http, convertToStarsArray, convertToCastString, convertToCastInfos } from '../../../utils/utils.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      movieData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id = options.id
      console.log(id)
      var url = `${app.globalData.doubanBase}/v2/movie/subject/${id}`
      http(url, this.processDoubanData)
  },
    processDoubanData(data) {
        if (!data) {
            return
        }
        console.log(data)
        var director = {
            avatar: "",
            name: ""
        }
        if (data.directors[0] != null) {
            if (data.directors[0].avatars != null) {
                director.avatar = data.directors[0].avatars
            }
            director.name = data.directors[0].name
        }
        var movieData = {
            title: data.title,
            original_title: data.original_title,
            image: data.images ? data.images.large : '',
            country: data.countries[0],
            year: data.year,
            wish_count: data.wish_count,
            comments_count: data.comments_count,
            star: convertToStarsArray(data.rating.stars),
            average: data.rating.average,
            director,
            casts: convertToCastString(data.casts),
            genres: data.genres.join('、'),
            summary: data.summary,
            castsInfo: convertToCastInfos(data.casts)
        }
        console.log(movieData)
        this.setData({
            movie: movieData
        })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
})