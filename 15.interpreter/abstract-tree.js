// 语法类型SyntacticType
class ASTNodeSyType {
    static E = 'E'
    static A = 'A'
    static O = 'O'
    static T = 'T'
}

// 语义类型SemanticType
class ASTNodeSeType {
    static END = 'end'
    static NUMBER = 'number'
    static OPERATOR = 'operator'
    static OPERATOR_NUMBER = 'operator_number'
    static TYPE_ERROR = 'type_error'
}

class ASTNode {
    constructor ({
        ptr,
        syType,
        seType
    }) {
        this.ptr = ptr
        this.syType = syType
        this.seType = seType
    }
}

export {
    ASTNode,
    ASTNodeSyType,
    ASTNodeSeType
}