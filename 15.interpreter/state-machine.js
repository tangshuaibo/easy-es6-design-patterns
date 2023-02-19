class StateType {
    static INITIAL = 0
    static INTERMEDIATE = 1
    static FINAL = 2
    static Types = [
        this.INITIAL,
        this.INTERMEDIATE,
        this.FINAL
    ]
}

class State {
    #id
    #type
    #action
    #next

    constructor (id, type, action, next) {
        if (typeof id !== 'string' && typeof id !== 'number') {
            throw new TypeError('Invalid state id')
        }
        if (!StateType.Types.includes(type)) {
            throw new TypeError('Invalid state type.')
        }
        if (typeof action !== 'function') {
            throw new TypeError('Invalid state action.')
        }
        if (type !== StateType.FINAL && typeof next !== 'function') {
            throw new TypeError('Invalid function next.')
        }
        this.#id = id
        this.#type = type
        this.#action = action
        this.#next = next
    }

    getId () {
        return this.#id
    }

    getType () {
        return this.#type
    }

    getNext (event) {
        if (this.isFinal()) {
            return
        }
        const nextState = this.#next?.(event)
        if (!(nextState instanceof State)) {
            throw new Error(`State ${this.getId()}: Invalid next state.`)
        }
        return nextState
    }

    isFinal () {
        return this.#type === StateType.FINAL
    }

    act (event) {
        return this.#action?.(event)
    }
}

class StateManager {
    #stateList = new Map()

    add (states) {
        if (!(states instanceof Array)) {
            throw new TypeError('Invalid state array.')
        }
        for (const state of states) {
            if (!(state instanceof State)) {
                throw new TypeError('Invalid state.')
            }
            if (this.#stateList.has(state.getId())) {
                throw new Error('State id conflict.')
            }
            this.#stateList.set(state.getId(), state)
        }
    }

    has (id) {
        return this.#stateList.has(id)
    }

    get (id) {
        return this.#stateList.get(id)
    }

    remove (id) {
        this.#stateList.delete(id)
    }
}

class StateMachine {
    #currentState
    #nextState

    getCurrentState () {
        return this.#currentState
    }

    getNextState () {
        return this.#nextState
    }

    start (state, {
        beforeStart,
        started
    }) {
        if (!(state instanceof State)) {
            throw new TypeError('Invalid initial state.')
        }
        beforeStart?.()
        this.#currentState = state
        this.#nextState = undefined
        this.#currentState?.act()
        this.#nextState = this.#currentState.getNext()
        started?.(this.#currentState, this.#nextState)
    }

    update ({
        beforeUpdate,
        updated
    }) {
        beforeUpdate?.(this.#currentState, this.#nextState)
        this.#currentState = this.#nextState
        this.#nextState = undefined
        this.#currentState?.act()
        this.#nextState = this.#currentState?.getNext()
        updated?.(this.#currentState, this.#nextState)
    }

    stop ({
        beforeStop,
        stopped
    }) {
        beforeStop?.(this.#currentState, this.#nextState)
        this.#currentState = undefined
        this.#nextState = undefined
        stopped?.()
    }

    run (state, {
        beforeStart,
        started,
        beforeUpdate,
        updated,
        beforeStop,
        stopped
    }) {
        this.start(state, {
            beforeStart,
            started
        })
        while (!this.#currentState.isFinal()) {
            this.update({
                beforeUpdate,
                updated
            })
        }
        this.stop({
            beforeStop,
            stopped
        })
    }
}

export {
    State,
    StateType,
    StateManager,
    StateMachine
}