# 面试题Android

## 目录

1. Android 基础&性能优化&Framwork
2. Android 模块化&热修复&热更新&打包&混淆&压缩
3. 音视频&FFmpeg&播放器

## 1、Android 基础&性能优化&Framwork

### Activity 启动模式

- standard 标准模式
- singleTop 栈顶复用模式，
    - 推送点击消息界面
- singleTask 栈内复用模式，
    - 首页
- singleInstance 单例模式，单独位于一个任务栈中
    - 拨打电话界面
    - 细节：
    - taskAffinity：任务相关性，用于指定任务栈名称，默认为应用包名
    - allowTaskReparenting：允许转移任务栈

### View 工作原理

- DecorView (FrameLayout)
    - LinearLayout
        - titlebar
        - Content
        - 调用 setContentView 设置的 View

ViewRoot 的 performTraversals 方法调用触发开始 View 的绘制，然后会依次调用:

- performMeasure：遍历 View 的 measure 测量尺寸
- performLayout：遍历 View 的 layout 确定位置
- performDraw：遍历 View 的 draw 绘制

### View 绘制流程

1. onMeasure(), 测量View的大小
    - MeasureSpec是一个大小跟模式的组合int值, 前两位是mode，后面的是值。共有三种模式:
        1. UPSPECIFIED, 0, 父容器对于子容器没有任何限制,子容器想要多大就多大.
        2. EXACTLY, -1, 父容器已经为子容器设置了尺寸,子容器应当服从这些边界,不论子容器想要多大的空间。
        3. AT_MOST, -2, 子容器可以是声明大小内的任意大小。
2. onLayout(), 根据子视图的大小以及布局参数将View树放到合适的位置上。
3. onDraw(), 绘制View
    1. 绘制背景
    2. 必要时，保存 canvas layers，为 fading 效果做准备
    3. 绘制当前 view 的内容
    4. 绘制子 View
    5. 必要时，绘制 fading edge 并还原 canvas layers
    6. 绘制装饰效果（scrollbars）

### 事件分发机制

- 一个 MotionEvent 产生后，按 Activity -> Window -> decorView -> View 顺序传递，View 传递过程就是事件分发，主要依赖三个方法:
    - dispatchTouchEvent：用于分发事件，只要接受到点击事件就会被调用，返回结果表示是否消耗了当前事件
    - onInterceptTouchEvent：用于判断是否拦截事件，当 ViewGroup 确定要拦截事件后，该事件序列都不会再触发调用此 ViewGroup 的 onIntercept
    - onTouchEvent：用于处理事件，返回结果表示是否处理了当前事件，未处理则传递给父容器处理

细节：

- 一个事件序列只能被一个 View 拦截且消耗
- View 没有 onIntercept 方法，直接调用 onTouchEvent 处理
- OnTouchListener 优先级比 OnTouchEvent 高，onClickListener 优先级最低
- requestDisallowInterceptTouchEvent 可以屏蔽父容器 onIntercet 方法的调用

### Window 、 WindowManager、WMS、SurfaceFlinger

- Window：抽象概念不是实际存在的，而是以 View 的形式存在，通过 PhoneWindow 实现
- WindowManager：外界访问 Window 的入口，内部与 WMS 交互是个 IPC 过程
- WMS：管理窗口 Surface 的布局和次序，作为系统级服务单独运行在一个进程
- SurfaceFlinger：将 WMS 维护的窗口按一定次序混合后显示到屏幕上

### View 动画、帧动画及属性动画

View 动画：

- 作用对象是 View，可用 xml 定义，建议 xml 实现比较易读
- 支持四种效果：平移、缩放、旋转、透明度

帧动画：

- 通过 AnimationDrawable 实现，容易 OOM

属性动画：

- 可作用于任何对象，可用 xml 定义，Android 3 引入，建议代码实现比较灵活
- 包括 ObjectAnimator、ValuetAnimator、AnimatorSet
- 时间插值器：根据时间流逝的百分比计算当前属性改变的百分比
- 系统预置匀速、加速、减速等插值器
- 类型估值器：根据当前属性改变的百分比计算改变后的属性值
- 系统预置整型、浮点、色值等类型估值器

