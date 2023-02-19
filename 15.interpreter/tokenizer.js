import { State, StateType, StateManager, StateMachine} from './state-machine.js'
import { MyConsole } from './my-console.js'

class Symbols {
    static DOT = '.' 
    static PLUS = '+'
    static MINUS = '-'
    static SPACE = ' '

    static Blanks = new Set([this.SPACE])
    static Operators = new Set([this.PLUS, this.MINUS])
    static Digits = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
}

class TokenType {
    static INVALID = 'invalid'
    static NUMBER = 'number'
    static OPERATOR = 'operator'
}

class Token {
    constructor ({
        type,
        value,
        index = {
            start: undefined,
            end: undefined
        }
    }) {
        this.type = type
        this.value = value
        this.index = index
    }
}

class Tokenizer {
    #text
    #index
    #char
    #tokenType
    #tokenValue
    #myConsole
    #stateManager = new StateManager()
    #stateMachine = new StateMachine()

    constructor ({text, cLevel = 2}) {
        if (typeof text !== 'string') {
            throw new TypeError('Tokenizer: Text input must be string.')
        }
        this.#text = text
        this.#index = 0
        this.#myConsole = new MyConsole(cLevel)
        this.#createStates()
    }

    #createStates () {
        const stateS = new State('S',
            StateType.INITIAL, () => {
                this.#myConsole.debug('This is state S.')
            }, () => {
                if (Symbols.Blanks.has(this.#char)) {
                    return this.#stateManager.get('S')
                }
                if (Symbols.Operators.has(this.#char)) {
                    return this.#stateManager.get('1')
                }
                if (Symbols.Digits.has(this.#char)) {
                    return this.#stateManager.get('2')
                }
                if (undefined === this.#char) {
                    return this.#stateManager.get('T3')
                }
                return this.#stateManager.get('4')
            })
        const state1 = new State('1',
            StateType.INTERMEDIATE, () => {
                this.#myConsole.debug('This is state 1.')
            }, () => {
                if (Symbols.Operators.has(this.#char) ||
                    Symbols.Blanks.has(this.#char)) {
                    return this.#stateManager.get('1')
                }
                return this.#stateManager.get('T1')
            })
        const state2 = new State('2',
            StateType.INTERMEDIATE, () => {
                this.#myConsole.debug('This is state 2.')
            }, () => {
                if (Symbols.Digits.has(this.#char)) {
                    return this.#stateManager.get('2')
                }
                if (Symbols.Blanks.has(this.#char) ||
                    Symbols.Operators.has(this.#char) ||
                    undefined === this.#char) {
                    return this.#stateManager.get('T2')
                }
                if (Symbols.DOT === this.#char) {
                    return this.#stateManager.get('3')
                }
                return this.#stateManager.get('5')
            })
        const state3 = new State('3',
            StateType.INTERMEDIATE, () => {
                this.#myConsole.debug('This is state 3.')
            }, () => {
                if (Symbols.Digits.has(this.#char)) {
                    return this.#stateManager.get('3')
                }
                if (Symbols.Blanks.has(this.#char) ||
                    Symbols.Operators.has(this.#char) ||
                    undefined === this.#char) {
                    return this.#stateManager.get('T2')
                }
                return this.#stateManager.get('4')
            })
        const state4 = new State('4',
            StateType.INTERMEDIATE, () => {
                this.#myConsole.debug('This is state 4.')
            }, () => {
                if (Symbols.Blanks.has(this.#char) ||
                    Symbols.Operators.has(this.#char) ||
                    undefined === this.#char) {
                    return this.#stateManager.get('T3')
                }
                return this.#stateManager.get('4')
            })
        const state5 = new State('5',
            StateType.INTERMEDIATE, () => {
                this.#myConsole.debug('This is state 5.')
            }, () => {
                if (Symbols.Blanks.has(this.#char) ||
                    Symbols.Operators.has(this.#char) ||
                    undefined === this.#char) {
                    return this.#stateManager.get('T3')
                }
                return this.#stateManager.get('5')
            })
        const stateT1 = new State('T1',
            StateType.FINAL, () => {
                this.#myConsole.debug('This is state T1.')
            })
        const stateT2 = new State('T2',
            StateType.FINAL, () => {
                this.#myConsole.debug('This is state T2.')
            })
        const stateT3 = new State('T3',
            StateType.FINAL, () => {
                this.#myConsole.debug('This is state T3.')
            })
        this.#stateManager.add([
            stateS,
            state1,
            state2,
            state3,
            state4,
            state5,
            stateT1,
            stateT2,
            stateT3
        ])
    }
    
    resetTokenizer () {
        this.#text = undefined
        this.#index = 0
        return this
    }

    #getChar () {
        this.#char = this.#text[this.#index]
    }

    #updateIndex () {
        this.#index++
    }

    #setTokenType (type) {
        this.#tokenType = type
    }

    #updateTokenValue () {
        if (Symbols.Blanks.has(this.#char) ||
            undefined === this.#char) {
            return
        }
        this.#tokenValue = this.#tokenValue ?
            this.#tokenValue + this.#char :
            this.#char
    }

    #resetToken () {
        this.#tokenType = undefined
        this.#tokenValue = undefined
    }
    
    getToken () {
        this.#resetToken()
        this.#stateMachine.run(this.#stateManager.get('S'), {
            beforeStart: () => {
                this.#getChar()
                this.#myConsole.debug(`1.beforeStart:`)
                this.#myConsole.debug(`states: {current: '${undefined}', next: '${undefined}'}`)
                this.#myConsole.debug(`token-value: {char: '${this.#char}', tokenValue: '${this.#tokenValue}'}`)
            },
            started: (current, next) => {
                if (!next.isFinal()) {
                    this.#updateTokenValue()
                    this.#updateIndex()
                }
                this.#myConsole.debug(`2.started:`)
                this.#myConsole.debug(`states: {current: '${current.getId()}', next: '${next.getId()}'}`)
                this.#myConsole.debug(`token-value: {char: '${this.#char}', tokenValue: '${this.#tokenValue}'}`)
                this.#myConsole.debug(`-----------------------------------------------------------------------`)
            },
            beforeUpdate: (current, next) => {
                if (!current.isFinal()) {
                    this.#getChar()
                }
                this.#myConsole.debug(`3.beforeUpdate:`)
                this.#myConsole.debug(`states: {current: '${current.getId()}', next: '${next.getId()}'}`)
                this.#myConsole.debug(`token-value: {char: '${this.#char}', tokenValue: '${this.#tokenValue}'}`)
            },
            updated: (current, next) => {
                if (!current.isFinal() && !next?.isFinal()) {
                    this.#updateTokenValue()
                    this.#updateIndex()
                }
                this.#myConsole.debug(`4.updated:`)
                this.#myConsole.debug(`states: {current: '${current.getId()}', next: '${next?.getId()}'}`)
                this.#myConsole.debug(`token-value: {char: '${this.#char}', tokenValue: '${this.#tokenValue}'}`)
                this.#myConsole.debug(`-----------------------------------------------------------------------`)
            },
            beforeStop: (current, next) => {
                this.#myConsole.debug(`5.beforeStop:`)
                this.#myConsole.debug(`states: {current: '${current.getId()}', next: '${next?.getId()}'}`)
                this.#myConsole.debug(`token-value: {char: '${this.#char}', tokenValue: '${this.#tokenValue}'}`)
                const currentId = current.getId()
                switch (currentId) {
                    case 'T1':
                        this.#setTokenType(TokenType.OPERATOR)
                        break
                    case 'T2':
                        this.#setTokenType(TokenType.NUMBER)
                        break
                    case 'T3':
                        this.#setTokenType(TokenType.INVALID)
                        break
                    default:
                        throw new RangeError(`Unknown final state ${currentId}.`)
                }
            },
            stopped: () => {
                this.#myConsole.debug(`6.stopped:`)
                this.#myConsole.debug(`states: {current: '${undefined}', next: '${undefined}'}`)
                this.#myConsole.debug(`token-value: {char: '${this.#char}', tokenValue: '${this.#tokenValue}'}`)
                this.#myConsole.debug(`-----------------------------------------------------------------------`)
                this.#myConsole.debug('State machine stopped.')
            }
        })
        return new Token({
            type: this.#tokenType,
            value: this.#tokenValue,
            index: {
                start: this.#index - (this.#tokenValue?.length || 0),
                end: this.#index
            }
        })
    }
}

export {
    Symbols,
    TokenType,
    Token,
    Tokenizer
}