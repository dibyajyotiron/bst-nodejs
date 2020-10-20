class Node {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

class ListNode {
	constructor(data) {
		this.val = data;
		this.next = null;
	}
}
class LinkedList {
	constructor() {
		this.head = null;
	}
	append(data) {
		let current = this.head;
		let newNode = new ListNode(data);
		if (!current) this.head = newNode;
		else {
			while (current.next) {
				current = current.next;
			}
			current.next = newNode;
		}
		return this;
	}
	appendFromArr(arr = []) {
		for (const el of arr) {
			this.append(el);
		}
		return this;
	}
}

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
class BST {
	constructor() {
		this.root = null;
	}
	insert(val) {
		const newNode = new Node(val);
		if (!this.root) {
			this.root = newNode;
			return this.root;
		}
		let curr = this.root;
		while (curr) {
			if (val < curr.val) {
				if (!curr.left) curr.left = newNode;
				else curr = curr.left;
			} else if (val > curr.val) {
				if (!curr.right) curr.right = newNode;
				else curr = curr.right;
			} else return this.root;
		}
		return this;
	}
	search(val) {
		if (!this.root) return null;
		let curr = this.root;
		while (curr) {
			if (curr.val === val) return curr;
			else if (val < curr.val) curr = curr.left;
			else if (val > curr.val) curr = curr.right;
		}
		return null;
	}
	/**
	 * reverse in-order traversal
	 */
	bstToGst() {
		let sum = 0;
		(function _gstHelper(node) {
			node.right && _gstHelper(node.right);
			sum += node.val;
			node.val = sum;
			node.left && _gstHelper(node.left);
		})(this.root);
		return this.root;
	}
	mergeTwoTrees(tree2) {
		(function _mergeHelper(tree1, tree2) {
			if (!tree1) return tree2;
			if (!tree2) return tree1;
			tree1.val += tree2.val;
			_mergeHelper(tree1.left, tree2.left);
			_mergeHelper(tree1.right, tree2.right);
		})(this.root, tree2);
		return this.root;
	}
	getValue(type = "min") {
		let side;
		if (type === "min") side = "left";
		if (type === "max") side = "right";
		let res = 0;
		(function _recurHelper(node) {
			node[side] && _recurHelper(node[side]);
			if (!node[side]) res = node.val;
		})(this.root);
		return res;
	}
	maxDepth() {
		return (function _maxDepth(node) {
			if (!node) return 0;
			return 1 + Math.max(_maxDepth(node.left), _maxDepth(node.right));
		})(this.root);
	}
	closestValueBT(target) {
		let closest = Number.MIN_SAFE_INTEGER;
		(function _closestHelper(node, target) {
			node.left && _closestHelper(node.left, target);
			if (Math.abs(target - node.val) < Math.abs(target - closest)) {
				closest = node.val;
			}
			node.right && _closestHelper(node.right, target);
		})(this.root, target, this.root.val);
		return closest;
	}
	closestValueBST(funcType = "recur", target) {
		let funcMap = { recur: _recursive, iter: _iterative };

		function _recursive(node, target, closest) {
			if (!node) return closest;
			if (Math.abs(node.val - target) < Math.abs(closest - target)) closest = node.val;
			if (target > node.val) return _recursive(node.right, target, closest);
			return _recursive(node.left, target, closest);
		}
		function _iterative(node, target, closest) {
			let curr = node;
			while (curr) {
				if (Math.abs(curr.val - target) < Math.abs(closest - target)) closest = curr.val;
				if (target > curr.val) curr = curr.right;
				else curr = curr.left;
			}
			return closest;
		}
		return funcMap[funcType](this.root, target, this.root.val);
	}
	invertTree(funcType = "recur") {
		let funcMap = { recur: _recursive, iter: _iterative };
		function _recursive(node) {
			if (!node) return null;
			let left = _recursive(node.left);
			let right = _recursive(node.right);
			node.left = right;
			node.right = left;
			return node;
		}
		function _iterative(node) {
			let queue = [node];
			while (queue.length) {
				let curr = queue.shift();
				curr.left && queue.push(curr.left);
				curr.right && queue.push(curr.right);
				let temp = curr.left;
				curr.left = curr.right;
				curr.right = temp;
			}
			return node;
		}
		return funcMap[funcType](this.root);
	}
	leafNodes(funcType = "recur") {
		let funcMap = { recur: _recursive, iter: _iterative };
		function _recursive(node, arr = []) {
			node.left && _recursive(node.left, arr);
			if (!node.left && !node.right) arr.push(node.val);
			node.right && _recursive(node.right, arr);
			return arr;
		}
		function _iterative(node, arr = []) {
			let stack = [node];
			while (stack.length) {
				let curr = stack.pop();
				curr.left && stack.push(curr.left);
				curr.right && stack.push(curr.right);
				if (!curr.left && !curr.right) arr.unshift(curr.val);
			}
			return arr;
		}
		return funcMap[funcType](this.root, []);
	}
	leafNodesSum(funcType = "recur") {
		let funcMap = { recur: _recursive, iter: _iterative };
		function _recursive(node, sum) {
			sum = node.left ? _recursive(node.left, sum) : sum;
			if (!node.left && !node.right) sum += node.val;
			sum = node.right ? _recursive(node.right, sum) : sum;
			return sum;
		}
		function _iterative(node, sum) {
			let stack = [node];
			while (stack.length) {
				let curr = stack.pop();
				curr.left && stack.push(curr.left);
				curr.right && stack.push(curr.right);
				if (!curr.left && !curr.right) sum += curr.val;
			}
			return sum;
		}
		return funcMap[funcType](this.root, 0);
	}
	countNodes(funcType = "recur") {
		let funcMap = { recur: _recursive, iter: _iterative };
		function _recursive(node, count) {
			/**
			 * first count is incremented and then recursion happens otherwise
			 * count will be 1 more than actual if it is incremented in the else condition
			 * (... : count + 1) as -> if a node doesn't have left, count increases by 1,
			 * and again if it doesn't have right count will increase 1 more time.
			 */

			count += 1;
			count = node.left ? _recursive(node.left, count) : count;
			count = node.right ? _recursive(node.right, count) : count;
			return count;
		}
		function _iterative(node, count) {
			let stack = [node];
			while (stack.length) {
				let curr = stack.pop();
				count += 1;
				curr.left && stack.push(curr.left);
				curr.right && stack.push(curr.right);
			}
			return count;
		}
		return funcMap[funcType](this.root, 0);
	}
	sameElement(node2) {
		let node1 = this.root;
		if (!node1 || !node2) return false;
		if (node1.val !== node2.val) return false;
		let stack1 = [node1];
		let stack2 = [node2];
		while (stack1.length && stack2.length) {
			let curr1 = stack1.pop();
			let curr2 = stack2.pop();
			if (curr1.val !== curr2.val) return false;
			curr1.left && stack1.push(curr1.left);
			curr1.right && stack1.push(curr1.right);
			curr2.left && stack2.push(curr2.left);
			curr2.right && stack2.push(curr2.right);
		}
		return true;
	}
	lowestCommonAncestorBST(nodeVal1, nodeVal2) {
		return (function _lcaHelper(node) {
			if (node.val < nodeVal1 && node.val < nodeVal2) return _lcaHelper(node.right);
			if (node.val > nodeVal1 && node.val > nodeVal2) return _lcaHelper(node.left);
			return node.val;
		})(this.root);
	}
	lowestCommonAncestorBT(nodeVal1, nodeVal2) {
		return (function _lcaHelper(node) {
			if (!node) return null;
			if (node.val === nodeVal1 || node.val === nodeVal2) return node.val;
			let left = _lcaHelper(node.left);
			let right = _lcaHelper(node.right);
			if (left && right) return node.val;
			if (!left && !right) return null;
			return left ? left : right;
		})(this.root);
	}
	checkNodeExistsBT(val) {
		return (function _checkHelper(node) {
			if (node.val === val) return node;
			let left, right;
			if (node.left) left = _checkHelper(node.left);
			if (node.right) right = _checkHelper(node.right);
			return left || right;
		})(this.root);
	}
	maxWidth() {
		return (function getWidth(node) {
			let queue = [node];
			let max = Number.MIN_SAFE_INTEGER;
			let currC = 0;
			let levelC = 1;
			while (queue.length) {
				let curr = queue.shift();
				if (curr.left) {
					queue.push(curr.left);
					currC++;
				}
				if (curr.right) {
					queue.push(curr.right);
					currC++;
				}
				levelC--;
				if (!levelC) {
					max = currC > max ? currC : max;
					levelC = currC;
					currC = 0;
				}
			}
			return max;
		})(this.root);
	}
	/**
	 * Given a binary tree. Find the length of the longest path which comprises of nodes with consecutive values in increasing order.
	 *
	 * Input :
	 *
	 *           2
	 *          / \
	 *         3   1
	 *        / \
	 *       4   5
	 *
	 * Output : 3
	 *
	 * Explanation: Longest consecutive path is 2 - 3 - 4.
	 *
	 * (time_limit_exceeded for interviewbit submission)
	 */
	longest_consecutive_sequence() {
		if (!this.root) return null;
		let maxSeq = 0;
		(function _longestSeqHelper(node, target, seqLen) {
			if (!node) return null;
			if (node.val === target) seqLen += 1;
			else seqLen = 1;
			maxSeq = Math.max(seqLen, maxSeq);
			_longestSeqHelper(node.left, node.val + 1, seqLen);
			_longestSeqHelper(node.right, node.val + 1, seqLen);
		})(this.root);
		return maxSeq;
	}
	printView(orientation = "left") {
		if (orientation === "top") return this.topView();
		if (orientation === "bottom") return this.bottomView();
		let queue = [this.root];
		let tempArr = [];
		let data = [];
		let levelC = 1;
		let currC = 0;
		while (queue.length) {
			let curr = queue.shift();

			if (curr.left) {
				currC++;
				queue.push(curr.left);
			}
			if (curr.right) {
				currC++;
				queue.push(curr.right);
			}
			levelC--;
			tempArr.push(curr.val);
			if (!levelC) {
				levelC = currC;
				currC = 0;
				data.push(orientation === "left" ? tempArr[0] : tempArr[tempArr.length - 1]);
				tempArr = [];
			}
		}
		return data;
	}
	maxLevelSum() {
		let queue = [this.root];
		let currC = 0;
		let levelC = 1;
		let max = Number.MIN_SAFE_INTEGER;
		let sum = 0;
		while (queue.length) {
			let curr = queue.shift();
			if (curr.left) {
				queue.push(curr.left);
				currC++;
			}
			if (curr.right) {
				queue.push(curr.right);
				currC++;
			}
			levelC--;
			sum += curr.val;
			if (!levelC) {
				levelC = currC;
				currC = 0;
				max = Math.max(max, sum);
				sum = 0;
			}
		}
		return max;
	}
	toSumTree() {
		(function _stHelper(node) {
			if (!node) return 0;
			let oldVal = node.val;
			let left = _stHelper(node.left);
			let right = _stHelper(node.right);
			node.val = left + right;
			return node.val + oldVal;
		})(this.root);
		return JSON.stringify(this.root);
	}
	/**
	 *
	 * @param {('bfs' | 'dfs' | 'vertical' | 'boundary' )} type
	 * @param {('pre' | 'in' | 'post' | 'top' | 'bottom' | 'spiral' | 'zigzag' | 'reverse' | 'default')} approach
	 * @param {('iter' | 'recur')} funcType
	 *
	 * @returns {Node}
	 */
	Traversal(type = "bfs", approach, funcType) {
		let funcMap = {
			bfs: _bfs,
			boundary: _boundary,
			vertical: _vertical,
			dfs: {
				pre: { recur: _dfs_pre, iter: _dfs_pre_iter },
				in: { recur: _dfs_in, iter: _dfs_in_iter },
				post: { recur: _dfs_post, iter: _dfs_post_iter },
			},
			zigzag: _zigzag,
		};
		function _bfs(approach = "top", root) {
			let queue = [root];
			let data = [];
			let levelC = 1;
			let currC = 0;
			let tempArr = [];
			let c = 0;
			while (queue.length) {
				let curr = queue.shift();
				if (curr.left) {
					currC++;
					queue.push(curr.left);
				}
				if (curr.right) {
					currC++;
					queue.push(curr.right);
				}
				tempArr.push(curr.val);
				levelC--;
				if (!levelC) {
					levelC = currC;
					currC = 0;
					switch (approach) {
						case "top":
							data.push(tempArr);
							break;
						case "bottom":
							data.unshift(tempArr);
							break;
						case "default":
							data.push(...tempArr);
							break;
						case "reverse":
							data.unshift(...tempArr);
							break;
					}
					tempArr = [];
				}
			}
			return data;
		}
		function _boundary(node) {
			let data = new Set();
			// traverse the left side;
			(function _left(node) {
				if (!node) return;
				data.add(node.val);
				node.left && _left(node.left);
			})(node);
			// traverse the leaf nodes;
			(function _leaf(node) {
				if (!node) return;
				node.left && _leaf(node.left);
				if (!node.left && !node.right) data.add(node.val);
				node.right && _leaf(node.right);
			})(node);
			// traverse the right side;
			(function _right(node) {
				if (!node) return;
				data.add(node.val);
				node.left && _right(node.left);
			})(node);
			return data;
		}
		/**
		 * The idea is to traverse the tree once and get the minimum and maximum horizontal distance with respect to root. Once we have maximum and minimum distances from root, we iterate for each vertical line at distance minimum to maximum from root, and for each vertical line traverse the tree and print the nodes which lie on that vertical line.
		 * @param {Node} node
		 * @description https://www.geeksforgeeks.org/print-binary-tree-vertical-order/
		 */
		function _vertical(node) {
			let ht = {};
			let res = [];
			function _helper_dfs(node, hd) {
				ht[hd] ? ht[hd].push(node.val) : (ht[hd] = [node.val]);
				node.left && _helper_dfs(node.left, hd - 1);
				node.right && _helper_dfs(node.right, hd + 1);
			}
			_helper_dfs(node, 0);
			for (let key of Object.keys(ht).sort((a, b) => a - b)) {
				res.push(ht[key]);
			}
			return res;
		}
		function _dfs_pre(node) {
			let data = [];
			(function _dfs_helper(node) {
				data.push(node.val);
				node.left && _dfs_helper(node.left);
				node.right && _dfs_helper(node.right);
			})(node);
			return data;
		}
		function _dfs_pre_iter(node) {
			let stack = [node];
			let data = [];
			while (stack.length) {
				let curr = stack.pop();
				data.push(curr.val);
				curr.right && stack.push(curr.right);
				curr.left && stack.push(curr.left);
			}
			return data;
		}
		function _dfs_post(node) {
			let data = [];
			(function _traverse(node) {
				node.left && _traverse(node.left);
				node.right && _traverse(node.right);
				data.push(node.val);
			})(node);
			return data;
		}
		function _dfs_post_iter(node) {
			let stack = [node];
			let data = [];
			while (stack.length) {
				let curr = stack.pop();
				data.unshift(curr.val);
				curr.left && stack.push(curr.left);
				curr.right && stack.push(curr.right);
			}
			return data;
		}
		function _dfs_in_iter(node) {
			let data = [];
			let stack = [];
			while (stack.length || node) {
				if (node) {
					stack.push(node);
					node = node.left;
				} else {
					node = stack.pop();
					data.push(node.val);
					node = node.right;
				}
			}
			return data;
		}
		function _dfs_in(node) {
			let data = [];
			(function _traverse(node) {
				node.left && _traverse(node.left);
				data.push(node.val);
				node.right && _traverse(node.right);
			})(node);
			return data;
		}
		function _zigzag(node) {
			if (!node) return [];
			const queue = [node];
			const data = [];
			let levelC = 1;
			let currC = 0;
			let flag = true;
			let temp = [];
			while (queue.length) {
				const curr = queue.pop();
				if (curr.left) {
					currC++;
					queue.unshift(curr.left);
				}
				if (curr.right) {
					currC++;
					queue.unshift(curr.right);
				}
				if (flag) {
					temp.push(curr.val);
				} else {
					temp.unshift(curr.val);
				}
				levelC--;
				if (!levelC) {
					levelC = currC;
					currC = 0;
					data.push([...temp]);
					temp = [];
					flag = !flag;
				}
			}
			return data;
		}
		if (type === "bfs") {
			if (["zigzag", "spiral"].includes(approach)) {
				return funcMap["zigzag"](this.root);
			}
			return funcMap[type](approach, this.root);
		}
		if (!approach && !funcType) {
			return funcMap[type](this.root);
		}
		if (!funcType) return funcMap[type][approach]["recur"](this.root);
		return funcMap[type][approach][funcType](this.root);
	}
	/**
	 **  The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.
	 ** length of path is number of nodes between two nodes.
	 ** O(n^2) since every node is calling the height recursion.
	 * @returns {number} Returns number of nodes in the longest path as the diameter.
	 */
	diameterByNodes() {
		function getHeight(node) {
			if (!node) return 0;
			return 1 + Math.max(getHeight(node.left), getHeight(node.right));
		}
		return (function _diaHelper(node) {
			if (!node) return null;
			let leftHeight = getHeight(node.left);
			let rightHeight = getHeight(node.right);
			let leftDia = _diaHelper(node.left);
			let rightDia = _diaHelper(node.right);
			return Math.max(Math.max(leftDia, rightDia), 1 + leftHeight + rightHeight);
		})(this.root);
	}
	/**
	 **  The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.
	 ** The length of path between two nodes is represented by the number of edges between them.
	 ** O(n) since we're not calling height recursion with every _dfs recursion.
	 * @returns {number} Returns number of edges in the longest path as the diameter
	 */
	diameterByEdges() {
		let diameter = 0;
		(function _dfs(node) {
			if (!node) return 0;
			let leftDia = _dfs(node.left);
			let rightDia = _dfs(node.right);
			diameter = Math.max(diameter, leftDia + rightDia);
			return 1 + Math.max(leftDia, rightDia);
		})(this.root);
		return diameter;
	}
	diameter() {
		let dia = 0;
		(function _diaHelper(node) {
			if (!node) return 0;
			let leftDia = _diaHelper(node.left);
			let rightDia = _diaHelper(node.right);
			dia = Math.max(dia, leftDia + rightDia);
			return 1 + Math.max(leftDia, rightDia);
		})(this.root);
		return dia;
	}
	/**
	 * This approach uses In Order Traversal and uses the property that a BST will produce a sorted array when done In-order Traversal on it.
	 *
	 * But, this approach is slow.
	 */
	isBST() {
		if (!this.root) return true;
		let lastNode = null;
		let flag = true;
		function _checkHelper(node) {
			flag && node.left && _checkHelper(node.left);
			if (typeof lastNode === "number" && lastNode >= node.val) flag = false;
			lastNode = node.val;
			flag && node.right && _checkHelper(node.right);
		}
		_checkHelper(this.root);
		return flag;
	}

	/**
	 * In this approach, for every child node, we pass in a range within which the value for that child node should fall.
	 */
	isBSTOptimized() {
		if (!this.root) return true;
		let min = Number.MIN_SAFE_INTEGER;
		let max = Number.MAX_SAFE_INTEGER;
		function _checkHelper(node, max, min) {
			if (!node) return true;
			if (node.val >= max || node.val <= min) return false;
			return _checkHelper(node.left, node.val, min) && _checkHelper(node.right, max, node.val);
		}
		return _checkHelper(this.root, max, min);
	}

	/**
	 * if a node has left and right child, left one is a sibling of the right one!
	 * @returns {number[]} Return an array of node values that don't have a sibling
	 */
	noSibling() {
		let data = [];
		(function _siblingHelper(node) {
			if (!node) return;
			if (!node.left && node.right) data.push(node.right.val);
			if (!node.right && node.left) data.push(node.left.val);
			node.left && _siblingHelper(node.left);
			node.right && _siblingHelper(node.right);
		})(this.root);
		return data;
	}
	/**
	 *
	 * @param {BST} tree2
	 * @param {("iter" | "recur")} method
	 * @returns {Boolean}
	 */
	isEqual(tree2, method = "recur") {
		function isEqual(p, q) {
			let queue1 = [p];
			let queue2 = [q];
			if (!p && !q) return true;
			if ((p && !q) || (!p && q)) return false;
			while (queue1.length && queue2.length) {
				let c1 = queue1.pop();
				let c2 = queue2.pop();
				if (c1.val !== c2.val) return false;
				if (c1.left && c2.left) {
					queue1.push(c1.left);
					queue2.push(c2.left);
				}
				if (c1.right && c2.right) {
					queue1.push(c1.right);
					queue2.push(c2.right);
				}
				if (!c1.left && c2.left) return false;
				if (!c1.right && c2.right) return false;
				if (c1.left && !c2.left) return false;
				if (c1.right && !c2.right) return false;
			}
			return true;
		}
		if (method === "iter") {
			return isEqual(this.root, tree2);
		}
		return (function _checkEqual(node1, node2) {
			// and should be on top since, if or is on top and both node1 and node2 are not present
			// it will return false as it matches one of the conditions in or
			if (!node1 && !node2) return true;
			if (!node1 || !node2) return false;
			if (node1.val !== node2.val) return false;
			let isEqualLeft = _checkEqual(node1.left, node2.left);
			let isEqualRight = _checkEqual(node1.right, node2.right);
			return isEqualLeft && isEqualRight;
		})(this.root, tree2);
	}
	isMirror(tree2) {
		return (function _checkEqual(node1, node2) {
			// and should be on top since, if or is on top and both node1 and node2 are not present
			// it will return false as it matches one of the conditions in or
			if (!node1 && !node2) return true;
			if (!node1 || !node2) return false;
			if (node1.val !== node2.val) return false;
			let isEqualLeftRight = _checkEqual(node1.left, node2.right);
			let isEqualRightLeft = _checkEqual(node1.right, node2.left);
			return isEqualLeftRight && isEqualRightLeft;
		})(this.root, tree2);
	}
	/**
	 * A tree is symmetric if it is a mirror image of itself
	 * @returns {boolean}
	 */
	isSymmetric() {
		return (function _checkEqual(node1, node2) {
			// and should be on top since, if or is on top and both node1 and node2 are not present
			// it will return false as it matches one of the conditions in or
			if (!node1 && !node2) return true;
			if (!node1 || !node2) return false;
			if (node1.val !== node2.val) return false;
			let isEqualLeftRight = _checkEqual(node1.left, node2.right);
			let isEqualRightLeft = _checkEqual(node1.right, node2.left);
			return isEqualLeftRight && isEqualRightLeft;
		})(this.root, this.root);
	}
	/**
	 * Balanced tree is where left subtree and right subtree difference for each node is <= 1
	 * Complexity is O(n^2) since for each node the height is calculated
	 */
	heightBalanced() {
		function _getHeight(node) {
			if (!node) return 0;
			return 1 + Math.max(_getHeight(node.left), _getHeight(node.right));
		}
		return (function _checkBalanced(node) {
			if (!node) return true;
			let leftHeight = _getHeight(node.left);
			let rightHeight = _getHeight(node.right);
			if (Math.abs(leftHeight - rightHeight) > 1) return false;
			return _checkBalanced(node.left) && _checkBalanced(node.right);
		})(this.root);
	}
	/**
	 ** Balanced tree is where left subtree and right subtree difference for each node is <= 1
	 ** Complexity is O(n) since balance is calculated in the height recursion itself
	 */
	heightBalancedOptimized() {
		let isBalanced = true;
		function _height(node) {
			if (!node) return 0;

			if (!balanced) {
				return 0;
			}
			
			let leftHeight = _height(node.left);
			let rightHeight = _height(node.right);
			if (Math.abs(leftHeight - rightHeight) > 1) isBalanced = false;
			return 1 + Math.max(leftHeight, rightHeight);
		}
		_height(this.root);
		return isBalanced;
	}
	printKeysInRange(start, end) {
		if (this.root.val > end) return [];
		return (function _getKeys(node, data = []) {
			node.left && start < node.val && _getKeys(node.left, data);
			if (node.val >= start && node.val <= end) {
				data.push(node.val);
			}
			node.right && end > node.val && _getKeys(node.right, data);
			return data;
		})(this.root, []);
	}
	/**
	 * Time: O(m * n)
	 ** O(m): Every node in tree1 is traversed once.
	 ** O(n): Do _isEqual(tree1, tree2) for each node in tree2, which traverses at most n nodes in tree2.
	 ** Space: O(h_s) where h_s is the height of the main tree.
	 * @returns {boolean}
	 */
	checkSubtree(tree2) {
		function _isEqual(tree1, tree2) {
			if (!tree1 && !tree2) return true;
			if (!tree1 || !tree2) return false;
			if (tree1.val !== tree2.val) return false;
			let left = _isEqual(tree1.left, tree2.left);
			let right = _isEqual(tree1.right, tree2.right);
			return left && right;
		}
		function _checkSubtree(tree1, tree2) {
			if (!tree1) return !tree2;
			return _isEqual(tree1, tree2) || _checkSubtree(tree1.left, tree2) || _checkSubtree(tree1.right, tree2);
		}
		return _checkSubtree(this.root, tree2);
	}
	bstFromBFS(bfs) {
		let tree = void 0;
		function _insertIntoTree(node, el) {
			if (!node) {
				node = new Node(el);
				return node;
			}
			if (node.val > el) node.left = _insertIntoTree(node.left, el);
			if (node.val < el) node.right = _insertIntoTree(node.right, el);
			return node;
		}
		for (const el of bfs) {
			tree = _insertIntoTree(tree, el);
		}
		return tree;
	}
	constructTreeInPre(inOrder = [], preOrder = []) {
		let i = 0,
			p = 0;
		function _buildTree(stop) {
			// return null to have left and right as null where no left and right exist!
			if (inOrder[i] === stop) return null;
			const node = new Node(preOrder[p++]);
			node.left = _buildTree(node.val);
			i++;
			node.right = _buildTree(stop);
			return node;
		}
		return _buildTree();
	}
	/**
	 *
	 * @param {Array} preOrder
	 */
	constructTreeFromPre(preOrder) {
		let p = 0;
		function _buildTree(stop) {
			if (preOrder[p] > stop || p === preOrder.length) {
				return null;
			}
			let curr = new Node(preOrder[p++]);
			curr.left = _buildTree(curr.val);
			curr.right = _buildTree(stop);
			return curr;
		}
		return _buildTree();
	}

	/**
	 * Given a binary tree, return all root-to-leaf paths.
	 * A path consists of all the nodes from root to leaf in a given direction
	 * @returns {Node.val[]} All the root to leaf paths for the tree
	 */
	rootToLeafPath() {
		let data = [];
		/**
		 * @typedef Node.val
		 * @property {Number} this.val
		 */

		/**
		 *
		 * @param {Node} node
		 * @param {Array} path
		 * @returns {Node.val[]}
		 */
		function _pathHelper(node, path = []) {
			if (!node) return null;
			path.push(node.val);
			if (!node.left && !node.right) {
				// copy the path array since arrays are pointers, it will change with every recursion unless copied, then data will end up with the same arrays.
				data.push(Array.from(path));
			}
			_pathHelper(node.left, path);
			_pathHelper(node.right, path);
			// remove last element before going back to previous stage
			// since previous path won't have the last element
			path.pop();
		}
		_pathHelper(this.root);
		return data;
	}
	rootToLeafSum() {
		if (!this.root) return 0;
		let pathSum = 0;
		(function buildPath(node, path) {
			path.push(node.val);
			node.left && buildPath(node.left, path);
			node.right && buildPath(node.right, path);
			if (!node.left && !node.right) {
				pathSum += parseInt(path.join(""));
			}
			path.pop();
		})(root, []);
		return pathSum;
	}
	/**
	 *
	 * @param {Number[]} numbers
	 * Given an integer array with no duplicates. A maximum tree building on this array is defined as follow:
	 ** The root is the maximum number in the array.
	 ** The left subtree is the maximum tree constructed from left part subarray divided by the maximum number.
	 ** The right subtree is the maximum tree constructed from right part subarray divided by the maximum number.
	 */
	maximumBinaryTree(numbers) {
		/**
		 * @param {Number[]} arr
		 */
		function constructTree(arr) {
			if (arr.length < 1) return;
			let maxVal = Math.max(...arr);
			let maxIndex = arr.indexOf(maxVal);
			let curr = new Node(maxVal);
			curr.left = constructTree(arr.slice(0, maxIndex));
			curr.right = constructTree(arr.slice(maxIndex + 1));
			return curr;
		}
		return constructTree(numbers);
	}
	inOrderSuccessor(nodeVal) {
		let data = [];
		let successor = null;
		function getNext(node, val) {
			if (typeof successor === "number") return;
			node.left && getNext(node.left, nodeVal);
			if (data[data.length - 1] === val) successor = node.val;
			data.push(node.val);
			node.right && getNext(node.right, nodeVal);
		}
		getNext(this.root, nodeVal);
		return typeof successor === "number" ? successor : "Out of bound!";
	}
	sortedListToBST(head) {
		const sortedListToArr = function (head) {
			let res = [];
			let curr = head;
			while (curr) {
				res.push(curr.val);
				curr = curr.next;
			}
			return res;
		};
		let arr = sortedListToArr(head);

		function sortedArrToBalancedBST(left, right) {
			if (left > right) return null;
			let mid = ~~((left + right) / 2);
			let curr = new Node(arr[mid]);
			if (left === right) return curr;
			curr.left = sortedArrToBalancedBST(left, mid - 1);
			curr.right = sortedArrToBalancedBST(mid + 1, right);
			return curr;
		}

		return sortedArrToBalancedBST(0, arr.length - 1);
	}
	sortedArrayToBST(nums = []) {
		function _buildTree(left, right) {
			if (left > right) return null;
			let mid = ~~((left + right) / 2);
			let node = new Node(nums[mid]);
			console.log(nums[left], nums[mid], nums[right]);
			if (left === right) return node;
			node.left = _buildTree(left, mid - 1);
			node.right = _buildTree(mid + 1, right);
			return node;
		}
		return _buildTree(0, nums.length - 1);
	}
	/**
	 * Get the sum of nodes by doing vertical order traversal
	 */
	verticalSum() {
		let ht = {};
		let res = [];
		(function _sumHelper(node, dist) {
			ht[dist] = ht[dist] ? ht[dist] + node.val : node.val;
			node.left && _sumHelper(node.left, dist - 1);
			node.right && _sumHelper(node.right, dist + 1);
		})(this.root, 0);
		for (let key of Object.keys(ht).sort((a, b) => a - b)) {
			res.push(ht[key]);
		}
		return res;
	}
	/** Given a non-empty binary tree, find the maximum path sum.
	 * 
	 * For this problem, a path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path must contain at least one node and does not need to go through the root.

	 ** Example 1:
	 *
	 * Input Tree: 
	 *
	 *        1
	 *       / \
	 *      2   3
	 ** Output: 6 (1+2+3)
	 *
	 ** Example 2:
	 *
	 * Input Tree: 
	 *
	 *       -10
	 *       /  \
	 *      9   20
	 *         /  \
	 *        15  17 
	 ** Output: 42 (20+15+17)
	 */
	maxPathSum() {
		let max = -Infinity;
		function _maxSum(node) {
			if (!node) return 0;
			let leftMaxSum = _maxSum(node.left);
			let rightMaxSum = _maxSum(node.right);
			max = Math.max(max, node.val + leftMaxSum + rightMaxSum);
			// since a path may or may not have more than one node, we only
			// consider the +ve nodes, otherwise sum won't be maximum.
			return Math.max(0, node.val + leftMaxSum, node.val + rightMaxSum);
		}
		_maxSum(this.root);
		return max;
	}
	bottomView() {
		const res = [];
		const ht = {};
		function _buildView(node, dist) {
			if (!node) return;
			_buildView(node.left, dist - 1);
			_buildView(node.right, dist + 1);
			// for storage optimization, if ht[dist] already exists,
			// we don't do anything since, the first element of the ht[hd], is
			// what is visible from bottom.
			ht[dist] = ht[dist] || node.val;
			// console.log(ht[dist], node.val);
		}
		_buildView(this.root, 0);
		for (const key of Object.keys(ht).sort((a, b) => a - b)) {
			res.push(ht[key]);
		}
		return res;
	}
	topView() {
		const res = [];
		const ht = {};
		function _buildView(node, dist) {
			if (!node) return;
			_buildView(node.left, dist - 1);
			_buildView(node.right, dist + 1);
			ht[dist] = node.val;
		}
		_buildView(this.root, 0);
		for (let key of Object.keys(ht).sort((a, b) => a - b)) {
			res.push(ht[key]);
		}
		return res;
	}
	/**	Given a binary tree root and a linked list with head as the first node.

	 * Return True if all the elements in the linked list starting from the head correspond to some downward path connected in the binary tree otherwise return False.

	 * In this context downward path means a path that starts at some node and goes downwards.
	 *
	 ** Input: head = [4,2,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
	 * 
	 ** Output: true
	 *
	 ** Explanation: Nodes in blue form a subpath in the binary Tree.  
	 */
	isSubPath(list) {
		function _traverse(node, list) {
			if (!list) return true;
			if (!node || node.val !== list.val) return false;
			return _traverse(node.left, list.next) || _traverse(node.right, list.next);
		}
		function _isSubPath(node, list) {
			if (!node) return false;
			return _traverse(node, list) || _isSubPath(node.left, list) || _isSubPath(node.right, list);
		}
		return _isSubPath(this.root, list);
	}
	allMethods() {
		return Object.getOwnPropertyNames(BST.prototype).filter(x => x !== "constructor" && x !== "allMethods");
	}
}

module.exports = {
	Node,
	BST,
	LinkedList,
};
