/**
 * 将实现相同目标的不同行为，
 * 封装为不同的策略
 */

class Strategy {
    #operation

    constructor (type, operation) {
        this.type = Symbol.for(type)
        this.#operation = operation
    }

    operate (event) {
        this.#operation(event)
    }
}

class StrategyManager {
    #strategyMap = new Map()

    addStrategy (strategy) {
        this.#strategyMap.set(strategy.type, strategy)
        return this
    }

    removeStrategy (strategy) {
        this.#strategyMap.delete(strategy.type, strategy)
        return this
    }

    getStrategy (type) {
        return this.#strategyMap.get(Symbol.for(type))
    }
}

class Context {
    #strategy

    useStrategy (strategy) {
        this.#strategy = strategy
        return this
    }

    resetStrategy () {
        this.#strategy = undefined
        return this
    }

    execute (event) {
        this.#strategy ?
        this.#strategy.operate(event) :
        (() => {
            throw new Error('No strategy used.')
        })()
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', (event) => {
    // console.log('DOMContentLoaded', event)
    const context = new Context()
    const strategyManager = new StrategyManager()
    const strategy1 = new Strategy('type1', (event) => {
        console.log(`Using strategy type1. Got an event:\n${event}`)
    })
    const strategy2 = new Strategy('type2', (event) => {
        console.log(`Using strategy type2. Got an event:\n${event}`)
    })
    const strategy3 = new Strategy('type3', (event) => {
        console.log(`Using strategy type3. Got an event:\n${event}`)
    })

    strategyManager.addStrategy(strategy1).addStrategy(strategy2)

    context.useStrategy(strategyManager.getStrategy('type1')).execute('The first attempt.')
    context.useStrategy(strategy3).execute('The second attempt.')
    context.resetStrategy().execute('The third attempt.')
})