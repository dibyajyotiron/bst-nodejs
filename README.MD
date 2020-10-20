# bst-nodejs v0.0.132

A Library for BST built with Javascript

**Github:**<br>
[Github Project Link](https://github.com/dibyajyotiron/bst-nodejs)<br>
Feel free to modify the code and create pr if you find any bugs or want to implement new methods or add docs.

## Installation

Using npm:

```shell
$ npm i --save bst-nodejs
```

In Node.js:

```js
// Load the BST build.
var { BST, LinkedList, Node } = require("bst-nodejs");

// Load method categories.
To use this, first instantiate a binary search tree.
const tree = new BST();
let treeNodes = [10, 5, 13, 2, 6, 11, 16, 9, 32, 33, 31, 0];
for (const node of treeNodes) {
	tree.insert(node);
}
The following tree will be created.
/**
 *
 * A Sample Binary Search Tree:
 *
 *             10
 *            /  \
 *           5    13
 *          / \   / \
 *         2   6 11  16
 *        /     \      \
 *       0       9     32
 *                    /  \
 *                   31  33
 *
 */

```

Tree Structure:<br>
So, the BST consists of Tree Nodes called `Node`, they're structured like this:

```
class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}
```

The object Structure is:

```json
{
	"root": {
		"val": 10,
		"left": {
			"val": 5,
			"left": { "val": 2, "left": { "val": 0, "left": null, "right": null }, "right": null },
			"right": { "val": 6, "left": null, "right": { "val": 9, "left": null, "right": null } }
		},
		"right": {
			"val": 13,
			"left": { "val": 11, "left": null, "right": null },
			"right": { "val": 16, "left": null, "right": { "val": 32, "left": { "val": 31, "left": null, "right": null }, "right": { "val": 33, "left": null, "right": null } } }
		}
	}
}
```

Which means, a tree is an object with it's root being an object with value, left and right where left and right are of Node types, that consists of
value, left and right.

A leaf node is when value exists but left and right is null for that node.

**Note:**<br>
If you want to use this BST as a regular Binary Tree, that is also possible. For that, you've to create the tree in this manner, instead of using the regular
insert method.

```js
const tree = new BST();
tree.root = new Node(1);
tree.root.left = new Node(2);
tree.root.left.left = new Node(3);
tree.root.right = new Node(4);
tree.root.right.left = new Node(5);
tree.root.right.right = new Node(6);
tree.root.right.right.left = new Node(7);
tree.root.right.right.left.left = new Node(8);
tree.root.right.right.left.left.left = new Node(9);
```

To know what all methods are supported, use `tree.getAllMethods()`.
This gives a list of all the methods possible. All the BFS, DFS methods are accessible via Traversal method, by passing the available options,
since this is a side project, while using traversal methods, make sure to chose correct combination, otherwise it breaks.
Also, it's by no means a production grade system, using in production for large dataset is not recommended at all.

Supported Methods list:

```
insert
search
bstToGst
mergeTwoTrees
getValue
maxDepth
closestValueBT
closestValueBST
invertTree
leafNodes
leafNodesSum
countNodes
sameElement
lowestCommonAncestorBST
lowestCommonAncestorBT
checkNodeExistsBT
maxWidth
longest_consecutive_sequence
printView
maxLevelSum
toSumTree
Traversal(this has all the traversing methods)
diameterByNodes
diameterByEdges
diameter
isBST
isBSTOptimized
noSibling
isEqual
isMirror
isSymmetric
heightBalanced
heightBalancedOptimized
printKeysInRange
checkSubtree
bstFromBFS
constructTreeInPre
constructTreeFromPre
rootToLeafPath
rootToLeafSum
maximumBinaryTree
inOrderSuccessor
sortedListToBST
sortedArrayToBST
verticalSum
maxPathSum
bottomView
topView
isSubPath
```

Some of the methods are already documented using jsdoc. It's a work in progress, consists of most important tree/bst questions.
Will be updating this overtime, and testing is done by submitting code in leetcode and gfg practice, which helps determining code correctness.
