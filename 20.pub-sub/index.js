/**
 * 事件总线维护事件与事件行为列表；
 * 发布者在事件总线注册事件行为；
 * 订阅者的行为触发被设置在事件行为中；
 * 发布者通过激活事件总线的事件触发行为，
 * 由事件总线触发事件然后执行各种事件行为。
 */

// 事件中心类
class EventBus {
    #builtinType = [
        [Symbol.for('type1'), new Set()],
        [Symbol.for('type2'), new Set()]
    ]
    #eventList = new Map(this.#builtinType)

    addEvent (type) {
        const typeSym = Symbol.for(type)
        this.#eventList.has(typeSym) ?
        console.warn(`addEvent: event ${type} already exists`) :
        this.#eventList.set(Symbol.for(type), new Set())
    }

    removeEvent (type) {
        const typeSym = Symbol.for(type)
        this.#eventList.has(typeSym) ?
        this.#eventList.delete(typeSym) :
        console.warn(`removeEvent: event ${type} not found`)
    }

    dispatchEvent (type, event) {
        const typeSym = Symbol.for(type)
        this.#eventList.get(typeSym).forEach(callback => {
            callback(event)
        });
    }

    addEventListener (type, callback) {
        const typeSym = Symbol.for(type)
        this.#eventList.has(typeSym) ?
        this.#eventList.get(typeSym).add(callback) :
        console.warn(`addEventListener: event ${type} not found`)
    }

    removeEventListener (type, callback) {
        const typeSym = Symbol.for(type)

        this.#eventList.has(typeSym) ?
        this.#eventList.get(typeSym).delete(callback) :
        console.warn(`removeEventListener: event ${type} not found`)
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // globalThis.console.log('DOMContentLoaded')
    const eventBus = new EventBus()

    eventBus.addEventListener(`type1`, (event) => {
        console.log(`event type1:`, event)
    })
    eventBus.dispatchEvent(`type1`, {
        msg: 'human must die',
        date: new Date().toLocaleString()
    })

    eventBus.addEvent(`type2`)
    eventBus.addEvent(`type3`)

    eventBus.addEventListener(`type3`, (event) => {
        console.log(`event type3:`, event)
    })
    eventBus.dispatchEvent(`type3`, {
        msg: 'love from China',
        date: new Date().toLocaleString()
    })

    eventBus.removeEvent(`type4`)
})