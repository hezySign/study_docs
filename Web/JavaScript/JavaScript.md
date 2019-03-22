# JavaScript

内容摘要

- 简介
- 预览
- 关键字和保留字
- 变量和值
- 数据类型
- 类型转换
- 运算符
- 控制语句
- 函数
- 对象

## 参考

[JS 基础教程](http://www.w3school.com.cn/js/index.asp)
[JavaScript 对象](http://www.w3school.com.cn/js/js_reference.asp)
[HTML DOM 对象](http://www.w3school.com.cn/jsref/index.asp)

## 简介

JavaScript 一种动态类型、弱类型、基于原型的客户端脚本语言，用来给 HTML 网页增加动态功能。

JavaScript 由三部分组成：

1. ECMAScript （语法核心）
   作为语法核心，它规定了语言的组成部分：语法、类型、语句、关键字、保留字、操作符、对象
1. DOM （Document Object Model 文档对象模型）
   DOM 把整个页面映射为一个多层节点结果，开发人员可借助 DOM 提供的 API，轻松地删除、添加、替换或修改任何节点。
1. BOM （Browser Object Model 浏览器对象模型）
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

#### 引用类型

引用类型通常叫做类（class）。

##### Object 对象

ECMAScript 中的 Object 对象与 Java 中的 java.lang.Object 相似，ECMAScript 中的所有对象都由这个对象继承而来，Object 对象中的所有属性和方法都会出现在其他对象中。

```js
var o = new Object(); // 创建对象
```

Object 对象的属性：

1. constructor 对创建对象的函数的引用。
   - 对于 Object 对象，该指针指向原始的 Object() 函数。
1. prototype 对该对象的对象原型的引用。
   - 对于所有的对象，它默认返回 Object 对象的一个实例。

Object 对象的方法：

1. hasOwnProperty(property) 判断对象是否有某个特定的属性。必须用字符串指定该属性。
1. isPrototypeOf(object) 判断该对象是否为另一个对象的原型。
1. propertyIsEnumerable(property) 判断给定的属性是否可以用 for...in 语句进行枚举。
1. toString() 返回对象的原始字符串表示。
1. valueOf() 返回最适合该对象的原始值。

##### Boolean 对象

Boolean 对象是 Boolean 原始类型的引用类型。最好还是使用 Boolean 原始值 true 和 false。

##### Number 对象

Number 对象是 Number 原始类型的引用类型。只要可能，都使用数字的原始表示法。

```js
var oNumberObject = new Number(68);
alert(oNumberObject.toFixed(2)); //输出 "68.00"
alert(oNumberObject.toExponential(1)); //输出 "6.8e+1"
alert(oNumberObject.toPrecision(1)); //输出 "7e+1"
alert(oNumberObject.toPrecision(2)); //输出 "68"
alert(oNumberObject.toPrecision(3)); //输出 "68.0"
```

##### String 对象

String 对象是 String 原始类型的对象表示法

```js
var oStringObject = new String("hello world");
alert(oStringObject.length); //输出 "11"
alert(oStringObject.charAt(1)); //输出 "e"
alert(oStringObject.charCodeAt(1)); //输出 "101"

var s1 = new String("hello ");
var s2 = s1.concat("world");
alert(s2); //输出 "hello world"
alert(s1); //输出 "hello "

var oStringObject = new String("hello world!");
alert(oStringObject.indexOf("o")); // 输出 "4"
alert(oStringObject.lastIndexOf("o")); // 输出 "7"
```

#### instanceof 运算符

instanceof 运算符与 typeof 运算符相似，用于识别正在处理的对象的类型。与 typeof 方法不同的是，instanceof 方法要求开发者明确地确认对象为某特定类型。

```js
var oStringObject = new String("hello world");
alert(typeof oStringObject); //输出 "object"
alert(oStringObject instanceof String); //输出 "true"
```

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
var b1 = Boolean(new Object()); //true - 对象

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

#### 一元运算符

```js
// delete 运算符删除对以前定义的对象属性或方法的引用
var o = new Object();
o.name = "David";
alert(o.name); //输出 "David"
delete o.name;
alert(o.name); //输出 "undefined"

// delete 运算符不能删除开发者未定义的属性和方法
delete o.toString; // error
```

```js
// void 运算符对任何值返回 undefined。
// 该运算符通常用于避免输出不应该输出的值，例如，从 HTML 的 <a> 元素调用 JavaScript 函数时。
<a href="javascript:window.open('about:blank')">Click me</a>
```

```js
//前增量运算符
var iNum = 10;
alert(++iNum); // 输出 11

//前减量运算符
var iNum = 10;
alert(--iNum); // 输出 9

// 后增量运算符
var iNum = 10;
alert(iNum++); // 输出10
var i = iNum++;
alert(i); // 输出11

// 后减量运算符
var iNum = 10;
alert(iNum--); // 输出10
var i = iNum--;
alert(i); // 输出9
```

```js
// 一元加法对数字无影响，将字符串转换成数字
var iNum = 20;
iNum = +iNum;
alert(iNum); //输出 "20"

var sNum = "20";
alert(typeof sNum); //输出 "string"
var iNum = +sNum;
alert(typeof iNum); //输出 "number"

// 一元减法就是对数值求负，将字符串转换成数字并求负
var iNum = 20;
iNum = -iNum;
alert(iNum); //输出 "-20"

var sNum = "20";
alert(typeof sNum); //输出 "string"
var iNum = -sNum;
alert(iNum); //输出 "-20"
alert(typeof iNum); //输出 "number"
```

[位运算符](http://www.w3school.com.cn/js/pro_js_operators_bitwise.asp)

位运算符使用较少，主要有:

1. `~` 位运算非 NOT
1. `&` 位运算与 AND
1. `|` 位运算或 OR
1. `^` 位运算异或 XOR
1. `<<` 左移运算
1. `>>` 有符号右移运算
1. `>>>` 无符号右移运算

#### 逻辑运算符

抽象操作 ToBoolean 将其参数按照下表中的规则转换为逻辑值：
| 参数类型 | 结果 |
| --------- | ------------------------------------------------------- |
| Undefinde | false |
| Null | false |
| Boolean | 结果等于输入的参数（不转换） |
| Number | 如果参数为 +0, -0 或 NaN，则结果为 false；否则为 true。 |
| String | 如果参数为空字符串，则结果为 false；否则为 true。 |
| Object | true |

逻辑运算符有三种

1. `!` NOT
1. `&&` AND
1. `||` OR 运算数 toBoolean 的值

逻辑运算可以理解为线进行 toBoolean 操作，再进行逻辑运算

```js
var result;
// NOT 运算数 toBoolean 的值取反
result = !true; // false
result = !false; // true

// AND 两个运算数 toBoolean 的值都为 true 才返回 true，否则为 false
result = true && true; // true
result = true && false; // false
result = false && true; // false
result = false && false; // false

result = 1 && true; // true
result = "a" && true; // true
result = true && 0; // false
result = true && ""; // false
var obj = new Object();
result = obj && true; // true

// 两个运算数 toBoolean 的值至少有一个为 true 才返回 true，否则为 false
result = true || true; // true
result = true || false; // true
result = false || true; // true
result = false || false; // false

result = 1 || false; // true
result = "a" || false; // true
result = false || 0; // false
result = false || ""; // false
var obj = new Object();
result = obj || false; // true
```

#### 乘性运算符

```js
// 乘法运算符由星号（*）表示，用于两数相乘。
var iResult = 12 * 34;
/*
如果结果太大或太小，那么生成的结果是 Infinity 或 -Infinity。
如果某个运算数是 NaN，结果为 NaN。
Infinity 乘以 0，结果为 NaN。
Infinity 乘以 0 以外的任何数字，结果为 Infinity 或 -Infinity。
Infinity 乘以 Infinity，结果为 Infinity。
*/

// 除法运算符由斜杠（/）表示，用第二个运算数除第一个运算数
var iResult = 88 / 11;
/*
如果结果太大或太小，那么生成的结果是 Infinity 或 -Infinity。
如果某个运算数是 NaN，结果为 NaN。
Infinity 被 Infinity 除，结果为 NaN。
Infinity 被任何数字除，结果为 Infinity。
0 除一个任何非无穷大的数字，结果为 NaN。
Infinity 被 0 以外的任何数字除，结果为 Infinity 或 -Infinity。
*/

// 除法（余数）运算符由百分号（%）表示，返回除法运算得到的余数。
var iResult = 26 % 5; //等于 1
/*
如果被除数是 Infinity，或除数是 0，结果为 NaN。
Infinity 被 Infinity 除，结果为 NaN。
如果除数是无穷大的数，结果为被除数。
如果被除数为 0，结果为 0。
*/
```

#### 加性运算符

```js
// 加法运算符由加号（+）表示：
/*
如果两个运算数都是字符串，把第二个字符串连接到第一个上。
如果只有一个运算数是字符串，把另一个运算数转换成字符串，结果是两个字符串连接成的字符串。
*/
var iResult = 1 + 2; // 3
var result = 5 + 5; //两个数字
alert(result); //输出 "10"
var result2 = 5 + "5"; //一个数字和一个字符串
alert(result); //输出 "55"
/*
某个运算数是 NaN，那么结果为 NaN。
-Infinity 加 -Infinity，结果为 -Infinity。
Infinity 加 -Infinity，结果为 NaN。
+0 加 +0，结果为 +0。
-0 加 +0，结果为 +0。
-0 加 -0，结果为 -0。
*/

// 减法运算符（-）
var iResult = 2 - 1;
/*
某个运算数是 NaN，那么结果为 NaN。
Infinity 减 Infinity，结果为 NaN。
-Infinity 减 -Infinity，结果为 NaN。
Infinity 减 -Infinity，结果为 Infinity。
-Infinity 减 Infinity，结果为 -Infinity。
+0 减 +0，结果为 +0。
-0 减 -0，结果为 -0。
+0 减 -0，结果为 +0。
某个运算符不是数字，那么结果为 NaN。
*/
```

#### 关系运算符

常规比较方式

```js
//关系运算符小于、大于、小于等于和大于等于执行的是两个数的比较运算，比较方式与算术比较运算相同。
var bResult1 = 2 > 1; //true
var bResult2 = 2 < 1; //false
var bResult3 = 2 >= 1; //true
var bResult4 = 2 <= 1; //false

/*
大写字母的代码都小于小写字母的代码。
如：字母 B 的字符代码是 66，字母 a 的字符代码是 97
*/
var bResult = "Blue" < "alpha";
alert(bResult); //输出 true

var bResult = "Blue".toLowerCase() < "alpha".toLowerCase();
alert(bResult); //输出 false
```

比较数字和字符串

```js
// 无论何时比较一个数字和一个字符串，ECMAScript 都会把字符串转换成数字，然后按照数字顺序比较它们。
var bResult = "25" < "3";
alert(bResult); //输出 "true"

var bResult = "25" < 3;
alert(bResult); //输出 "false"

// 任何包含 NaN 的关系运算符都要返回 false
var bResult = "a" < 3;
alert(bResult); // false

var bResult = "a" >= 3;
alert(bResult); // false
```

#### 等性运算符

等号和非等号用于处理原始值，全等号和非全等号用于处理对象。

##### 等号和非等号

在 ECMAScript 中，等号由双等号（==）表示，当且仅当两个运算数相等时，它返回 true。非等号由感叹号加等号（!=）表示，当且仅当两个运算数不相等时，它返回 true。为确定两个运算数是否相等，这两个运算符都会进行类型转换。

| 表达式            | 值    |
| ----------------- | ----- |
| null == undefined | true  |
| "NaN" == NaN      | false |
| 5 == NaN          | false |
| NaN == NaN        | false |
| NaN != NaN        | true  |
| false == 0        | true  |
| true == 1         | true  |
| true == 2         | false |
| undefined == 0    | false |
| null == 0         | false |
| "5" == 5          | true  |

##### 全等号和非全等号

等号和非等号的同类运算符是全等号和非全等号。这两个运算符所做的与等号和非等号相同，只是它们在检查相等性前，不执行类型转换。

```js
var sNum = "66";
var iNum = 66;
alert(sNum == iNum); //输出 "true"
alert(sNum === iNum); //输出 "false"

var sNum = "66";
var iNum = 66;
alert(sNum != iNum); //输出 "false"
alert(sNum !== iNum); //输出 "true"
```

##### 条件运算符

```js
// 该表达式主要是根据 boolean_expression 的计算结果有条件地为变量赋值。如果 Boolean_expression 为 true，就把 true_value 赋给变量；如果它是 false，就把 false_value 赋给变量。
variable = boolean_expression ? true_value : false_value;
```

##### 赋值运算符

简单的赋值运算符由等号（=）实现，只是把等号右边的值赋予等号左边的变量。

复合赋值运算是由乘性运算符、加性运算符或位移运算符加等号（=）实现的。

- 乘法/赋值（\*=）
- 除法/赋值（/=）
- 取模/赋值（%=）
- 加法/赋值（+=）
- 减法/赋值（-=）
- 左移/赋值（<<=）
- 有符号右移/赋值（>>=）
- 无符号右移/赋值（>>>=）

```js
var iNum = 10;
iNum = iNum + 10;
// 复合赋值运算
var iNum = 10;
iNum += 10;
```

### 7. 控制语句

#### if 语句

```js
if (condition) {
  statement1;
} else {
  statement2;
}
```

- 其中 condition 可以是任何表达式。
- 如果条件计算结果为 true，则执行 statement1；如果条件计算结果为 false，则执行 statement2。
- 每个语句都可以是单行代码，也可以是代码块。

可以串联多个 if 语句：

```js
if (condition1) {
  statement1;
} else if (condition2) {
  statement2;
} else {
  statement3;
}
```

#### 迭代语句

迭代语句又叫循环语句，声明一组要反复执行的命令，直到满足某些条件为止。

> do-while 语句

do-while 语句是后测试循环，即退出条件在执行循环内部的代码之后计算。这意味着在计算表达式之前，至少会执行循环主体一次。它的语法如下：

```js
do {
  statement;
} while (expression);
```

例子：

```js
var i = 0;
do {
  i += 2;
} while (i < 10);
```

> while 语句

while 语句是前测试循环。这意味着退出条件是在执行循环内部的代码之前计算的。因此，循环主体可能根本不被执行。它的语法如下：

```js
while (expression) {
  statement;
}
```

例子：

```js
var i = 0;
while (i < 10) {
  i += 2;
}
```

> for 语句

for 语句是前测试循环，而且在进入循环之前，能够初始化变量，并定义循环后要执行的代码。它的语法如下：

```js
for (initialization; expression; post_loop_expression) {
  statement;
}
```

注意：post_loop_expression 之后不能写分号，否则无法运行。
例子：

```js
iCount = 6;
for (var i = 0; i < iCount; i++) {
  alert(i);
}
```

> for-in 语句

for-in 语句用于枚举对象的属性。它的语法如下：

```js
for (property in expression) statement;
```

例子：

```js
for (sProp in window) {
  alert(sProp);
}
```

这里，for-in 语句用于显示 window 对象的所有属性。

前面讨论过的 PropertyIsEnumerable() 是 ECMAScript 中专门用于说明属性是否可以用 for-in 语句访问的方法。

> 有标签的语句

可以用下列语句给语句加标签，以便以后调用：

```js
label: statement;
```

> break 语句 和 continue 语句

break 语句可以立即退出循环，阻止再次反复执行任何代码。而 continue 语句只是退出当前循环，根据控制表达式还允许继续进行下一次循环。

```js
var iNum = 0;
for (var i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    break;
  }
  iNum++;
}
alert(iNum); //输出 "4"
```

```js
var iNum = 0;
for (var i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    continue;
  }
  iNum++;
}
alert(iNum); //输出 "8"
```

break 语句和 continue 语句都可以与有标签的语句联合使用，返回代码中的特定位置。

```js
var iNum = 0;
outermost: for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      break outermost;
    }
    iNum++;
  }
}
alert(iNum); //输出 "55"
```

```js
var iNum = 0;
outermost: for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      continue outermost;
    }
    iNum++;
  }
}
alert(iNum); //输出 "95"
```

> with 语句

with 语句用于设置代码在特定对象中的作用域。它的语法：

```js
with (expression) statement;
```

例如：

```js
var sMessage = "hello";
with (sMessage) {
  alert(toUpperCase()); //输出 "HELLO"
}
```

> switch 语句

switch 语句主要用于替代有多个条件的 if-else 语句。switch 语句的语法：

```js
switch (expression)
  case value1: statement;
    break;
  case value2: statement;
    break;
  case value3: statement;
    break;
  case value4: statement;
    break;
...
  case valueN: statement;
    break;
  default: statement;
```

- 每个情况（case）都是表示“如果 expression 等于 value，就执行 statement”。
- 关键字 break 会使代码跳出 switch 语句。如果没有关键字 break，代码执行就会继续进入下一个 case。
- 关键字 default 说明了表达式的结果不等于任何一种情况时的操作（事实上，它相对于 else 从句）。

在 ECMAScript 中，switch 语句可以用于字符串，而且能用不是常量的值

### 8. 函数

函数是一组可以随时随地运行的语句。函数的基本语法是这样的：

```js
function functionName(arg0, arg1, ...argN) {
  statements;
}
```

例如：

```js
function sayHi(sName, sMessage) {
  alert("Hello " + sName + sMessage);
}

// 调用函数
sayHi("David", " Nice to meet you!");
```

> 函数的返回值

即使函数确实有值，也不必明确地声明它。该函数只需要使用 return 运算符后跟要返回的值即可。

如果函数无明确的返回值，或调用了没有参数的 return 语句，那么它真正返回的值是 undefined。

> arguments 对象

在函数代码中，使用特殊对象 arguments，开发者无需明确指出参数名，就能访问它们。

例如，在函数 sayHi() 中，第一个参数是 message。用 arguments[0] 也可以访问这个值，即第一个参数的值（第一个参数位于位置 0，第二个参数位于位置 1，依此类推）。

因此，无需明确命名参数，就可以重写函数：

```js
function sayHi() {
  if (arguments[0] == "bye") {
    return;
  }

  alert(arguments[0]);
}
```

还可以用 arguments 对象检测函数的参数个数，引用属性 arguments.length 即可。

#### Function 对象（类）

ECMAScript 的函数实际上是功能完整的对象。

#### Closure 闭包

闭包，指的是词法表示包括不被计算的变量的函数，也就是说，函数可以使用函数之外定义的变量。

```js
// 简单的闭包实例，sayHelloWorld()方法中可以引用外面定义的变量
var sMessage = "hello world";
function sayHelloWorld() {
  alert(sMessage);
}
sayHelloWorld();
```

### 9. 对象

在 ECMAScript 中，对象由特性（attribute）构成，特性可以是原始值，也可以是引用值。如果特性存放的是函数，它将被看作对象的方法（method），否则该特性被看作对象的属性（property）。

#### 声明和实例化

对象的创建方式是用关键字 new 后面跟上实例化的类的名字：

```js
var oObject = new Object();
var oStringObject = new String();
// 如果构造函数无参数，括号则不是必需的。
var oObject = new Object();
var oStringObject = new String();
```

#### 对象引用

在 ECMAScript 中，不能访问对象的物理表示，只能访问对象的引用。

#### 对象废除

ECMAScript 拥有无用存储单元收集程序（garbage collection routine），意味着不必专门销毁对象来释放内存。

把对象的所有引用都设置为 null，可以强制性地废除对象。例如：

```js
var oObject = new Object();
// do something with the object here
oObject = null;
```

#### 早绑定和晚绑定

所谓绑定（binding），即把对象的接口与对象实例结合在一起的方法。

1. 早绑定（early binding）是指在实例化对象之前定义它的属性和方法，这样编译器或解释程序就能够提前转换机器代码。
1. 晚绑定（late binding）指的是编译器或解释程序在运行前，不知道对象的类型。

ECMAScript 中的所有变量都采用晚绑定方法。

#### 对象类型

ECMAScript 中可以创建并使用的对象有三种：本地对象、内置对象和宿主对象。

##### 本地对象

简单来说，本地对象就是 ECMA-262 定义的类（引用类型）。

##### 内置对象

由 ECMAScript 实现提供的、独立于宿主环境的所有对象，在 ECMAScript 程序开始执行时出现。ECMA-262 只定义了两个内置对象，即 Global 和 Math （它们也是本地对象，根据定义，每个内置对象都是本地对象）。

##### 宿主对象

所有非本地对象都是宿主对象（host object），即由 ECMAScript 实现的宿主环境提供的对象。

所有 BOM 和 DOM 对象都是宿主对象。

#### 对象作用域

作用域指的是变量的适用范围。

ECMAScript 只有公用作用域，建议通过在属性前后加下划线将属性标记为私有。

注意，下划线并不改变属性是公用属性的事实，它只是告诉其他开发者，应该把该属性看作私有的。

##### 关键字 this

this 用在对象的方法中。关键字 this 总是指向调用该方法的对象，例如：

```js
var oCar = new Object();
oCar.color = "red";
oCar.showColor = function() {
  alert(oCar.color);
};
oCar.showColor();
```

#### 定义类或对象

ECMAScript 拥有很多创建对象或类的方法。

混合的构造函数/原型方式

```js
function Car(sColor, iDoors, iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.drivers = new Array("Mike", "John");
}

Car.prototype.showColor = function() {
  alert(this.color);
};

var oCar1 = new Car("red", 4, 23);
var oCar2 = new Car("blue", 3, 25);

oCar1.drivers.push("Bill");

alert(oCar1.drivers); //输出 "Mike,John,Bill"
alert(oCar2.drivers); //输出 "Mike,John"
```

动态原型方法

```js
function Car(sColor, iDoors, iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.drivers = new Array("Mike", "John");

  if (typeof Car._initialized == "undefined") {
    Car.prototype.showColor = function() {
      alert(this.color);
    };

    Car._initialized = true;
  }
}
```

#### 修改对象

prototype 属性不仅可以定义构造函数的属性和方法，还可以为本地对象添加属性和方法。

创建新方法

```js
Number.prototype.toHexString = function() {
  return this.toString(16);
};

var iNum = 15;
alert(iNum.toHexString()); //输出 "F"
```

重命名已有方法

```js
Array.prototype.enqueue = function(vItem) {
  this.push(vItem);
};

Array.prototype.dequeue = function() {
  return this.shift();
};
```

为本地对象添加新方法

```js
Object.prototype.showValue = function() {
  alert(this.valueOf());
};

var str = "hello";
var iNum = 25;
str.showValue(); //输出 "hello"
iNum.showValue(); //输出 "25"
```

## JavaScript 对象

JavaScript 本地对象和内置对象

- Array
- Boolean
- Date
- Math
- Number
- String
- RegExp
- Global

## DOM （Document Object Model 文档对象模型）

通过 HTML DOM，可访问 JavaScript HTML 文档的所有元素。

当网页被加载时，浏览器会创建页面的文档对象模型（Document Object Model）。

- Canvas
- Document
- Form
- Object
- Meta
- Style

## BOM （Browser Object Model 浏览器对象模型）

浏览器对象模型 (BOM) 使 JavaScript 有能力与浏览器“对话”。

浏览器对象模型（Browser Object Model）尚无正式标准。

由于现代浏览器已经（几乎）实现了 JavaScript 交互性方面的相同方法和属性，因此常被认为是 BOM 的方法和属性。

- Window
- Navigator
- Screen
- History
- Location
