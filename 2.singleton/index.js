// 懒汉式单例类
class LazySingleton {
    static #singleton

    showInfo () {
        console.log('This is a LazySingleton instance')
    }

    static getSingleton () {
        return this.#singleton ?
        (() => {
            console.log('LazySingleton instance already exists.')
            return this.#singleton
        })() :
        (() => {
            console.log('Created an LazySingleton instance.')
            return this.#singleton = new LazySingleton()
        })()
    }
}

// 饿汉式单例类
class HungrySingleton {
    static #singleton = new HungrySingleton()

    showInfo () {
        console.log('This is a HungrySingleton instance')
    }

    static getSingleton () {
        return this.#singleton
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    const singleton1 = LazySingleton.getSingleton()
    singleton1.showInfo()
    const singleton2 = LazySingleton.getSingleton()
    singleton2.showInfo()

    const singleton3 = HungrySingleton.getSingleton()
    singleton3.showInfo()
    const singleton4 = HungrySingleton.getSingleton()
    singleton4.showInfo()
})