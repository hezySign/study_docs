# C 语言基础

## 资料

[C 数据类型](https://www.runoob.com/cprogramming/c-data-types.html)

## 一. C 语言包含的数据类型

1. 基本类型
   1. 数值类型
      1. 整型
         1. 短整型 short
         2. 整型 int
         3. 长整型 long
      2. 浮点型
         1. 单精度型 float
         2. 双精度型 double
   2. 字符类型 char
2. 构造类型
   1. 数组
   2. 结构体 struct
   3. 共用体 union
   4. 枚举类型 enum
3. 指针类型
4. void

short、int、long、char、float、double 这六个关键字代表 C 语言里的六种基本数据类型。

在不同的系统上，这些类型占据的字节长度是不同的：

在 32 位的系统上

- short 占据的内存大小是 2 个 byte；
- int 占据的内存大小是 4 个 byte；
- long 占据的内存大小是 4 个 byte；
- float 占据的内存大小是 4 个 byte；
- double 占据的内存大小是 8 个 byte；
- char 占据的内存大小是 1 个 byte。

具体可以用 sizeof 测试一下即可。
