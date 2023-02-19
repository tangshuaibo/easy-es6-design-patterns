/**
 * 通过专门的命令调用者，
 * 接受并执行各种封装好的命令
 */

// 命令创建类
class Command {
    constructor (action) {
        this.action = action
    }

    execute () {
        this.action.act()
    }
}

class CommandBuilder {
    static #singleton

    static getSingleton () {
        return this.#singleton ?? (this.#singleton = new CommandBuilder())
    }

    static buildCommand (action) {
        return this.getSingleton().buildCommand(action)
    }

    buildCommand (action) {
        return new Command(action)
    }
}

// 行为类
class Action {
    act () {}
}

class BuyAction extends Action {
    act () {
        console.log('buying')
    }
}

class SellAction extends Action {
    act () {
        console.log('selling')
    }
}

// 命令调用类
class CommandInvoker {
    constructor () {
        this.commandList = []
    }

    accept (...commands) {
        this.commandList.push(...commands)
        return this
    }

    reset () {
        this.commandList = []
    }

    run () {
        this.commandList.forEach(command => {
            command.execute()
        })
        this.reset()
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 将行为封装成命令
    let buyCommand = CommandBuilder.buildCommand(new BuyAction())
    let sellCommand = CommandBuilder.buildCommand(new SellAction())
    // 接受并执行命令
    let commandInvoker = new CommandInvoker()
    commandInvoker
    .accept(buyCommand, sellCommand)
    .accept(buyCommand, sellCommand)
    .run()
})