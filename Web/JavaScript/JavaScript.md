# JavaScript

[JS 基础教程](http://www.w3school.com.cn/js/index.asp)

## 简介

JavaScript 一种动态类型、弱类型、基于原型的客户端脚本语言，用来给 HTML 网页增加动态功能。

JavaScript 由三部分组成：

1. ECMAScript （语法核心）
   作为语法核心，它规定了语言的组成部分：语法、类型、语句、关键字、保留字、操作符、对象
1. DOM （文档对象模型）
   DOM 把整个页面映射为一个多层节点结果，开发人员可借助 DOM 提供的 API，轻松地删除、添加、替换或修改任何节点。
1. BOM （浏览器对象模型）
   支持可以访问和操作浏览器窗口的浏览器对象模型，开发人员可以控制浏览器显示的页面以外的部分。

### 1. JavaScript 使用

HTML 中的脚本必须位于 \<script> 与 \</script> 标签之间。
脚本可被放置在 HTML 页面的 \<body> 和 \<head> 部分中。

#### \<head> 中的 JavaScript 函数

```html
<!DOCTYPE html>
<html>
  <head>
    <script>
      function myFunction() {
        document.getElementById("demo").innerHTML =
          "My First JavaScript Function";
      }
    </script>
  </head>

  <body>
    <h1>My Web Page</h1>
    <p id="demo">A Paragraph</p>
    <button type="button" onclick="myFunction()">Try it</button>
  </body>
</html>
```

#### \<body>中的 JavaScript 函数

```js
<!DOCTYPE html>
<html>
<body>

<h1>My Web Page</h1>
<p id="demo">A Paragraph</p>
<button type="button" onclick="myFunction()">Try it</button>

<script>
function myFunction() {
  document.getElementById("demo").innerHTML="My First JavaScript Function";
}
</script>

</body>
</html>
```

## ECMAScript （语法核心）

### 1. 预览

1. 区分大小写
1. 变量是弱类型的
1. 每行结尾的分号可有可无
1. 括号表示代码块
1. 两种注释方式

```js
var color = "red";
var num = 25;
var visible = true;

var test1 = "red";
var test2 = "blue";

//this is a single-line comment

/*this is a multi-
line comment*/

if (test1 == "red") {
  test1 = "blue";
  alert(test1);
}
```

### 2. 关键字 和 保留字

关键字 不能被用作变量名或函数名。

```txt
break case catch continue default
delete do else finally for
function if in instanceof new
return switch this throw try
typeof var void while with
```

保留字 不能被用作变量名或函数名。

```txt
abstract boolean byte char class
const debugger double enum export
extends final float goto implements
import int interface long native
package private protected public short
static super synchronized throws transient
volatile
```

### 3. 变量 和 值

声明变量并赋值

```js
var test = "hi";
var flag = false;
var a = 1;
var b = 1.23;
```

#### 变量命名规则：

1. 第一个字符必须是字母、下划线 (\_) 或美元符号 (\$)。
1. 余下的字符可以是下划线、美元符号或任何字母或数字字符。
1. 变量名不能是 JS 中的关键字和保留字。

下面的变量都是合法的：

```js
var test;
var $test;
var $1;
var _$te$t2;
```

Camel 标记法
首字母是小写的，接下来的字母都以大写字符开头。

```js
var myTestValue = 0,
  mySecondValue = "hi";
```

Pascal 标记法
首字母是大写的，接下来的字母都以大写字符开头。例如：

```js
var MyTestValue = 0,
  MySecondValue = "hi";
```

#### 值

在 ECMAScript 中，变量可以存在两种类型的值，即原始值和引用值。

1. 原始值
   存储在栈（stack）中的简单数据段，也就是说，它们的值直接存储在变量访问的位置。
1. 引用值
   存储在堆（heap）中的对象，也就是说，存储在变量处的值是一个指针（point），指向存储对象的内存处。

为变量赋值时，ECMAScript 的解释程序必须判断该值是原始类型，还是引用类型。要实现这一点，解释程序则需尝试判断该值是否为 ECMAScript 的原始类型之一。

### 4. 数据类型

ECMAScript 有 5 种原始类型（primitive type），即 Undefined、Null、Boolean、Number 和 String。

#### typeof 运算符

对变量或值调用 typeof 运算符将返回下列值之一：

- undefined - 如果变量是 Undefined 类型的
- boolean - 如果变量是 Boolean 类型的
- number - 如果变量是 Number 类型的
- string - 如果变量是 String 类型的
- object - 如果变量是一种引用类型或 Null 类型的

#### Undefined 类型

Undefined 类型只有一个值，即 undefined。

```js
// 当声明的变量未初始化时，该变量的默认值是 undefined。
var oTemp;
alert(typeof oTemp); //输出 "undefined"
alert(typeof oTemp2); //输出 "undefined"

// 当函数无明确返回值时，返回的也是值 "undefined"
function testFunc() {}
alert(testFunc() == undefined); //输出 "true"
```

#### Null 类型

Null 类型只有一个专用值 null，即它的字面量。值 undefined 实际上是从值 null 派生来的，因此 ECMAScript 把它们定义为相等的。

```js
alert(null == undefined); //输出 "true"
```

尽管这两个值相等，但它们的含义不同。undefined 是声明了变量但未对其初始化时赋予该变量的值，null 则用于表示尚未存在的对象。如果函数或方法要返回的是对象，那么找不到该对象时，返回的通常是 null。

#### Boolean 类型

Boolean 类型有两个值 true 和 false （即两个 Boolean 字面量）。
即使 false 不等于 0，0 也可以在必要时被转换成 false，这样在 Boolean 语句中使用两者都是安全的。

#### Number 类型

ECMA-262 中定义的最特殊的类型是 Number 类型。这种类型既可以表示 32 位的整数，还可以表示 64 位的浮点数。

八进制数和十六进制数

```js
var iNum = 070; //070 等于十进制的 56
var iNum = 0x1f; //0x1f 等于十进制的 31
var iNum = 0xab; //0xAB 等于十进制的 171
```

> 尽管所有整数都可以表示为八进制或十六进制的字面量，但所有数学运算返回的都是十进制结果。

浮点数

要定义浮点值，必须包括小数点和小数点后的一位数字（例如，用 1.0 而不是 1）。

```js
var fNum = 5.0;
```

> 对于浮点字面量的有趣之处在于，用它进行计算前，真正存储的是字符串。

科学计数法

对于非常大或非常小的数，可以用科学计数法表示浮点数，可以把一个数表示为数字（包括十进制数字）加 e（或 E），后面加乘以 10 的倍数。例如：

```js
var fNum = 5.618e7;
```

特殊的 Number 值

```js
Number.MAX_VALUE; // 最大整数
Number.MIN_VALUE; // 最小整数
Number.POSITIVE_INFINITY; // 正无穷大，即Infinity
Number.NEGATIVE_INFINITY; // 负无穷大，即 -Infinity

// 判断一个数是否是有穷的
var iResult = iNum * some_really_large_number;

if (isFinite(iResult)) {
  alert("finite");
} else {
  alert("infinite");
}

NaN; // 非数字，Not a Number。
alert(NaN == NaN); // 输出 "false"
alert(isNaN("blue")); // 输出 "true"
alert(isNaN("666")); // 输出 "false"
```

#### String 类型

字符串字面量是由双引号（"）或单引号（'）声明的。
它是唯一没有固定大小的原始类型。可以用字符串存储 0 或更多的 Unicode 字符。

### 5. 类型转换

#### 转换成字符串

ECMAScript 的 Boolean 值、数字和字符串的原始值的有趣之处在于它们是伪对象，这意味着它们实际上具有属性和方法。

```js
var sColor = "red";
alert(sColor.length); //输出 "3"

var bFound = false;
alert(bFound.toString()); //输出 "false"

// 在默认模式中，Number 类型的 toString() 方法返回的都是数字的十进制表示。
var iNum1 = 10;
var iNum2 = 10.0;
alert(iNum1.toString()); //输出 "10"
alert(iNum2.toString()); //输出 "10"

var iNum = 10;
alert(iNum.toString(2)); //输出 "1010"
alert(iNum.toString(8)); //输出 "12"
alert(iNum.toString(16)); //输出 "A"
```

#### 转换成数字

ECMAScript 提供了两种把非数字的原始值转换成数字的方法，即 parseInt() 和 parseFloat()。

parseInt() 方法从位置 0 开始，判断字符是否是有效数字，如果不是就直接返回 NaN；如果是再判断下一个字符，直到遍历到非有效数字字符或最后一个字符为止。

```js
var iNum1 = parseInt("12345red"); //返回 12345
var iNum1 = parseInt("0xA"); //返回 10
var iNum1 = parseInt("56.9"); //返回 56
var iNum1 = parseInt("red"); //返回 NaN

// parseInt() 方法还有基模式，可以把二进制、八进制、十六进制或其他任何进制的字符串转换成整数。
var iNum1 = parseInt("10", 2); //返回 2
var iNum2 = parseInt("10", 8); //返回 8
var iNum3 = parseInt("10", 10); //返回 10
var iNum1 = parseInt("AF", 16); //返回 175

// 如果十进制数包含前导 0，那么最好采用基数 10，这样才不会意外地得到八进制的值。
var iNum1 = parseInt("010"); //返回 8
var iNum2 = parseInt("010", 8); //返回 8
var iNum3 = parseInt("010", 10); //返回 10
```

#### 强制类型转换

ECMAScript 中可用的 3 种强制类型转换如下：

- Boolean(value) - 把给定的值转换成 Boolean 型；
- Number(value) - 把给定的值转换成数字（可以是整数或浮点数）；
- String(value) - 把给定的值转换成字符串；

```js
// Boolean
var b1 = Boolean(""); //false - 空字符串
var b2 = Boolean("hello"); //true - 非空字符串
var b1 = Boolean(50); //true - 非零数字
var b1 = Boolean(null); //false - null
var b1 = Boolean(0); //false - 零
var b1 = Boolean(new object()); //true - 对象

// Number
Number(false); // 0
Number(true); // 1
Number(undefined); // NaN
Number(null); // 0
Number("1.2"); // 1.2
Number("12"); // 12
Number("1.2.3"); // NaN
Number(new object()); // NaN
Number(50); // 50

// String
var s1 = String(null); //"null"
var oNull = null;
var s2 = oNull.toString(); //会引发错误
```

### 6. 运算符

### 7 控制语句

### 8. 函数

### 9. 对象

### 10. 库

## DOM （文档对象模型）

通过 HTML DOM，可访问 JavaScript HTML 文档的所有元素。

当网页被加载时，浏览器会创建页面的文档对象模型（Document Object Model）。

HTML DOM 模型被构造为对象的树。

## BOM （浏览器对象模型）

浏览器对象模型 (BOM) 使 JavaScript 有能力与浏览器“对话”。

浏览器对象模型（Browser Object Model）尚无正式标准。

由于现代浏览器已经（几乎）实现了 JavaScript 交互性方面的相同方法和属性，因此常被认为是 BOM 的方法和属性。

## 参考

- [JavaScript 对象](http://www.w3school.com.cn/js/js_reference.asp)
- [HTML DOM 对象](http://www.w3school.com.cn/jsref/index.asp)