使用注意事项：

- 避免使用帧动画，容易OOM
- 界面销毁时停止动画，避免内存泄漏
- 开启硬件加速，提高动画流畅性 ，硬件加速：
- 将 cpu 一部分工作分担给 gpu ，使用 gpu 完成绘制工作
- 从工作分摊和绘制机制两个方面优化了绘制速度

### Handler、MessageQueue、Looper

- Handler：开发直接接触的类，内部持有 MessageQueue 和 Looper
- MessageQueue：消息队列，内部通过单链表存储消息
- Looper：内部持有 MessageQueue，循环查看是否有新消息，有就处理，没就阻塞
- 如何实现阻塞：通过 nativePollOnce 方法，基于 Linux epoll 事件管理机制
- 为什么主线程不会因为 Looper 阻塞：系统每 16ms 会发送一个刷新 UI 消息唤醒

### MVC、MVP、MVVM

- MVP：Model：处理数据；View：控制视图；Presenter：分离 Activity 和 Model
- MVVM：Model：处理获取保存数据；View：控制视图；ViewModel：数据容器
    - 使用 Jetpack 组件架构的 LiveData、ViewModel 便捷实现 MVVM

### Serializable、Parcelable

- Serializable ：Java 序列化方式，适用于存储和网络传输，serialVersionUID 用于确定反序列化和类版本是否一致，不一致时反序列化回失败
- Parcelable ：Android 序列化方式，适用于组件通信数据传递，性能高，因为不像 Serializable 一样有大量反射操作，频繁 GC

### Binder

- Android 进程间通信的中流砥柱，基于客户端-服务端通信方式
- 使用 mmap 一次数据拷贝实现 IPC，传统 IPC：用户A空间->内核->用户B空间；mmap 将内核与用户B空间映射，实现直接从用户A空间->用户B空间
- BinderPool 可避免创建多 Service

### IPC 方式

- Intent extras、Bundle：要求传递数据能被序列化，实现 Parcelable、Serializable ，适用于四大组件通信
- 文件共享：适用于交换简单的数据实时性不高的场景
- AIDL：AIDL 接口实质上是系统提供给我们可以方便实现 BInder 的工具
    - Android Interface Definition Language，可实现跨进程调用方法
    - 服务端：将暴漏给客户端的接口声明在 AIDL 文件中，创建 Service 实现 AIDL 接口并监听客户端连接请求
    - 客户端：绑定服务端 Service ，绑定成功后拿到服务端 Binder 对象转为 AIDL 接口调用
    - RemoteCallbackList 实现跨进程接口监听，同个 Binder 对象做 key 存储客户端注册的 listener
    - 监听 Binder 断开：1.Binder.linkToDeath 设置死亡代理；2. onServiceDisconnected 回调
- Messenger：基于 AIDL 实现，服务端串行处理，主要用于传递消息，适用于低并发一对多通信
- ContentProvider：基于 Binder 实现，适用于一对多进程间数据共享
- Socket：TCP、UDP，适用于网络数据交换

### Android 系统启动流程

- 按电源键 -> 加载引导程序 BootLoader 到 RAM -> 执行 BootLoader 程序启动内核 -> 启动 init 进程 -> 启动 Zygote 和各种守护进程 ->
- 启动 System Server 服务进程开启 AMS、WMS 等 -> 启动 Launcher 应用进程

### App 启动流程

Launcher 中点击一个应用图标 -> 通过 AMS 查找应用进程，若不存在就通过 Zygote 进程 fork

### 进程保活

- 进程优先级：1.前台进程 ；2.可见进程；3.服务进程；4.后台进程；5.空进程
- 进程被 kill 场景：1.切到后台内存不足时被杀；2.切到后台厂商省电机制杀死；3.用户主动清理
- 保活方式：
    - 1.Activity 提权：挂一个 1像素 Activity 将进程优先级提高到前台进程
    - 2.Service 提权：启动一个前台服务（API>18会有正在运行通知栏）
    - 3.广播拉活
    - 4.Service 拉活
    - 5.JobScheduler 定时任务拉活
    - 6.双进程拉活

