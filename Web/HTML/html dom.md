# HTML DOM

## DOM

文档对象模型 DOM （Document Object Model）定义了访问和操作 HTML 文档的标准。

### HTML DOM 方法和属性

一些常用的 HTML DOM 方法：

- getElementById(id) - 获取带有指定 id 的节点（元素）
- appendChild(node) - 插入新的子节点（元素）
- removeChild(node) - 删除子节点（元素）

一些常用的 HTML DOM 属性：

- innerHTML - 节点（元素）的文本值
- parentNode - 节点（元素）的父节点
- childNodes - 节点（元素）的子节点
- attributes - 节点（元素）的属性节点

### HTML DOM 修改

- 修改 HTML DOM 意味着许多不同的方面：
- 改变 HTML 内容
- 改变 CSS 样式
- 改变 HTML 属性
- 创建新的 HTML 元素
- 删除已有的 HTML 元素
- 改变事件（处理程序）

使用 document.write() 向输出流写 HTML

```js
<!DOCTYPE html>
<html>
  <body>
    <script type="text/javascript">
      document.write("<h1>Hello World!</h1>")
    </script>
  </body>
</html>
```

### HTML DOM 事件

HTML DOM 允许 JavaScript 对 HTML 事件作出反应。

当用户点击时，会改变 \<h1> 元素的内容：

```js
<!DOCTYPE html>
<html>
<body>
<h1 onclick="this.innerHTML='hello!'">请点击这段文本!</h1>
</body>
</html>
```
