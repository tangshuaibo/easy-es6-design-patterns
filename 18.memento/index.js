/**
 * 将对象当前状态克隆为新对象并保存备份，
 * 用以对象状态回退。
 * 对象状态克隆备份时使用了原型模式。
 */

// 状态建立类
class State {
    constructor (state) {
        this.state = state
    }
}

// 状态保存类
class StateSaver {
    constructor (stateObj) {
        this.stateObj = stateObj
        this.stateList = []
    }

    save () {
        console.log('state saving')
        // const value = JSON.parse(JSON.stringify(this.stateObj))
        const state = structuredClone(this.stateObj)
        this.stateList.push(state)
        console.log('state saved')
        return this
    }

    retrieve (num) {
        return this.stateList[num]
    }

    listAll () {
        console.log('states are listed as follows')
        // console.dir(this.stateList)
        for (let index = 0; index < this.stateList.length; index++) {
            console.log(this.stateList[index])
        }
        return this
    }
}

// 状态来源类
class Counter {
    constructor (startNum = 0) {
        this.count = startNum
    }

    add (stepNum) {
        return !stepNum ?
        this.count++ :
        (() => {
            return this.count += stepNum
        })()
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // let textEle = document.createElement('div')
    // let text = document.createTextNode('测试文字')
    // textEle.appendChild(text)
    // document.body.appendChild(textEle)
    const counter = new Counter()
    const counterState = new State(counter)
    const stateSaver = new StateSaver(counterState)
    stateSaver.save()
    stateSaver.listAll()
    setTimeout(()=>{
        console.log('================')
        counter.add()
        stateSaver.save()
        stateSaver.listAll()
    }, 1000)
    setTimeout(()=>{
        console.log('================')
        counter.add(10)
        stateSaver.save()
        stateSaver.listAll()
    }, 2000)
})