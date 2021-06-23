# Redux 源码解析

## createStore(reducer, preloadedState?, enhancer?)

```ts
function createStore(reducer, preloadedState, enhancer) {
  // 省略...
  if (enhancer) {
    enhancer(createStore)(reducer, preloadedState);
  }
  // 初始化
  dispatch({ type: ActionTypes.INIT });
  // 省略...
  return {
    dispatch,
    getState,
  };
}
```

## applyMiddleware

```ts
function applyMiddleware(...middlewares) {
  return (createStore) => {
    // 创建store
    const store = createStore();

    const middlewareAPI: MiddlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    // compose 方法很巧妙
    dispatch = compose<typeof dispatch>(...chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
}
```

## 中间件代码格式

中间件是一个函数,默认会传入 getState 和 dispatch 两个参数供中间件使用

### thunk

```ts
// 核心代码
function thunkMiddleware({ getState, dispatch }) {
  return (next) => (action) => next(action);
}
```

### createLogger

```ts
// 核心代码
function createLogger({ getState }) {
  return (next) => (action) => {
    // TODO 处理中间件逻辑
  };
}
```
