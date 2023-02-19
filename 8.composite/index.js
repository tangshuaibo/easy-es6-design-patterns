/**
 * 节点之间构成树的关系
 */

class TreeNode {
    constructor (id) {
        this.symbol = Symbol.for(id)
        this.childNodes = new Map()
    }

    addNode (node) {
        this.childNodes.set(node.symbol, node)
        return this
    }

    removeNode (node) {
        this.childNodes.delete(node.symbol)
        return this
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    const node1 = new TreeNode(1)
    const node2 = new TreeNode(2)
    const node3 = new TreeNode(3)
    const node4 = new TreeNode(4)
    const node5 = new TreeNode(5)
    node1.addNode(node2).addNode(node3)
    node2.addNode(node4).addNode(node5)
    console.log(node1)
})