### 网络优化及检测

- 速度：1.GZIP 压缩（okhttp 自动支持）；2.Protocol Buffer 替代 json；3.优化图片/文件流量；4.IP 直连省去 DNS 解析时间
- 成功率：1.失败重试策略；
- 流量：1.GZIP 压缩（okhttp 自动支持）；2.Protocol Buffer 替代 json；3.优化图片/文件流量；5.文件下载断点续传 ；6.缓存
- 协议层的优化，比如更优的 http 版本等
- 监控：Charles 抓包、Network Monitor 监控流量

### UI卡顿优化

- 减少布局层级及控件复杂度，避免过度绘制
- 使用 include、merge、viewstub
- 优化绘制过程，避免在 Draw 中频繁创建对象、做耗时操作

### 内存泄漏场景及规避

1. 静态变量、单例强引跟生命周期相关的数据或资源，包括 EventBus
2. 游标、IO 流等资源忘记主动释放
3. 界面相关动画在界面销毁时及时暂停
4. 内部类持有外部类引用导致的内存泄漏

- handler 内部类内存泄漏规避：1.使用静态内部类+弱引用 2.界面销毁时清空消息队列
- 检测：Android Studio Profiler

### LeakCanary 原理

- 通过弱引用和引用队列监控对象是否被回收
- 比如 Activity 销毁时开始监控此对象，检测到未被回收则主动 gc ，然后继续监控

### OOM 场景及规避

- 加载大图：减小图片
- 内存泄漏：规避内存泄漏

## 2、Android 模块化&热修复&热更新&打包&混淆&压缩

### Dalvik 和 ART

#### Dalvik

- 谷歌设计专用于 Android 平台的 Java 虚拟机，可直接运行 .dex 文件，适合内存和处理速度有限的系统
- JVM 指令集是基于栈的；Dalvik 指令集是基于寄存器的，代码执行效率更优

#### ART

- Dalvik 每次运行都要将字节码转换成机器码；ART 在应用安装时就会转换成机器码，执行速度更快
- ART 存储机器码占用空间更大，空间换时间

### APK 打包流程

1. aapt 打包资源文件生成 R.java 文件；aidl 生成 java 文件
2. 将 java 文件编译为 class 文件
3. 将工程及第三方的 class 文件转换成 dex 文件
4. 将 dex 文件、so、编译过的资源、原始资源等打包成 apk 文件
5. 签名
6. 资源文件对齐，减少运行时内存

### App 安装过程

- 首先要解压 APK，资源、so等放到应用目录
- Dalvik 会将 dex 处理成 ODEX ；ART 会将 dex 处理成 OAT；
- OAT 包含 dex 和安装时编译的机器码

### 组件化路由实现

ARoute：通过 APT 解析 @Route 等注解，结合 JavaPoet 生成路由表，即路由与 Activity 的映射关系

## 3、音视频&FFmpeg&播放器

#### FFmpeg

基于命令方式实现了一个音视频编辑 App：
https://github.com/yhaolpz/FFmpegCmd

集成编译了 AAC、MP3、H264 编码器

#### 播放器原理

视频播放原理：（mp4、flv）-> 解封装 -> （mp3/aac、h264/h265）-> 解码 -> （pcm、yuv）-> 音视频同步 -> 渲染播放

音视频同步：

- 选择参考时钟源：音频时间戳、视频时间戳和外部时间三者选择一个作为参考时钟源（一般选择音频，因为人对音频更敏感，ijk 默认也是音频）
- 通过等待或丢帧将视频流与参考时钟源对齐，实现同步

#### IjkPlayer 原理

集成了 MediaPlayer、ExoPlayer 和 IjkPlayer 三种实现，其中 IjkPlayer 基于 FFmpeg 的 ffplay

音频输出方式：AudioTrack、OpenSL ES；视频输出方式：NativeWindow、OpenGL ES

