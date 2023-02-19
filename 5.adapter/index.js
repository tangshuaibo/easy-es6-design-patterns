/**
 * 若要求已有对象在新环境中可以调用新环境的接口，
 * 在保持对象各方法的形式不变前提下，
 * 通过调用适配器修改对象方法的内部实现，
 * 从而实现内部可调用新环境的接口。
 */

class Base1 {
    act () {}
}

class Base2 {
    do () {}
}

class FuncA extends Base1 {
    act () {
        console.log('This is FuncA.')
    }
}

class FuncB extends Base1 {
    act () {
        console.log('This is FuncB.')
    }
}

class Adapter {
    adapt (type) {
        switch (type) {
            case 'FuncA':
                return new FuncA()
            case 'FuncB':
                return new FuncB()
            default:
                throw new Error('Invalid type.')
        }    
    }
}

class FuncC extends Base2 {
    do (type) {
        console.log('This is FuncC.')
        const adapter = new Adapter()
        adapter.adapt(type).act()
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    const funcC = new FuncC()
    funcC.do('FuncB')
})