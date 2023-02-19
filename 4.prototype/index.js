/**
 * 直接创建对象开销较大时，
 * 可以考虑原型模式，
 * 用于克隆当前对象及其状态。
 * 常与备忘录模式配合使用。
 * 如某对象缓存了数据库查询结果，
 * 然后克隆备份当前对象。
 */

class Prototype {
    constructor (sym) {
        this.sym = sym
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    const obj1 = new Prototype('proto1')
    const obj2 = structuredClone(obj1)
    console.log(`Obj2: %o`, obj2)
    console.log(`Obj1 is obj2: ${Object.is(obj1, obj2)}`)
    console.log(`Obj1 is prototype of obj2: ${obj1.isPrototypeOf(obj2)}`)
    console.log(`Obj2 is instance of class Prototype: ${obj2 instanceof Prototype}`)
})