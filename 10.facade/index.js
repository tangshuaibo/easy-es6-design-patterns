/**
 * 外观模式将一组接口调用封装为一个接口，
 * 将每次一组方法调用简化为一个方法调用。
 */

class Shape {
    constructor () {
        if (new.target === Shape) {
            throw new TypeError('Class Shape is not instantiable')
        }
    }
    draw() {}
}

class Circle extends Shape {
    constructor () {
        super()
    }
    draw () {
        console.log('Drew a circle.')
    }
}

class Square extends Shape {
    draw () {
        console.log('Drew a square')
    }
}

class ShapeMaker {
    #circle = new Circle()
    #square = new Square()

    drawCircle () {
        this.#circle.draw()
    }

    drawSquare () {
        this.#square.draw()
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    const shapeMaker = new ShapeMaker()
    shapeMaker.drawCircle()
    shapeMaker.drawSquare()
})