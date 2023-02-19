/**
 * 传统编译器工作流程：词法分析、语法分析、语义分析、中间代码生成、代码优化、目标代码生成；
 * 静态预编译器AOT只负责转换代码，不会真正执行代码的逻辑；
 * 狭义的解释器不转换源代码，不生成中间代码，会边解释边执行源代码的逻辑；
 * 即时编译器JIT会实时将源码翻译为中间代码供侠义解释器使用，亦称动态编译器；
 * 解释器缺点是每次运行都需要翻译源码，优点是更易发现和追踪错误;
 * 广义的解释器由即时编译器与侠义解释器构成，也称为虚拟机。
 */

// 根据《编译原理》选择：DFA、LL(1)文法、递归下降语法分析、短语层恢复、多遍AST、无符号表、L-翻译模式自顶向下的静态语义类型检查、无代码优化
// 然而算法优先分析比LL(1)分析更适合数学表达式，本例偷懒于是选用LL(1)分析
// 一起来写个简单的解释器：https://www.zhihu.com/people/kaka-37-58/posts
// JavaScript黑科技：实现一个AST解释器：https://baijiahao.baidu.com/s?id=1730360302573231645
import { Tokenizer } from "./tokenizer.js"
import { Parser } from "./parser.js"
import { TypeChecker } from "./type-checker.js"
import { Executer } from "./executer.js"

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // const text = '       +12.2333 - 345 + -6789.00 ++ --.a.b.c '
    /**
     * 分词过程测试
     */
    // const tokenizer = new Tokenizer({text, cLevel: 0})
    // console.log(`%cToken: %o`, `color: green;`, tokenizer.getToken())
    // console.log(`%c-----------------------------------------------------------------------`, `color: red;`)
    // console.log(`%cToken: %o`, `color: green;`, tokenizer.getToken())
    // console.log(`%c-----------------------------------------------------------------------`, `color: red;`)
    // console.log(`%cToken: %o`, `color: green;`, tokenizer.getToken())
    // console.log(`%c-----------------------------------------------------------------------`, `color: red;`)
    // console.log(`%cToken: %o`, `color: green;`, tokenizer.getToken())
    // console.log(`%c-----------------------------------------------------------------------`, `color: red;`)
    // console.log(`%cToken: %o`, `color: green;`, tokenizer.getToken())
    // console.log(`%c-----------------------------------------------------------------------`, `color: red;`)
    // console.log(`%cToken: %o`, `color: green;`, tokenizer.getToken())
    // console.log(`%c-----------------------------------------------------------------------`, `color: red;`)
    // console.log(`%cToken: %o`, `color: green;`, tokenizer.getToken())
    // console.log(`%c-----------------------------------------------------------------------`, `color: red;`)
    // console.log(`%cToken: %o`, `color: green;`, tokenizer.getToken())
    // console.log(`%c-----------------------------------------------------------------------`, `color: red;`)
    // console.log(`%cToken: %o`, `color: green;`, tokenizer.getToken())
    // console.log(`%c-----------------------------------------------------------------------`, `color: red;`)
    // console.log(`%cToken: %o`, `color: green;`, tokenizer.getToken())
    // console.log(`%c-----------------------------------------------------------------------`, `color: red;`)
    // console.log(`%cToken: %o`, `color: green;`, tokenizer.getToken())
    // console.log(`%c-----------------------------------------------------------------------`, `color: red;`)
    /**
     * 语法解析过程测试
     */
    // const text = '1+2p++--3--'
    const text = '1+2--3+++4'
    // 语法分析
    const parserResult = new Parser({
        tokenizer: new Tokenizer({text}), 
        cLevel: 1
    }).parse()
    console.log(`[Parser] Errors: %o`, parserResult.errs)
    console.log(`[Parser] AST: %o`, parserResult.ast)
    // 静态语义分析
    if (parserResult.errs.length>=1) return
    const typeCheckerResult = new TypeChecker({
        ast: parserResult.ast,
        cLevel: 1
    }).check()
    console.log(`[TypeChecker] Errors: %o`, typeCheckerResult.errs)
    console.log(`[TypeChecker] AST: %o`, typeCheckerResult.ast)
    // 执行
    if (typeCheckerResult.errs.length>=1) return
    const executerResult = new Executer({
        ast: typeCheckerResult.ast,
        cLevel: 1
    }).execute()
    console.log(`[Executer] Result: ${executerResult}`)
})