(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{451:function(t,e,a){"use strict";a.r(e);var s=a(42),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"生命周期"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生命周期"}},[t._v("#")]),t._v(" 生命周期")]),t._v(" "),a("p",[t._v("所有的生命周期自动绑定 this 上下文到实例中，但不能通过"),a("strong",[t._v("箭头函数")]),t._v("的方式来声明生命周期方法")]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("created: () => {}")]),t._v("\n这是因为箭头函数绑定了父上下文，不再是 Vue 的实例")])]),t._v(" "),a("p",[t._v("组件首次渲染时会调用以下 4 个生命周期方法:")]),t._v(" "),a("ul",[a("li",[t._v("beforeCreate")]),t._v(" "),a("li",[t._v("created")]),t._v(" "),a("li",[t._v("beforeMount")]),t._v(" "),a("li",[t._v("mounted")])]),t._v(" "),a("h2",{attrs:{id:"beforecreate"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#beforecreate"}},[t._v("#")]),t._v(" beforeCreate")]),t._v(" "),a("p",[t._v("在 "),a("code",[t._v("created")]),t._v(" 之前被调用，因此还无法访问数据，属性和方法")]),t._v(" "),a("h2",{attrs:{id:"created"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#created"}},[t._v("#")]),t._v(" created")]),t._v(" "),a("p",[t._v("Vue 实例创建完成后立即被调用，此时实例已完成如下配置：")]),t._v(" "),a("ul",[a("li",[t._v("数据观测（data observer）")]),t._v(" "),a("li",[t._v("property 和 方法的运算")]),t._v(" "),a("li",[t._v("watch/event 事件回调")])]),t._v(" "),a("p",[t._v("但是还没有挂载到 dom 上, "),a("code",[t._v("$el")]),t._v(" 属性目前不可用")]),t._v(" "),a("h2",{attrs:{id:"beforemount"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#beforemount"}},[t._v("#")]),t._v(" beforeMount")]),t._v(" "),a("p",[t._v("在"),a("strong",[t._v("挂载")]),t._v("开始前被调用，相关的"),a("strong",[t._v("render")]),t._v("方法被调用")]),t._v(" "),a("h2",{attrs:{id:"mounted"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mounted"}},[t._v("#")]),t._v(" mounted")]),t._v(" "),a("p",[t._v("实例挂载后调用，此时 "),a("code",[t._v("$el")]),t._v(" 被新创建的 "),a("code",[t._v("vm.$el")]),t._v(" 替换")]),t._v(" "),a("p",[t._v("注意 "),a("code",[t._v("mounted")]),t._v(" 不能保证所有子组件被全部被挂载，如果你希望视图整个渲染完毕，\n可以再 "),a("code",[t._v("mounted")]),t._v(" 内部使用 "),a("code",[t._v("vm.$nextTick")])]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mounted")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$nextTick")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 所有视图已渲染完毕")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// TODO")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("h2",{attrs:{id:"beforeupdate"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#beforeupdate"}},[t._v("#")]),t._v(" beforeUpdate")]),t._v(" "),a("p",[t._v("在数据更新时调用，但虚拟 DOM 还没有打补丁，什么意思呢？就是数据更新了，但是虚拟 DOM 还没有更新\n因此可以再这个回调里，访问现有的 DOM")]),t._v(" "),a("h2",{attrs:{id:"updated"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#updated"}},[t._v("#")]),t._v(" updated")]),t._v(" "),a("p",[t._v("数据更新，导致虚拟 DOM 重新渲染和打完补丁之后调用，此时组件 DOM 已经更新")]),t._v(" "),a("p",[t._v("注意 "),a("code",[t._v("update")]),t._v(" 也不会保证所有子组件被重绘，如果希望监听整个视图重绘完毕，请使用 "),a("code",[t._v("vm.$nextTick")])]),t._v(" "),a("h2",{attrs:{id:"activated"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#activated"}},[t._v("#")]),t._v(" activated")]),t._v(" "),a("p",[t._v("被 keep-alive 缓存的组件激活时调用")]),t._v(" "),a("h2",{attrs:{id:"deactivated"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deactivated"}},[t._v("#")]),t._v(" deactivated")]),t._v(" "),a("p",[t._v("被 keep-alive 缓存的组件停用时调用")]),t._v(" "),a("h2",{attrs:{id:"beforedestroy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#beforedestroy"}},[t._v("#")]),t._v(" beforeDestroy")]),t._v(" "),a("p",[t._v("实例销毁之前，此时实例还可用")]),t._v(" "),a("h2",{attrs:{id:"destroyed"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#destroyed"}},[t._v("#")]),t._v(" destroyed")]),t._v(" "),a("p",[t._v("实例销毁之后调用，此时 Vue 实例所有指令被解绑，事件监听被移除，子组件实例也被销毁")]),t._v(" "),a("h2",{attrs:{id:"errorcaptured-config-errorhandler-全局错误捕捉"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#errorcaptured-config-errorhandler-全局错误捕捉"}},[t._v("#")]),t._v(" errorCaptured（config.errorHandler 全局错误捕捉）")]),t._v(" "),a("p",[t._v("捕获来自子孙组件的错误时被调用，返回 "),a("code",[t._v("false")]),t._v(" 可以组织错误继续向上传播")])])}),[],!1,null,null,null);e.default=r.exports}}]);