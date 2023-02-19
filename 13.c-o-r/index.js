/**
 * 责任链模式将对象串成一条链，
 * 上游发出的请求沿这条链传播，
 * 链上有能力处理请求的对象会依次做出反应，
 * 或遇到有能力处理请求的对象就停止传递。
 */

class Level {
    static DEBUG = 0
    static INFO = 1
    static WARN = 2
    static ERROR = 3
    static FATAL = 4
}

class ChainEvent {
    constructor (level, message) {
        this.eventLevel = level
        this.message = message
    }
}

class ChainNode {
    #nodeTag
    #nextNode
    #eventLevel

    constructor (tag) {
        this.#nodeTag = tag
    }

    setNext (node) {
        this.#nextNode = node
        return this
    }

    setLevel (level) {
        this.#eventLevel = level
        return this
    }

    handle (event) {
        this.#eventLevel <= event.eventLevel && console.log(`ChainNode ${this.#nodeTag}: ${event.message}.`)
        this.#nextNode?.handle(event)
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    const node1 = new ChainNode('node1')
    const node2 = new ChainNode('node2')
    const node3 = new ChainNode('node3')
    const node4 = new ChainNode('node4')
    const node5 = new ChainNode('node5')
    node1.setLevel(Level.DEBUG).setNext(node2)
    node2.setLevel(Level.INFO).setNext(node3)
    node3.setLevel(Level.WARN).setNext(node4)
    node4.setLevel(Level.ERROR).setNext(node5)
    node5.setLevel(Level.FATAL)
    const chainEvent = new ChainEvent(Level.WARN, 'Warning, Aloha!')
    node1.handle(chainEvent)
})