/**
 * 装饰器模式旨在不增加子类的情况下扩展已有类。
 * java装饰器是在运行时扩展某个对象的功能。
 * javascript装饰器是对类的修改，
 * 发生在编译时而非运行时。
 */

class Base {
    func1 () {
        console.log('This is func1 in class Base.')
    }
}

// 只是为目标类添加属性与方法，不涉及已有的js装饰器语法
class Decorator {
    static decorate (target) {
        Object.defineProperties(target.prototype, {
            func2: {
                value: Decorator.func2
            },
            func3: {
                value: Decorator.func3
            }
        })
        return target
    }

    static func2 () {
        console.log('This is func2 added to class Base.')
    }
    
    static func3 () {
        console.log('This is func3 added to class Base.')
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    const DecoratedBase = Decorator.decorate(Base)
    const baseInstance = new DecoratedBase()
    baseInstance.func1()
    baseInstance.func2()
    baseInstance.func3()
})