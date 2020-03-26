# Java基础

## 基础知识点

- Java的数据类型
  1. 基本数据类型
    1. byte，1字节，默认值 0，封装类 Byte 。
    1. short，2字节，默认值 0，封装类 Short 。
    1. int，4字节，默认值 0，封装类 Integer 。
    1. long，8字节，默认值 0l，封装类 Long 。
    1. float，4字节，默认值 0f，封装类 Float 。
    1. double，8字节，默认值 0d，封装类 Double 。
    1. boolean，1字节，默认值 false，封装类 Boolean 。
    1. char，2字节，某些字符需要2个char来表示。默认值 '\u0000'。封装类 Character 。
  1. 引用数据类型
    1. Object、String、List、Set、Map、数组等。
- Object类方法: equals()、hashCode() 、clone()、getClass()、wait()、notify()。
- HashMap原理，Hash冲突，并发集合，线程安全集合及实现原理。
- HashMap 和 HashTable 区别。
- ArrayList 与 LinkedList 区别与联系
- synchronized 原理
- volatile 实现原理

## Java高阶

- 线程相关
  - Java 多线程的实现方式
    1. 集成 Thread 类
    1. 实现 Runnable 接口
  - ThreadPool 的原理和用法
  - ThreadLocal 的原理和用法
- Java虚拟机，Java运行，Java GC机制（可达性分析法，引用计数法）
- Java对象的完整生命周期
- JVM内存模型
- 进程间通信，线程间通信
- JVM类加载机制
- 设计模式：除常用设计模式之外，特别的，反射机制，代理模式

