/**
 * 访问者模式在不变更被访问对象类结构的基础上，
 * 通过固定接口引入第三方访问者对象让其引用自身或自身某元素，
 * 达到借助第三方对象扩充自身能力的效果。
 * 该模式将稳定的数据结构与易变的数据操作分离。
 * 如javascript的call/bind/apply方法使用了访问器模式，
 * 它们在不改变目标对象结构前提下，为目标对象动态添加了新的操作方法。
 */

class Client {
    #name

    constructor (name) {
        this.#name = name
    }

    getName () {
        return this.#name
    }

    receive (visitor) {
        visitor.visit(this)
    }
}

class Visitor {
    #name
    #client

    constructor (name) {
        this.#name = name
    }

    visit (client) {
        this.#client = client
    }

    act () {
        console.log(`Visitor ${this.#name}: Client ${this.#client.getName()} let me in.`)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    const clientTom = new Client('Tom')
    const visitorJerry = new Visitor('Jerry')

    // clientTom.receive(visitorJerry)
    visitorJerry.visit(clientTom)
    visitorJerry.act()
})