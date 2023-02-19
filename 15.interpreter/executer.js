import { ASTNodeSeType } from "./abstract-tree.js"
import { MyConsole } from "./my-console.js"

class Executer {
    #ast
    #myConsole

    constructor ({
        ast,
        cLevel = 2
    }) {
        this.#ast = ast
        this.#myConsole = new MyConsole(cLevel)
    }

    execute () {
        const result = this.#calcE(this.#ast)
        this.#myConsole.debug(`Execution completed.`)
        return result
    }
    
    #calcE (astNodeE) {
        let res = this.#calcT(astNodeE.ptr[0])
        let valA = this.#calcA(astNodeE.ptr[1])
        while (valA) {
            res = valA[0] === '+' ? res + valA[1] : res - valA[1]
            valA = valA[2]
        }
        return res
    }

    #calcA (astNodeA) {
        if (astNodeA.ptr[0].seType === ASTNodeSeType.END) {
            return undefined
        }
        const valO = this.#calcO(astNodeA.ptr[0])
        const valT = this.#calcT(astNodeA.ptr[1])
        const valA1 = this.#calcA(astNodeA.ptr[2])
        return [
            valO,
            valT,
            valA1
        ]
    }

    #calcO (astNodeO) {
        return this.#calcT(astNodeO.ptr[0])
    }

    #calcT (astNodeT) {
        switch (astNodeT.seType) {
            case ASTNodeSeType.END:
                return 0
            case ASTNodeSeType.NUMBER:
                return Number(astNodeT.ptr.value)
            case ASTNodeSeType.OPERATOR:
                const op = astNodeT.ptr.value
                let flag = 1
                for (let i = 0; i < op.length; i++) {
                    if (op[i] === '-') {
                        flag *= -1
                    }
                }
                return flag<0 ? '-' : '+'
            default:
                this.#myConsole.error(`[Executer] [AstNodeT: %o] Invalid semantic type.`, astNodeT)
                return undefined
        }
    }
}

export {
    Executer
}