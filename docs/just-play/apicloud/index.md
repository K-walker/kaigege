# vue+apicloud

这是一个基于 AMD 规范，封装的一个 vue+apicloud 的移动端框架模板，内置了很多常用模块: db , http , crypto（加解密工具包含 RSA , DES , AES , MD5,SHA 等） , fs （文件操作） , i18n（国际化） 等，另外还提供了一些公共方法（utils.js），方便大家的开发，避免重复造轮子。

这里稍微说明一下，如果你想使用 APICLOUD 官方打包时的加密功能，对源代码进行加密，请参考官方[代码加密规范](https://docs.apicloud.com/Dev-Guide/Code-Specification)来命名文件（我这里文件的命名都是按照官方要求命名的），另外加密时只会对后缀名是 `*.js , *.html , *.css` 的文件进行加密，其他格式文件则不进行加密

> 如需运行项目，请先引入官方模块 `db , fs , zip , UIMediaScanner` ，项目中包含数据库，文件，网络请求，加解密等操作的示例代码，请仔细阅读。

## 项目结构 (以下为主要目录结构)

```
VueApicloud
    |-css
    |-html
    |-image
    |-res
        |-lang
          |-enus.json
          |-zhcn.json
    |-script
        |-components
          |-dropdown.js
        |-config
          |-apiconfig.js
          |-envconfig.js
          |-requireconfig.js
          |-tableconfig.js
        |-lib
        |-modules
          |-chi18n.js
          |-cryptoutils.js
          |-db.js
          |-fs.js
          |-http.js
          |-utils.js
    |-config.xml
```

## 目录结构说明

1. res/lang : 存放国际化语言文件
2. script/components : 存放一些公共组件
3. script/config : 这个目录下有三个配置文件，分别为 :
   1. apiconfig.js：api 接口配置
   2. envconfig.js: 项目环境配置
   3. requireconfig.js: 模块加载的配置
   4. tableconfig.js: 数据库表的配置
4. script/lib : 第三方包
5. script/modules : 项目中常用的公共模块
   1. chi18n.js: 加载国际化文件的模块
   2. cryptoutils.js: 加解密模块
   3. db.js: 数据库操作模块
   4. fs.js: 文件操作模块
   5. http.js: http 请求模块
   6. utils.js:常用公共方法模块

## 使用

首先需要在 `requireconfig.js` 文件中配置项目中所需要用的 js 库和模块 （如何配置请阅读[requirejs](https://requirejs.org/)了解）`envconfig.js` 中包含一些关于项目的配置，如:开发环境，数据库，模拟账号等配置。`tableconfig.js` 则是用来定义表结构，具体定义方式，参考 `tableconfig.js` 中示例代码

### 使用示例

```html
<script src="../script/config/requireconfig.js"></script>
<script src="../script/lib/require.js"></script>
<script>
  apiready = function () {
    // 加载require配置 参数 requireConfig
    require.config(requireConfig);
    // 加载当前页面所需模块
    require(["vue", "db"], function (Vue, db) {
      new Vue({
        el: "#app",
        data: {},
        created: function () {
          // 初始化数据库，且仅需在项目中只调用这一次
          db.open();
        },
      });
    });
  };
</script>
```

## 开发中需要注意的细节

1. 在使用数据库之前，一定要先调用 db.open() 初始化数据库（且仅需在项目中只调用这一次）
2. 向数据库表中插入数据的时候要先初始化表(详见 db.html)
3. 后台返回的需要存储的字段需与表字段一一对应
4. 如果后台接口中新增了字段，记得在插入数据之前检查一下是否有新增字段(详见 db.html)
5. 由于每个项目组接口返回的格式可能不一样，在确定好返回格式之后， 要修改下 httpPromise.js 文件中 handleResponse 中的处理方式，以及在发送请求时的配置设置，已我当前项目为例：

```json
// 接口返回格式
{
  "msg": "success", // msg 为success则成功，其他则失败
  "data": [] // 接口返回的具体数据Array或Object
}
```

当前请求方式(非表单提交): `Content-Type:'appplication/json'` ， body 为 json 对象或字符串详细配置请参考 apicloud [ajax 配置](https://docs.apicloud.com/Client-API/api#3) 注意，这里的请求方式需与后台协商好，本项目中只是一个示例，根据你自己实际情况进行修改

6. 由于接口请求使用了 `RSA+AES` 的数据加密模式，因此每个接口的公私钥统一由后台生成，公钥提前告诉前端（参考 apiconfig.js 配置）

[Git 源码下载](https://github.com/K-walker/VueApicloud)
