/**
 * 代理模式通过代理对象实现对原有对象的访问控制。
 * 装饰器模式直接改造强化了原有对象，
 * 最后暴露的是原有对象；
 * 代理模式将原有对象隐藏在代理对象内，
 * 最后暴露的是代理对象。
 * js的Proxy对象即是代理模式中的代理对象。
 */

class Target {
    func1 () {
        console.log('This is func1 in class Target.')
    }

    func2 () {
        console.log('This is func2 in class Target.')
    }
}

class TargetProxy {
    #target
    #handler

    constructor (target, handler) {
        this.#target = target
        this.#handler = handler
    }

    func1 () {
        this.#handler?.func1 ?
        this.#handler?.func1?.(this.#target) :
        this.#target?.func1()
    }

    func2 () {
        this.#handler?.func2 ?
        this.#handler?.func2?.(this.#target) :
        this.#target?.func2()
    }
}

//HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    const target = new Target()
    const proxy = new TargetProxy(target, {
        // func1 (target) {
        //     console.log('Before func1 in Class Target called.')
        //     target.func1()
        // },
        func2 (target) {
            console.log('Before func2 in Class Target called.')
            target.func2()
        }
    })
    proxy.func1()
    proxy.func2()
})