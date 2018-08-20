export function convertToStarsArray(star) {
    var starArray = []
    var star = star / 10
    for(var i = 0; i < 5; i ++) {
        if (star - i > 0.5) {
            starArray.push(1)
        } else if (star - i == 0.5) {
            starArray.push(2)
        } else {
            starArray.push(0)
        }
    }
    return starArray
}

export function convertToCastString(casts) {
    var castString = ''
    casts.forEach(item => {
        castString += item.name + ' / '
    })
    return castString.substring(0, castString.length - 2)
}

export function convertToCastInfos(casts) {
    var castsArray = []
    casts.forEach(item => {
        castsArray.push({
            avatar: item.avatars ? item.avatars.large : '',
            name: item.name
        })
    })  
    return castsArray
}

export function http(url, callBack) {
    wx.request({
        url, //仅为示例，并非真实的接口地址
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: res => {
            callBack(res.data)
        }
    })
}