/**
 * 过滤器模式允许开发者使用不同标准过滤同一组对象，
 * 如js数组的filter方法。
 */

class Filter {
    static handle (arr, handler) {
        const result = []
        for (const item of arr) {
            handler(item) && result.push(item)
        }
        return result
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    console.log(Filter.handle([1, 2, 3, 4, 5], (item) => {
        return item > 3
    }))
})