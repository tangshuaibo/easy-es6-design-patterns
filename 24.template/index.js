/**
 * 要调用的是相同的，
 * 但是
 */

class Template {
    a () {}
    b () {}
    c () {}

    d () {
        this.a()
        this.b()
        this.c()
    }
}

class ConcreteA extends Template {
    a () {
        console.log('ConcreteA: func a is working.')
    }

    b () {
        console.log('ConcreteA: func b is working.')
    }

    c () {
        console.log('ConcreteA: func c is working.')
    }
}

class ConcreteB extends Template {
    a () {
        console.log('ConcreteB: func a is working.')
    }

    b () {
        console.log('ConcreteB: func b is working.')
    }

    c () {
        console.log('ConcreteB: func c is working.')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    new ConcreteA().d()
    new ConcreteB().d()
})