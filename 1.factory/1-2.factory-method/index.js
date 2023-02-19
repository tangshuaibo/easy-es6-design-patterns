/**
 * 工厂方法模式在简单工厂模式基础上，
 * 将生产多种产品的综合工厂，
 * 拆分成多个生产单一产品的专门工厂。
 */

// 产品类
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

// 工厂类
class Factory {
    constructor () {
        if (new.target === Factory) {
            throw new Error(`Class ${new.target.name} is not instantiable.`)
        }
    }

    makeProduct () {}
}

class ProductAFactory extends Factory {
    makeProduct () {
        return new ProductA()
    }
}

class ProductBFactory extends Factory {
    makeProduct () {
        return new ProductB()
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    const productAFactory = new ProductAFactory()
    const productBFactory = new ProductBFactory()
    const productA = productAFactory.makeProduct()
    const productB = productBFactory.makeProduct()
    productA.showInfo()
    productB.showInfo()
    const factory = new Factory()
    const product = factory.makeProduct()
    product.showInfo()
})