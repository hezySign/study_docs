# CSS

[CSS 参考手册](http://www.w3school.com.cn/cssref/index.asp)
[CSS 选择器](http://www.w3school.com.cn/cssref/css_selectors.asp)

## CSS 基础教程

### CSS 概述

- CSS 指层叠样式表 (Cascading Style Sheets)。
- 样式定义如何显示 HTML 元素。
- 样式通常存储在样式表中，外部样式表通常存储在 CSS 文件中。
- 多个样式定义可层叠为一。

### CSS 基础语法

CSS 规则由两个主要的部分构成：选择器，以及一条或多条声明。

```css
selector {
  property1: value1;
  property2: value2;
  // ...
  propertyn: valueN;
}
```

- 选择器通常是您需要改变样式的 HTML 元素。
- 每条声明由一个属性和一个值组成。
- 属性（property）是您希望设置的样式属性（style attribute）。每个属性有一个值。属性和值被冒号分开。

颜色值的使用方式：

```js
p { color: red; }
p { color: #ff0000; }
p { color: #f00; }

p { color: rgb(255, 0, 0); }
p { color: rgb(100%, 0%, 0%); }
```

常用样式示例：

```css
body {
  color: #000;
  background: #fff;
  margin: 0;
  padding: 0;
  font-family: Georgia, serif, "sans serif";
}
```

注意：

- 如果值为若干单词，则要给值加引号。
- 如果要定义不止一个声明，则需要用分号将每个声明分开。
- 大多数样式表包含不止一条规则，而大多数规则包含不止一个声明。多重声明和空格的使用使得样式表更容易被编辑

### CSS 高级语法

#### 选择器分组

你可以对选择器进行分组，这样，被分组的选择器就可以分享相同的声明。用逗号将需要分组的选择器分开。

```js
h1,h2,h3,h4,h5,h6 {
  color: green;
}
```

#### 继承及其问题

根据 CSS，子元素从父元素继承属性。但是它并不总是按此方式工作。

幸运地是，你可以通过使用我们称为 "Be Kind to Netscape 4" 的冗余法则来处理旧式浏览器无法理解继承的问题。

```js
body  {
     font-family: Verdana, sans-serif;
     }

p, td, ul, ol, li, dl, dt, dd  {
     font-family: Verdana, sans-serif;
     }
```

### CSS 派生选择器

派生选择器允许你根据文档的上下文关系来确定某个标签的样式。

```css
li strong {
  font-style: italic;
  font-weight: normal;
}
```

```html
<p>
  <strong
    >我是粗体字，不是斜体字，因为我不在列表当中，所以这个规则对我不起作用</strong
  >
</p>

<ol>
  <li><strong>我是斜体字。这是因为 strong 元素位于 li 元素内。</strong></li>
  <li>我是正常的字体。</li>
</ol>
```

在上面的例子中，只有 li 元素中的 strong 元素的样式为斜体字。

### CSS id 选择器

id 选择器以 "#" 来定义。

```js
#red { color: red; }
#green { color: green; }
```

### CSS 类选择器

在 CSS 中，类选择器以一个点号显示：

```js
.center {text-align: center}
```

### CSS 属性选择器

可以为拥有指定属性的 HTML 元素设置样式，而不仅限于 class 和 id 属性。

| 选择器                | 描述                                                         |
| --------------------- | ------------------------------------------------------------ |
| [attribute]           | 用于选取带有指定属性的元素。                                 |
| [attribute=value]     | 用于选取带有指定属性和值的元素。                             |
| [attribute~=value]    | 用于选取属性值中包含指定词汇的元素。                         |
| [attribute \| =value] | 用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。 |
| [attribute^=value]    | 匹配属性值以指定值开头的每个元素。                           |
| [attribute$=value]    | 匹配属性值以指定值结尾的每个元素。                           |
| [attribute*=value]    | 匹配属性值中包含指定值的每个元素。                           |

### CSS 创建

插入样式表的方法有三种：

```js
// 1. 外部样式表
<head>
  <link rel="stylesheet" type="text/css" href="mystyle.css" />
</head>

// 2. 内部样式表
<head>
<style type="text/css">
  hr {color: sienna;}
  p {margin-left: 20px;}
  body {background-image: url("images/back40.gif");}
</style>
</head>

// 3. 内联样式
<p style="color: sienna; margin-left: 20px">
This is a paragraph
</p>
```

样式优先级：外部样式表 < 内部样式表 < 内联样式
