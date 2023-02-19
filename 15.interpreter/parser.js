import { Tokenizer, TokenType } from "./tokenizer.js"
import { ASTNode, ASTNodeSyType } from "./abstract-tree.js"
import { MyConsole } from "./my-console.js"

class Parser {
    #token
    #tokenizer
    #myConsole
    #errors = []

    constructor ({tokenizer, cLevel = 2}) {
        if (!(tokenizer instanceof Tokenizer)) {
            throw new TypeError(`Invalid tokenizer.`)
        }
        this.#tokenizer = tokenizer
        this.#myConsole = new MyConsole(cLevel)
    }

    parse () {
        this.#updateToken()
        const astNodeE = this.#parseE()
        this.#myConsole.debug(`Parsing completed.`)
        return {
            errs: this.#errors,
            ast: astNodeE
        }
    }

    reset () {
        this.#tokenizer = undefined
    }

    #updateToken () {
        this.#token = this.#tokenizer.getToken()
        this.#myConsole.debug(`Current token: %o`, this.#token)
    }

    #updateErrors ({parserId, token, errMsg}) {
        this.#errors.push({
            parserId,
            token,
            errMsg
        })
        this.#myConsole.error(`[${parserId}] [Token: %o] `, token, ...errMsg)
    }

    #parseE () {
        // 判断是否是开始符
        if (this.#token.type !== TokenType.NUMBER) {
            // 非开始符则报错
            this.#updateErrors({
                parserId: 'ParserE',
                token: this.#token,
                errMsg: [
                    `Current token is not begin symbol.`
                ]
            })
            // 找到开始符
            while (this.#token.type !== TokenType.NUMBER) {
                this.#updateToken()
                // 遇到结束符直接退出
                if (this.#token.value === undefined) {
                    const astNodeT = new ASTNode({
                        ptr: this.#token,
                        syType: ASTNodeSyType.T
                    })
                    return new ASTNode({
                        ptr: [
                            astNodeT
                        ],
                        syType: ASTNodeSyType.E
                    })
                }
            }
        }
        const astNodeT = new ASTNode({
            ptr: this.#token,
            syType: ASTNodeSyType.T
        })
        // 找到开始符，进入语法分析程序A
        this.#updateToken()
        const astNodeA = this.#parseA()
        // 判断是否是结束符
        if (this.#token.value !== undefined) {
            // 非结束符则报错
            this.#updateErrors({
                parserId: 'ParserE',
                token: this.#token,
                errMsg: [
                    `Current token is not end symbol.`
                ]
            })
            // 找到结束符
            while (this.#token.value !== undefined) {
                this.#updateToken()
                // 遇到开始符进入语法分析过程E
                if (this.#token.type === TokenType.NUMBER) {
                    const astNodeE1 = this.#parseE()
                    return new ASTNode({
                        ptr: [
                            astNodeT,
                            astNodeA,
                            astNodeE1
                        ],
                        syType: ASTNodeSyType.E
                    })
                }
            }
        }
        // 找到结束符直接退出
        return new ASTNode({
            ptr: [
                astNodeT,
                astNodeA
            ],
            syType: ASTNodeSyType.E
        })
    }

    #parseA () {
        // SELECT(A➡ε)
        // 遇到结束符，直接退出
        if (this.#token.value === undefined) {
            const astNodeT = new ASTNode({
                ptr: this.#token,
                syType: ASTNodeSyType.T
            })
            return new ASTNode({
                ptr: [
                    astNodeT
                ],
                syType: ASTNodeSyType.A
            })
        }
        // SELECT(A➡OnA)
        // 判断是否是开始符
        if (this.#token.type !== TokenType.OPERATOR) {
            // 非开始符报错
            this.#updateErrors({
                parserId: 'ParserA',
                token: this.#token,
                errMsg: [
                    `Current token is not begin symbol.`
                ]
            })
            // 找到开始符
            while (this.#token.type !== TokenType.OPERATOR) {
                this.#updateToken()
                // 遇到结束符直接退出
                if (this.#token.value === undefined) {
                    const astNodeT = new ASTNode({
                        ptr: this.#token,
                        syType: ASTNodeSyType.T
                    })
                    return new ASTNode({
                        ptr: [
                            astNodeT
                        ],
                        syType: ASTNodeSyType.A
                    })
                }
            }
        }
        // 找到开始符后，进入语法分析过程O
        const astNodeO = this.#parseO()
        // 语法分析过程O结束后，匹配数字
        if (this.#token.type !== TokenType.NUMBER) {
            // 非数字则报错
            this.#updateErrors({
                parserId: 'ParserA',
                token: this.#token,
                errMsg: [
                    `Current token is not number.`
                ]
            })
            // 不为数字，必为终结符#
            const astNodeT = new ASTNode({
                ptr: this.#token,
                syType: ASTNodeSyType.T
            })
            return new ASTNode({
                ptr: [
                    astNodeO,
                    astNodeT
                ],
                syType: ASTNodeSyType.A
            })
        }
        // 匹配数字成功
        const astNodeT = new ASTNode({
            ptr: this.#token,
            syType: ASTNodeSyType.T
        })
        // 循环进入语法分析过程A
        this.#updateToken()
        const astNodeA1 = this.#parseA()
        // 返回ast节点
        return new ASTNode({
            ptr: [
                astNodeO,
                astNodeT,
                astNodeA1
            ],
            syType: ASTNodeSyType.A
        })
    }

    #parseO () {
        // 判断是否是开始符
        if (this.#token.type !== TokenType.OPERATOR) {
            // 非开始符则报错
            this.#updateErrors({
                parserId: 'ParserO',
                token: this.#token,
                errMsg: [
                    `Current token is not begin symbol.`
                ]
            })
            // 找到开始符
            while (this.#token.type !== TokenType.OPERATOR) {
                this.#updateToken()
                // 遇到结束符直接退出
                if (this.#token.value === undefined ||
                    this.#token.type === TokenType.NUMBER) {
                    const astNodeT = new ASTNode({
                        ptr: this.#token,
                        syType: ASTNodeSyType.T
                    })
                    return new ASTNode({
                        ptr: [
                            astNodeT
                        ],
                        syType: ASTNodeSyType.O
                    })
                }
            }
        }
        // 开始符即为操作符，直接判断是否是结束符
        const astNodeT = new ASTNode({
            ptr: this.#token,
            syType: ASTNodeSyType.T
        })
        this.#updateToken()
        if (this.#token.value !== undefined &&
            this.#token.type !== TokenType.NUMBER) {
            // 非结束符报错
            this.#updateErrors({
                parserId: 'ParserO',
                token: this.#token,
                errMsg: [
                    `Current token is not end symbol.`
                ]
            })
            // 找到结束符
            while (this.#token.value !== undefined &&
                this.#token.type !== TokenType.NUMBER) {
                this.#updateToken()
                // 遇到开始符进入语法分析过程O
                if (this.#token.type === TokenType.OPERATOR) {
                    const astNodeO = this.#parseO()
                    return new ASTNode({
                        ptr: [
                            astNodeT,
                            astNodeO
                        ],
                        syType: ASTNodeSyType.O
                    })
                }
            }
        }
        // 遇到结束符则退出
        return new ASTNode({
            ptr: [
                astNodeT
            ],
            syType: ASTNodeSyType.O
        })
    }
}

export {
    Parser
}