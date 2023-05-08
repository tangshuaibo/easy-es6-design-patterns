/**
 * 状态机一般由三部分组成：状态（State）、事件（Event）、动作（Action）。
 * 其中，事件也称为转移条件（Transition Condition）。事件 触发 状态的转移及动作的执行。
 * 不过，动作不是必须的，可能只转移状态，不执行任何动作。
 * 
 * javascript的Generator函数是状态机的一种实现，
 * 参考：[Generator函数的语法](https://es6.ruanyifeng.com/#docs/generator)。
 */

// 有限状态机类
class StateMachine {
    #currentState

    // event start
    start (initialState) {
        if (initialState) {
            this.#currentState = initialState
            this.#currentState.act()
            return this
        } else {
            throw new Error('Initial state is undefined')
        }
    }

    // event update
    update () {
        const nextState = this.#currentState.getNextState()
        if (nextState) {
            this.#currentState = nextState
            this.#currentState.act()
            return this
        } else {
            throw new Error('Next state is undefined')
        }
    }
}

// 状态类
class State {
    #nextState
    #action

    setNextState (state) {
        this.#nextState = state
        return this
    }

    getNextState () {
        return this.#nextState
    }

    setAction (action) {
        this.#action = action
        return this
    }

    act () {
        this.#action ?
        this.#action() :
        console.warn('No action found')
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', (event) => {
    // console.log('DOMContentLoaded', event)
    const state1 = new State()
    const state2 = new State()
    const state3 = new State()
    state1.setNextState(state2).setAction(() => { console.log('This is state1') })
    state2.setNextState(state3).setAction(() => { console.log('This is state2') })
    state3.setNextState(state1).setAction(() => { console.log('This is state3') })

    const stateMachine = new StateMachine()
    stateMachine.start(state1).update().update().update().update().update()
})