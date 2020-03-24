# git 使用文档整理

[Git Book 简体中文](https://git-scm.com/book/zh/v2)

## 基础

- [安装 git](https://git-scm.com/download/)
  直接使用默认配置进行安装就可以了。
- git 中的仓库分为`本地仓库`和`远程仓库`。

### git 常用 GUI 工具

推荐 [TortoiseGit](https://tortoisegit.org/download/)

### git 常用命令

`[]`包裹起来的表示命令可选参数

#### 初始化

[初次运行 git 前的配置](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%88%9D%E6%AC%A1%E8%BF%90%E8%A1%8C-Git-%E5%89%8D%E7%9A%84%E9%85%8D%E7%BD%AE)

1. 设置化用户名 `git config --global user.name "your name"`
1. 设置邮箱地址 `git config --global user.email "your email"`

- 全局设置 git 保存密码 `git config --global credential.helper store`
- 克隆项目 xxx `git clone xxx`

[.gitignore 文件设置 git 忽略的文件](https://git-scm.com/docs/gitignore)

## 日常使用

1. `git status`，查看本地仓库状态。
1. `git add -A`，暂存所有变化(modified、deleted、new)。
1. `git commit -am "message"`，将工作区的文件改动都提交到本地仓库。
1. `git fetch`，将服务端代码更新到 remote 分支。本地分支不变。
1. `git merge xxx` 将分支 xxx 合并到当前分支。
1. `git push`，将本地仓库的改动提交到服务端仓库。
1. `git pull [--rebase]`，将服务端仓库的状态同步到本地仓库。

### 合并分支

merge 操作很容易产生冲突(conflict)。建议不要在命令行解决冲突，而是通过 GUI 操作。如:TortoiseGit 等。

### 更新代码

建议通过`git pull --rebase`更新代码，减少 merge 的提交记录。

1. [git rebase 和 git merge 的区别](http://gitbook.liuhui998.com/4_2.html)
1. `git pull`相当于`git fetch && git merge`
1. `git pull --rebase`相当于`git fetch && git rebase`
1. `git pull --rebase`遇到冲突时的解决方法：
   1. 使用 TortoiseGit→Resolve 解决冲突，然后再使用`git rebase continue`完成 rebase 过程。
   1. 使用`git rebase abort`终止 rebase 过程，改为使用 merge 方式合并代码。

### git commit 规范

1. commit 信息尽量准确描述主要改动。
1. commit 规范参考:
   1. [angular 的 commit 规范](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)
   1. git commit 的工具[commitizen](https://www.jianshu.com/p/856bbb5ed9ec)

## gitflow 工作流

[使用 gitflow 工作流](https://www.cnblogs.com/myqianlan/p/4195994.html)

> gitflow 工作流分支管理规范

分支名中的 xxx 是版本代号。可用版本号或英文单词。

1. master 主分支，长期保留。
1. develop 开发分支，从 master 创建，长期保留。
1. feature/xxx 功能分支。
   1. 从 develop 创建。功能开发完成前不做合并操作。
   1. 功能开发完成后，合并回 develop，自测并修改测试出的 bug。
   1. 合并回 develop 后可删除 feature/xxx 分支。
1. release/xxx 发布分支。
   1. 从 develop 创建。修改为正式环境配置。
   1. 版本发布完成后：
      1. 合并到 develop 和 master 。
      1. 在 master 上生成 tag 记录。
      1. 可删除 release/xxx 。
1. hotfix/xxx 线上 bug 修复分支。
   1. 从 master 分支创建。
   1. 修复完成后合并回 master，并删除 hotfix/xxx 分支。

![gitflow工作流feature分支流程](./img/gitflow-release.png)

> tag 管理规范

1. v 加三位数的数字版本号，如：v1.0.0、v1.1.0
1. 三个数字从左往右依次代表：大版本号，小版本号，bugfix 版本号或特殊小版本号

## 命令行使用 git

### 常用操作

- `git init` 将本地文件夹初始化文 git 本地仓库，可以执行除了操作远程仓库外的所有 git 操作。也可以在之后添加远程仓库地址。
- `git clone` 将远程仓库克隆到本地仓库
- git pull 从远程仓库更新文件到本地仓库，并会自动生成一个 merge 的记录
- git pull --rebase 从远程仓库更新文件到本地仓库，不会自动生成 merge 记录
- git push 提交到远程仓库
- git status 查看本地仓库状态
- git add --all 文件添加到本地仓库记录
- git commit -am [message] 提交代码
- `git stash save [message]` 暂存代码
- `git stash list` 查看暂存的代码
- `git stash pop [index]` 还原暂存的代码，并在 stash list 中删除这条暂存记录。index 是需要使用的暂存记录在`git stash list`中的索引位置，如：0,1 等。

### 分支操作

\$Branch 代表分支名

- git branch 查看本地分支
- git branch -all 查看所有分支
- git branch -d \$Branch 删除分支
- git checkout \$Branch 切换本地分支
- git checkout -b \$Branch remotes/origin/\$Branch 创建分支，并对应到远端的分支

### 暂存操作 stash

- git stash save [message] 保存当前工作进度，会把暂存区和工作区的改动保存起来。
- git stash list 显示保存进度的列表。
- git stash pop [index] 恢复进度到工作区，并删除进度。
- git stash apply [index] 除了不删除恢复的进度之外，其余和 git stashpop 命令一样。
- git stash drop [stash_id] 删除一个存储的进度。默认删除最新的存储进度。
- git stash clear 删除所有存储的进度。

### tag 操作

- git tag -a v0.1.2 -m "0.1.2 版本"创建附注标签
- git push origin –tags 将本地所有标签一次性提交到 git 服务器
- git checkout [tagname] 切换到标签
- git show 查看标签的版本信息

### 其他

- git log --pretty=format:"%ad-%s-%an%d" --date=format:%c-5 查看前 5 条日志
- git clean -df 删除忽略的文件和目录

## WebStorm 或 IntelliJ IDEA 中使用 git 插件

1. 在 WebStorm 中配置 git ：
   File→Version Control→git→Path to git executable
1. 更新代码：
   VCS→Update Project(`勾选 Rebase`)→OK
1. 提交代码到本地仓库
   VCS→Commit（有一些可选功能：Before Commit 分组和 After Commit 分组，最好`开启代码检测和 TODO 检测`）
1. 将本地仓库的代码推送到远程仓库
   VCS→git→Push
1. 分支操作，新建分支、切换分支、删除分支、merge 或 rebase 等。
   VCS→git Branches
1. 代码暂存
   VCS→git→Stash Changes
   恢复使用暂存的代码
   VCS→git→UnStash Changes→ 在 StashList 中选中需要的代码
   也可以使用 VCS→Shelve Changes 暂存本地代码
1. 撤销本地代码的改动
   VCS→git→Revert
1. 查看代码提交记录，先选中项目根目录
   VCS→git→Show History
1. 其他 git 操作大部分都可以在 VCS→git 中找到，如：git reset、git patch 等。

## 资料

- [初次运行 Git 前的配置](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%88%9D%E6%AC%A1%E8%BF%90%E8%A1%8C-Git-%E5%89%8D%E7%9A%84%E9%85%8D%E7%BD%AE)
- [git 基础](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-Git-%E5%9F%BA%E7%A1%80)
- [获取 git 仓库](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%8E%B7%E5%8F%96-Git-%E4%BB%93%E5%BA%93)
- [git rebase](http://gitbook.liuhui998.com/4_2.html)
- [git 分支](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%AE%80%E4%BB%8B)
- [git 补丁](https://git-scm.com/book/zh/v2/%E9%99%84%E5%BD%95-C%3A-Git-%E5%91%BD%E4%BB%A4-%E8%A1%A5%E4%B8%81)
