/**
 * 通过建造者对象对颗粒的把握，
 * 逐步设置被建造对象的属性。
 * 将复杂的对象构造拆解为多个简单步骤。
 */

class Computer {
    constructor (brand, budget) {
        this.brand = brand
        this.budget = budget
    }

    showInfo () {
        let divEle = document.querySelector('#info')
        divEle ?
        divEle.innerText = `${this.brand}&${this.budget}` :
        alert('target element missed')
    }
}

class ComputerBuilder {
    brand = ''
    budget = ''

    setBrand (text) {
        this.brand = text
        return this
    }

    setBudget (text) {
        this.budget = text
        return this
    }

    done () {
        return new Computer(this.brand, this.budget)
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', function () {
    new ComputerBuilder()
        .setBrand('地球人类')
        .setBudget('8000')
        .done()
        .showInfo()
})