class BaseObject {
    constructor (name) {
        this.name = name
    }

    action () {}
}

class NonNullObject extends BaseObject {
    constructor (name) {
        super(name)
    }

    action () {
        console.log(`This is not a null object ${this.name}.`)
    }
}

class NullObject extends BaseObject {
    constructor (name) {
        super(name)
    }

    action () {
        console.log(`Null object ${this.name} was created because the name is not in named range.`)
    }
}

class ObjectFactory {
    #namedRange = []

    constructor (namedRange) {
        this.#namedRange = namedRange
    }

    getObject (name) {
        return this.#namedRange.includes(name) ?
        new NonNullObject(name) :
        new NullObject(name)
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', (event) => {
    // console.log('DOMContentLoaded', event)
    const objFty = new ObjectFactory(['obj1', 'obj2'])
    objFty.getObject('obj1').action()
    objFty.getObject('obj2').action()
    objFty.getObject('obj3').action()
})