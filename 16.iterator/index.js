/**
 * 迭代器模式提供一种方法顺序访问聚合对象的各个元素，
 * 而又无需暴露该对象的内部表示。
 * js默认在可迭代对象的Symbol.iterator属性上部署其迭代方法，
 * 该方法返回一个可遍历该对象的迭代器。
 */

class ArrayIterator {
    #array
    #index

    constructor (array) {
        this.#array = array
        this.#index = 0
    }

    hasNext () {
        return this.#index < this.#array.length
    }

    next () {
        return this.hasNext() ?
        {
            value: this.#array[this.#index++],
            done: false
        } :
        {
            done: true
        }
    }

    reset () {
        this.#index = 0
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    const arrItr = new ArrayIterator([1,2,3,4,5])
    console.log(arrItr.next())
    console.log(arrItr.next())
    console.log(arrItr.next())
    console.log(arrItr.next())
    console.log(arrItr.next())
    console.log(arrItr.next())
    console.log(arrItr.next())
    arrItr.reset()
    console.log(arrItr.next())
    console.log(arrItr.next())
    console.log(arrItr.next())
    console.log(arrItr.next())
    console.log(arrItr.next())
    console.log(arrItr.next())
    console.log(arrItr.next())
    arrItr.reset()
})