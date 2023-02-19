import { ASTNode, ASTNodeSyType, ASTNodeSeType } from "./abstract-tree.js"
import { TokenType } from "./tokenizer.js"
import { MyConsole } from './my-console.js'

class TypeChecker {
    #ast
    #myConsole
    #errors = []
    
    constructor ({ast, cLevel = 2}) {
        if (!(ast instanceof ASTNode)) {
            throw new TypeError(`Argument ast must be ASTNode.`)
        }
        this.#ast = ast
        this.#myConsole = new MyConsole(cLevel)
    }

    #updateErrors ({checkerId, astNode, errMsg}) {
        this.#errors.push({
            checkerId,
            astNode,
            errMsg
        })
        this.#myConsole.error(`[${checkerId}] [AstNode: %o] `, astNode, ...errMsg)
    }

    check () {
        const result = {
            errs: this.#errors,
            ast: this.#calcSeTypeE(this.#ast)
        }
        this.#myConsole.debug('Type checking completed.')
        return result
    }

    #calcSeTypeE (astNodeE) {
        // 检查语法类型
        if (astNodeE?.syType !== ASTNodeSyType.E) {
            this.#updateErrors({
                checkerId: 'CheckerE',
                astNode: astNodeE,
                errMsg: [
                    `This ast node is not E.`
                ]
            })
            astNodeE.seType = ASTNodeSeType.TYPE_ERROR
            return astNodeE
        }
        // 节点类型非T报错
        const astNodeT = this.#calcSeTypeT(astNodeE.ptr[0])
        const astNodeA = this.#calcSeTypeA(astNodeE.ptr[1])
        astNodeE.seType =
            astNodeT.seType === ASTNodeSeType.NUMBER &&
            astNodeA.seType === ASTNodeSeType.OPERATOR_NUMBER ?
                ASTNodeSeType.NUMBER :
                ASTNodeSeType.TYPE_ERROR
        if (astNodeE.seType === ASTNodeSeType.TYPE_ERROR) {
            this.#updateErrors({
                checkerId: 'CheckerE',
                astNode: astNodeE,
                errMsg: [
                    `Semantic type is not number.`
                ]
            })
        }
        return astNodeE
    }

    #calcSeTypeA (astNodeA) {
        // 检查语法类型
        if (astNodeA?.syType !== ASTNodeSyType.A) {
            this.#updateErrors({
                checkerId: 'CheckerA',
                astNode: astNodeA,
                errMsg: [
                    `Syntactic type is not A.`
                ]
            })
            astNodeA.seType = ASTNodeSeType.TYPE_ERROR
            return astNodeA
        }
        // 计算语义类型
        if (astNodeA.ptr[0].syType === ASTNodeSyType.T) {
            const astNodeT = this.#calcSeTypeT(astNodeA.ptr[0])
            astNodeA.seType =
                astNodeT.seType === ASTNodeSeType.END ?
                    ASTNodeSeType.END :
                    ASTNodeSeType.TYPE_ERROR
            if (astNodeA.seType === ASTNodeSeType.TYPE_ERROR) {
                this.#updateErrors({
                    checkerId: 'CheckerA',
                    astNode: astNodeA,
                    errMsg: [
                        `Semantic type is not operator_number.`
                    ]
                })
            }
            return astNodeA
        }
        const astNodeO = this.#calcSeTypeO(astNodeA.ptr[0])
        const astNodeT = this.#calcSeTypeT(astNodeA.ptr[1])
        const astNodeA1 = this.#calcSeTypeA(astNodeA.ptr[2])
        astNodeA.seType = 
            astNodeO.seType === ASTNodeSeType.OPERATOR &&
            astNodeT.seType === ASTNodeSeType.NUMBER &&
            (astNodeA1.seType === ASTNodeSeType.OPERATOR_NUMBER ||
            astNodeA1.seType === ASTNodeSeType.END) ?
                ASTNodeSeType.OPERATOR_NUMBER :
                ASTNodeSeType.TYPE_ERROR
        if (astNodeA.seType === ASTNodeSeType.TYPE_ERROR) {
            this.#updateErrors({
                checkerId: 'CheckerA',
                astNode: astNodeA,
                errMsg: [
                    `Semantic type is not operator_number.`
                ]
            })
        }
        return astNodeA
    }

    #calcSeTypeO (astNodeO) {
        // 检查语法类型
        if (astNodeO?.syType !== ASTNodeSyType.O) {
            this.#updateErrors({
                checkerId: 'CheckerO',
                astNode: astNodeO,
                errMsg: [
                    `Syntactic type is not O.`
                ]
            })
            astNodeO.seType = ASTNodeSeType.TYPE_ERROR
            return astNodeO
        }
        // 计算语义类型
        const astNodeT = this.#calcSeTypeT(astNodeO.ptr[0])
        astNodeO.seType =
            astNodeT.seType === ASTNodeSeType.OPERATOR ?
                ASTNodeSeType.OPERATOR :
                ASTNodeSeType.TYPE_ERROR
        if (astNodeO.seType === ASTNodeSeType.TYPE_ERROR) {
            this.#updateErrors({
                checkerId: 'CheckerO',
                astNode: astNodeO,
                errMsg: [
                    `Semantic type is not operator.`
                ]
            })
        }
        return astNodeO
    }

    #calcSeTypeT (astNodeT) {
        // 检查语法类型
        // 节点类型非T报错
        if (astNodeT?.syType !== ASTNodeSyType.T) {
            this.#updateErrors({
                checkerId: 'CheckerT',
                astNode: astNodeT,
                errMsg: [
                    `Syntactic type is not T.`
                ]
            })
            astNodeT.seType = ASTNodeSeType.TYPE_ERROR
            return astNodeT
        }
        // 计算语义类型
        const token = astNodeT.ptr
        switch (token.type) {
            case TokenType.INVALID:
                astNodeT.seType =
                    token.value === undefined ? 
                        ASTNodeSeType.END :
                        ASTNodeSeType.TYPE_ERROR
                break
            case TokenType.NUMBER:
                astNodeT.seType = ASTNodeSeType.NUMBER
                break
            case TokenType.OPERATOR:
                astNodeT.seType = ASTNodeSeType.OPERATOR
                break
            default:
                astNodeT.seType = ASTNodeSeType.TYPE_ERROR
                break
        }
        if (astNodeT.seType === ASTNodeSeType.TYPE_ERROR) {
            this.#updateErrors({
                checkerId: 'CheckerT',
                astNode: astNodeT,
                errMsg: [
                    `Semantic type is not number or operator.`
                ]
            })
        }
        return astNodeT
    }
}

export {
    TypeChecker
}