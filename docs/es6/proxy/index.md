# Proxy

Proxy 可以理解成，在目标对象之前架设一层拦截，可以对外界的访问进行过滤或者拦截，类似于拦截器，这里用来表示代理某些操作
注意 要使 Proxy 起作用，必须针对 Proxy 的实例进行操作，而不是针对目标对象(下面的空对象{}) 进行操作
如果没有设置 handler ，等同于直接操作原对象

```js
// let proxy = new Proxy(target, handle)

let proxy = new Proxy(
  {},
  {
    get: function (target, propKey, receiver) {
      return 35;
    },
    set: function (target, propKey, value, receiver) {
      return Reflect.set(target, propKey, value, receiver);
    },
  }
);
```

`receiver` 总是指向 `Proxy` 的实例 `proxy`

## this 问题

Proxy 代理的情况下，目标对象内部的 this 会指向 Proxy 代理。

```js
const target = {
  print: function () {
    console.log(this === proxy);
  },
};

const proxy = new Proxy(target, {});

target.print(); // false
proxy.print(); // true
```

上面代码中 proxy 代理了 target ，所以 target 内部的 this 便指向了 proxy,
因此 proxy.print() 打印为 true

此外有些原生对象的内部属性，只有通过正确的 this 才能访问，即使 Proxy 代理了也无法代理这些原生属性

```js
const date = new Date();
const proxy = new Proxy(date, {});
proxy.getTime();
// TypeError: this is not a Date object.
```

上面的代码，由于 proxy 代理了 date ，this 指向了 proxy，因此通过 proxy.getTime() 无法访问 getTime 方法

```js
const date = new Date();

const proxy = new Proxy(date, {
  get: function (target, propKey) {
    // 重新将this绑定到原始对象
    return target[propKey].bind(target);
  },
});
```

## 应用场景

### Web 服务的客户端

Proxy 可以代理目标对象的任意属性，因此可以来写客户端的一些请求

```js
const api = createApi("http://example.com/api");
// 获取用户数据
api.users().then((json) => {
  console.log("用户", json);
});
// 获取文章数据
api.articles().then((json) => {
  console.log("文章", json);
});
```

Proxy 可以代理 api 对象上的任何属性，因此可以通过 Proxy 统一处理

```js
function createApi(baseUrl) {
  return new Proxy(
    {},
    {
      get: function (target, key) {
        // key 'articles or users or xxxx'
        return () => httpRequest(baseUrl + "/" + key);
      },
    }
  );
}

const api = createApi("http://example.com/api");

api.articles().then();
api.users().then();
api.xxxx().then();
```

思考利用 Proxy 实现数据库的 ORM 层
