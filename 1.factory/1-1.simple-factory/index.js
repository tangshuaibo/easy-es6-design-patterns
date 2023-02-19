/**
 * 简单工厂模式允许同一个工厂生产多种不同的产品。
 */

class Product {
    constructor () {
        if (new.target === Product) {
            throw new Error(`Class ${new.target.name} is not instantiable.`)
        }
    }

    showInfo () {}
}

class ProductA extends Product {
    showInfo () {
        console.log('Product type A')
    }
}

class ProductB extends Product {
    showInfo () {
        console.log('Product type B')
    }
}

class Type {
    static TypeA = Symbol()
    static TypeB = Symbol()
}

class SimpleFactory {
    makeProduct (type) {
        switch (type) {
            case Type.TypeA:
                return new ProductA()
            case Type.TypeB:
                return new ProductB()
            default:
                throw new Error('Invalid type')
        }
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    const {TypeA, TypeB} = Type
    const simpleFactory = new SimpleFactory()
    const productA = simpleFactory.makeProduct(TypeA)
    const productB = simpleFactory.makeProduct(TypeB)
    productA.showInfo()
    productB.showInfo()
    const productC = simpleFactory.makeProduct('TypeC')
    productC.showInfo()
})