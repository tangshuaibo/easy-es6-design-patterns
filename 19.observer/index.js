/**
 * 被观察对象维护一个观察者列表；
 * 被观察对象对观察者的单向通信。
 */

// 观察者类
class Observer {
    constructor () {
        this.symbol = Symbol()
    }

    subscribe(subject, callback) {
        subject.observerList.set(this.symbol, callback)
    }

    unsubscribe(subject) {
        subject.observerList.delete(this.symbol)
    }
}

// 被观察类
class Subject {
    constructor () {
        this.observerList = new Map()
    }

    dispatch(event) {
        for (const callback of this.observerList.values()) {
            callback(event)
        }
    }
}

// HTML解析完成后执行
document.addEventListener(`DOMContentLoaded`, () => {
    // console.log(`DOMContentLoaded`)

    const subject = new Subject()
    const observer1 = new Observer()
    const observer2 = new Observer()

    observer1.subscribe(subject, message => {
        document.writeln(`<div>Observer1 received message from subject: ${message}</div>`)
    })
    observer2.subscribe(subject, message => {
        document.writeln(`<div>Observer2 received message from subject: ${message}</div>`)
    })
    subject.dispatch(`Greetings from subject!`)

    observer1.unsubscribe(subject)
    subject.dispatch(`Here is Johnny!`)
})