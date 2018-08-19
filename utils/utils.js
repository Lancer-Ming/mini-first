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