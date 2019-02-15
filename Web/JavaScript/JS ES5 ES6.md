# ES5 和 ES6

## ES5

### 1. strict 模式

严格模式，限制一些用法，'use strict';

### 2. Array 增加方法

增加了 every、some 、forEach、filter 、indexOf、lastIndexOf、isArray、map、reduce、reduceRight 方法

PS： 还有其他方法 Function.prototype.bind、String.prototype.trim、Date.now

### 3. Object 方法

Object.getPrototypeOf
Object.create
Object.getOwnPropertyNames
Object.defineProperty
Object.getOwnPropertyDescriptor
Object.defineProperties
Object.keys
Object.preventExtensions / Object.isExtensible
Object.seal / Object.isSealed
Object.freeze / Object.isFrozen

---

## ES6

### 1. Let + Const

let 的用法类似于 var。let 所声明的变量，只在同一代码块内有效。

const 声明一个只读的常量。一旦声明，常量的值就不能改变。

```js
// let
{
  let a = 10;
  var b = 1;
}

a; // ReferenceError: a is not defined.
b; // 1

// const
const PI = 3.1415;
PI; // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

### 2. Template Strings - 模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识。
它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```js
// Basic literal string creation
`This is a pretty little template string.``In ES5 this is // Multiline strings
 not legal.`;

// Interpolate variable bindings
var name = "Bob",
  time = "today";
`Hello ${name}, how are you ${time}?`;

// Unescaped template strings
String.raw`In ES5 "\n" is a line-feed.`;
```

### 3. Unicode

```js
// same as ES5.1
"𠮷".length == 2;

// new RegExp behaviour, opt-in ‘u’
"𠮷".match(/./u)[0].length == 2;

// new form
("\u{20BB7}" == "𠮷") == "\uD842\uDFB7";

// new String ops
"𠮷".codePointAt(0) == 0x20bb7;

// for-of iterates code points
for (var c of "𠮷") {
  console.log(c);
}
```

### 4. Binary and Octal Literals - 二进制和八进制常量

```js
0b111110111 === 503; // true
0o767 === 503; // true
```

### 5. Arrows and Lexical This - 箭头函数和 this 关键字

1. ES6 允许使用“箭头”（=>）定义函数。
1. 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
1. 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用 return 语句返回。
1. 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。

函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

```js
var f = v => v;

var f = () => 5;
var sum = (num1, num2) => num1 + num2;

var sum = (num1, num2) => {
  return num1 + num2;
};

let getTempItem = id => ({ id: id, name: "Temp" });

// 关键字 this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f => console.log(this._name + " knows " + f));
  }
};
```

### 6. Destructuring - 解构

如果解构不成功，变量的值就等于 undefined。

```js
// list matching
var [a, , b] = [1, 2, 3];
a === 1;
b === 3;

// object matching
var {
  op: a,
  lhs: { op: b },
  rhs: c
} = getASTNode();

// object matching shorthand
// binds `op`, `lhs` and `rhs` in scope
var { op, lhs, rhs } = getASTNode();

// Can be used in parameter position
function g({ name: x }) {
  console.log(x);
}
g({ name: 5 });

// Fail-soft destructuring
var [a] = [];
a === undefined;

// Fail-soft destructuring with defaults
var [a = 1] = [];
a === 1;

// Destructuring + defaults arguments
function r({ x, y, w = 10, h = 10 }) {
  return x + y + w + h;
}
r({ x: 1, y: 2 }) === 23;
```

### 7. Default + Rest + Spread - 默认值 + 参数打包 + 数组展开

```js
// Default
function f(x, y = 12) {
  // y is 12 if not passed (or passed as undefined)
  return x + y;
}
f(3) == 15;

// Rest
function f(x, ...y) {
  // y is an Array
  return x * y.length;
}
f(3, "hello", true) == 6;

// Spread
function f(x, y, z) {
  return x + y + z;
}
// Pass each elem of array as argument
f(...[1, 2, 3]) == 6;
```

### 8. Iterators + For...Of - 迭代器和 For...Of 循环

迭代器有个 next 方法，调用会返回：
(1).返回迭代对象的一个元素：{ done: false, value: elem }
(2).如果已到迭代对象的末端：{ done: true, value: retVal }

```js
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0,
      cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur };
      }
    };
  }
};

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000) break;
  console.log(n);
}
```

---

### 9. Enhanced ObjectLiterals - 增强对象字面量

```js
var obj = {
  // Sets the prototype. "__proto__" or '__proto__' would also work.
  __proto__: theProtoObj,
  // Computed property name does not set prototype or trigger early error for
  // duplicate __proto__ properties.
  ["__proto__"]: somethingElse,
  // Shorthand for ‘handler: handler’
  handler,
  // Methods
  toString() {
    // Super calls
    return "d " + super.toString();
  },
  // Computed (dynamic) property names
  ["prop_" + (() => 42)()]: 42
};
```

### 10. Map + Set + WeakMap + WeakSet

```js
// Sets
var s = new Set();
s.add("hello")
  .add("goodbye")
  .add("hello");
s.size === 2;
s.has("hello") === true;

// Maps
var m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;

// Weak Maps
var wm = new WeakMap();
wm.set(s, { extra: 42 });
wm.size === undefined;

// Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });
// Because the added object has no other references, it will not be held in the set
```

### 11. Math + Number + String + Object

```js
Number.EPSILON;
Number.isInteger(Infinity); // false
Number.isNaN("NaN"); // false

Math.acosh(3); // 1.762747174039086
Math.hypot(3, 4); // 5
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2); // 2

"abcde".includes("cd"); // true
"abc".repeat(3); // "abcabcabc"

Array.from(document.querySelectorAll("*")); // Returns a real Array
Array.of(1, 2, 3) // Similar to new Array(...), but without special one-arg behavior
  [0, 0, 0].fill(7, 1) // [0,7,7]
  [1, 2, 3].findIndex(x => x == 2) // 1
  ["a", "b", "c"].entries() // iterator [0, "a"], [1,"b"], [2,"c"]
  ["a", "b", "c"].keys() // iterator 0, 1, 2
  ["a", "b", "c"].values(); // iterator "a", "b", "c"

Object.assign(Point, { origin: new Point(0, 0) });
```

### 12. Classes - 类

```js
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //...
    super.update();
  }
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
```

### 13. Modules - 模块

```js
// lib/math.js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;
```

```js
// app.js
import * as math from "lib/math";
console.log("2π = " + math.sum(math.pi, math.pi));
```

```js
// otherApp.js
import { sum, pi } from "lib/math";
console.log("2π = " + sum(pi, pi));
```

---

### 14. Symbols - 符号

Symbol是一种基本类型。Symbol 通过调用symbol函数产生，它接收一个可选的名字参数，该函数返回的symbol是唯一的。

```js
(function() {

  // module scoped symbol
  var key = Symbol("key");

  function MyClass(privateData) {
    this[key] = privateData;
  }

  MyClass.prototype = {
    doStuff: function() {
      ... this[key] ...
    }
  };

  // Limited support from Babel, full support requires native implementation.
  typeof key === "symbol"
})();

var c = new MyClass("hello")
c["key"] === undefined
```

### 15. Tail Calls - 尾部调用

尾部调用 就是指某个函数的最后一步是调用另一个函数。
尾调用优化（Tail call optimization），即只保留内层函数的调用帧。

函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。
尾递归可以避免“栈溢出”错误。

```js
function factorial(n, acc = 1) {
    "use strict";
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

// Stack overflow in most implementations today,
// but safe on arbitrary inputs in ES2015
factorial(100000)
```

### 16. Promises

Promise 是异步编程的一种解决方案。

```js
function timeout(duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
}

var p = timeout(1000)
  .then(() => {
    return timeout(2000);
  })
  .then(() => {
    throw new Error("hmm");
  })
  .catch(err => {
    return Promise.all([timeout(100), timeout(200)]);
  });
```

### 17. Generators - 生成器

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

```js
var fibonacci = {
  [Symbol.iterator]: function*() {
    var pre = 0,
      cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
};

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000) break;
  console.log(n);
}
```

### 18. Proxies - 代理

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改。

```js
// Proxying a normal object
var target = {};
var handler = {
  get: function(receiver, name) {
    return `Hello, ${name}!`;
  }
};

var p = new Proxy(target, handler);
p.world === "Hello, world!";
```

```js
// Proxying a function object
var target = function() {
  return "I am the target";
};
var handler = {
  apply: function(receiver, ...args) {
    return "I am the proxy";
  }
};

var p = new Proxy(target, handler);
p() === "I am the proxy";
```

```js
var handler =
{
  // target.prop
  get: ...,
  // target.prop = value
  set: ...,
  // 'prop' in target
  has: ...,
  // delete target.prop
  deleteProperty: ...,
  // target(...args)
  apply: ...,
  // new target(...args)
  construct: ...,
  // Object.getOwnPropertyDescriptor(target, 'prop')
  getOwnPropertyDescriptor: ...,
  // Object.defineProperty(target, 'prop', descriptor)
  defineProperty: ...,
  // Object.getPrototypeOf(target), Reflect.getPrototypeOf(target),
  // target.__proto__, object.isPrototypeOf(target), object instanceof target
  getPrototypeOf: ...,
  // Object.setPrototypeOf(target), Reflect.setPrototypeOf(target)
  setPrototypeOf: ...,
  // for (let i in target) {}
  enumerate: ...,
  // Object.keys(target)
  ownKeys: ...,
  // Object.preventExtensions(target)
  preventExtensions: ...,
  // Object.isExtensible(target)
  isExtensible :...
}
```

### 19. Reflect - 反射

Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。

```js
var O = { a: 1 };
Object.defineProperty(O, "b", { value: 2 });
O[Symbol("c")] = 3;

Reflect.ownKeys(O); // ['a', 'b', Symbol(c)]

function C(a, b) {
  this.c = a + b;
}
var instance = Reflect.construct(C, [20, 22]);
instance.c; // 42
```

Reflect对象的设计目的有这样几个：

1. 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。 从Reflect对象上可以拿到语言内部的方法。
1. 修改某些Object方法的返回结果，让其变得更合理。 比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
1. 让Object操作都变成函数行为。
1. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。

## 参考

[Learn ES2015](https://babeljs.io/docs/en/learn)
[ECMAScript 6 入门](http://es6.ruanyifeng.com/)
[ES5 和 ES6 的区别](http://www.cnblogs.com/lovesong/p/4908871.html)
