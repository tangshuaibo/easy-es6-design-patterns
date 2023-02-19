/**
 * 通过实例工厂建造多个结构相同但细节不同的单例，
 * 是工厂模式与单例模式的结合。
 */

// 父类
class Square {
    constructor (width = 0) {
        this.width = width
    }

    draw () {
        console.log(`square-width: ${this.width}cm`)
    }
}

// 实现类
class ColoredSquare extends Square {
    constructor (width, color = 'white') {
        super(width)
        this.color = color
    }

    draw () {
        super.draw()
        console.log(`square-color: ${this.color}`)
    }
}

// 工厂类
class ColoredSquareFactory {
    constructor () {
        this.instants = new Map()
    }

    getColoredSquare (color, width) {
        return this.instants.get(color) ??
        (() => {
            let instant = new ColoredSquare(width, color)
            this.instants.set(color, instant)
            console.log(`a ${color} square object was created`)
            return instant
        })()
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    let coloredSquareFactory = new ColoredSquareFactory()
    coloredSquareFactory.getColoredSquare('red').draw()
    coloredSquareFactory.getColoredSquare('red').draw()
    coloredSquareFactory.getColoredSquare('red').draw()
    coloredSquareFactory.getColoredSquare('blue').draw()
    coloredSquareFactory.getColoredSquare('blue').draw()
    coloredSquareFactory.getColoredSquare('blue').draw()
})