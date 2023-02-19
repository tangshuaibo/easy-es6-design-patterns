1. BNF语法描述
* <表达式> ::= <数字>{(+|-)<数字>}
* <expression> ::= <number>{<operator><number>}
* E ➡ n{(+|-)n}

2. 基础文法
* E ➡ nA
* A ➡ {On}
* O ➡ +|-

3. 基础文法拆分
* E ➡ nA
* A ➡ OnA
* A ➡ ε
* O ➡ +
* O ➡ -

4. 求得推出ε的非终结符
| 非终结符 | E | A | O |
| ---- | ---- | ---- |
| 初值 | 未定 | 未定 | 未定 |
| 第一次扫描 | 否 | 是 | 否 |

5. 计算FIRST集
* FIRST(E) = FIRST(nA) = {n}
* FIRST(A) = FIRST(OnA) ∪ FIRST(ε) = FIRST(O) ∪ {ε} = {+,-,ε}
* FIRST(O) = FIRST(+) ∪ FIRST(-)= {+,-}

6. 计算FOLLOW集
* FOLLOW(E) = FOLLOW(A) = {#}
* FOLLOW(A) = FOLLOW(A) ∪ FOLLOW(ε) = {#}
* FOLLOW(O) = FOLLOW(+) ∪ FOLLOW(-) ∪ FIRST(n) = {n, #}

7. 计算SELECT集
* SELECT(E➡nA) = FIRST(nA) = {n}
* SELECT(A➡OnA) = FIRST(OnA) = FIRST(O) = {+,-}
* SELECT(A➡ε) = (FIRST(ε) - {ε}) ∪ FOLLOW(A) = {#}
* SELECT(O➡+) = FIRST(+) = {+}
* SELECT(O➡-) = FIRST(-) = {-}

8. L-翻译模式及生成抽象语法树
* E ➡ nA {E.ptr = [token(n), A.ptr]}
* A ➡ OnA₁ {A.ptr = [O.ptr, token(n), A₁.ptr]}
* A ➡ ε {A.ptr = token(end)}
* O ➡ + {O.ptr = token(+)}
* O ➡ - {O.ptr = token(-)}

9. 静态语义分析（类型检查）
* E ➡ nA {E.type = (n.type === number && A.type === operator_number) ? number : type_error}
* A ➡ OnA₁ {A.type = (O.type === operator && n.type === number && A₁.type === (operator_number || end)) ? operator_number : type_error}
* A ➡ ε {A.type = end}
* O ➡ + {O.type = operator}
* O ➡ - {O.type = operator}