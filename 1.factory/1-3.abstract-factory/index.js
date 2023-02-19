/**
 * 工厂方法模式中每种工厂只生产一种产品的行为显然非常不合理。
 * 我们可以让每种工厂生产几种产品。
 * 这就是抽象工厂模式
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

class ProductC extends Product {
    showInfo () {
        console.log('Product type C')
    }
}


// 工厂类
class Factory {
    constructor () {
        if (new.target === Factory) {
            throw new Error(`Class ${new.target.name} is not instantiable.`)
        }
    }

    makeProductA () {}
    makeProductB () {}
    makeProductC () {}
}

class FactoryA extends Factory {
    makeProductA () {
        return new ProductA()
    }

    makeProductB () {
        return new ProductB()
    }

    makeProductC () {
        return new ProductC()
    }
}

class FactoryB extends Factory {
    makeProductA () {
        return new ProductA()
    }

    makeProductB () {
        return new ProductB()
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    const factoryA = new FactoryA()
    const factoryB = new FactoryB()
    factoryA.makeProductA().showInfo()
    factoryA.makeProductB().showInfo()
    factoryB.makeProductA().showInfo()
    factoryB.makeProductC().showInfo()
})