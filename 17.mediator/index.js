/**
 * 多个对象之间两两双向交互，
 * 构成的调用网络过于复杂；
 * 中介者模式将调用过程抽象，
 * 成为一个中间节点。
 * 不同于发布订阅模式，
 * 中介者模式没有将事件抽象出来。
 * 中介者模式更像是将观察者列表维护功能独立出来的观察者模式。
 */

class Mediator {
    #clientList = new Set()

    addClient (client) {
        this.#clientList.add(client)
    }

    deleteClient (client) {
        this.#clientList.delete(client)
    }

    deliverMessage (clients = [], event = {}) {
        clients.forEach(client => {
            client.respond(event)
        })
    }
}

class Client {
    #mediator

    constructor (name) {
        if (name) {
            this.name = name
        } else {
            throw new Error('Client name is required.')
        }
    }

    useMediator (mediator) {
        this.#mediator = mediator
        mediator.addClient(this)
    }

    notify (clients = [], event = {}) {
        this.#mediator.deliverMessage(clients, {
            name: this.name,
            ...event
        })
    }

    respond (event = {}) {
        console.log(`${this.name} received message from ${event?.name}: ${event?.message}`)
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    const mediator = new Mediator()
    const client1 = new Client('client1')
    const client2 = new Client('client2')
    const client3 = new Client('client3')
    const client4 = new Client('client4')
    client1.useMediator(mediator)
    client2.useMediator(mediator)
    client3.useMediator(mediator)
    client4.useMediator(mediator)
    client1.notify([client2, client3], {message: 'Aloha!'})
    client2.notify([client1, client3, client4], {message: 'Here is Johnny!'})
})