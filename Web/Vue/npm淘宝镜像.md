# nmp 使用淘宝镜像

[淘宝 npm 网址](https://npm.taobao.org/)

## 通过 npm 使用

修改

```cmd
npm config set registry http://registry.npm.taobao.org/
```

还原

```cmd
npm config set registry https://registry.npmjs.org/
```

### 使用 cnpm

```cmd
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
