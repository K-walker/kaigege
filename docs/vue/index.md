# 生命周期

所有的生命周期自动绑定 this 上下文到实例中，但不能通过**箭头函数**的方式来声明生命周期方法

> `created: () => {}`
> 这是因为箭头函数绑定了父上下文，不再是 Vue 的实例

组件首次渲染时会调用以下 4 个生命周期方法:

- beforeCreate
- created
- beforeMount
- mounted

## beforeCreate

在 `created` 之前被调用，因此还无法访问数据，属性和方法

## created

Vue 实例创建完成后立即被调用，此时实例已完成如下配置：

- 数据观测（data observer）
- property 和 方法的运算
- watch/event 事件回调

但是还没有挂载到 dom 上, `$el` 属性目前不可用

## beforeMount

在**挂载**开始前被调用，相关的**render**方法被调用

## mounted

实例挂载后调用，此时 `$el` 被新创建的 `vm.$el` 替换

注意 `mounted` 不能保证所有子组件被全部被挂载，如果你希望视图整个渲染完毕，
可以再 `mounted` 内部使用 `vm.$nextTick`

```js
mounted () {
   this.$nextTick(function() {
       // 所有视图已渲染完毕
       // TODO
   })
}
```

## beforeUpdate

在数据更新时调用，但虚拟 DOM 还没有打补丁，什么意思呢？就是数据更新了，但是虚拟 DOM 还没有更新
因此可以再这个回调里，访问现有的 DOM

## updated

数据更新，导致虚拟 DOM 重新渲染和打完补丁之后调用，此时组件 DOM 已经更新

注意 `update` 也不会保证所有子组件被重绘，如果希望监听整个视图重绘完毕，请使用 `vm.$nextTick`

## activated

被 keep-alive 缓存的组件激活时调用

## deactivated

被 keep-alive 缓存的组件停用时调用

## beforeDestroy

实例销毁之前，此时实例还可用

## destroyed

实例销毁之后调用，此时 Vue 实例所有指令被解绑，事件监听被移除，子组件实例也被销毁

## errorCaptured（config.errorHandler 全局错误捕捉）

捕获来自子孙组件的错误时被调用，返回 `false` 可以组织错误继续向上传播
