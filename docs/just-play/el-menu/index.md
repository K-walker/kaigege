# el-menu

相信大家在使用 **Element UI** 中 **el-menu** 组件的时候，都碰到过如何通过数据动态渲染的问题，而官方的文档却没有这个实例，网上找的一些博客大部分人都实现了 **el-menu** 的垂直模式，而水平模式却没有，并且垂直模式的 **el-menu** 在收缩的时候会出现问题，但是他们并没有去解决，让我很苦恼，没办法，只能自己去解决了，先给大家看看效果先：

![效果图](https://img-blog.csdnimg.cn/20190108215947709.gif)

如上所示，水平和垂直模式的 el-menu 都一实现，而且垂直的 el-menu 收缩也正常，下面给大家贴上代码：

## 水平 el-menu

水平模式的 el-menu 主要分为两个 js 文件：

1.  ch-horizonal-menu.js
2.  ch-horizonal-menu-item.js

### ch-horizonal-menu.js

```javascript
(function (root, factory) {
  if (typeof exports === "object") {
    module.exports = exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory());
  } else {
    root.chHorizonalMenu = factory();
  }
})(this, function () {
  let chHorizonalMenu = {
    template:
      '<ul class="ch-horizonal-menu" :style="{backgroundColor:backgroundColor}">' +
      "<ch-horizonal-menu-item " +
      ':menus="data" ' +
      ':active-text-color="activeTextColor"' +
      ':background-color="backgroundColor"' +
      ':activeId="activeId"' +
      '@item-click="itemClick">' +
      "</ch-horizonal-menu-item>" +
      "</ul>",
    props: {
      data: {
        type: Array,
        default: function () {
          return [];
        },
      },
      backgroundColor: {
        type: String,
        default: "rgb(46, 50, 61)",
      },
      activeTextColor: {
        type: String,
        default: "rgb(255, 208, 75)",
      },
    },
    data: function () {
      return {
        activeId: null,
        submenuIds: [],
      };
    },
    methods: {
      itemClick: function (params) {
        this.activeId = params.id;
        this.removeActive();
        this.$emit("item-click", params);
      },
      removeActive: function () {
        var _this = this;
        var activeNodes = this.$el.getElementsByClassName("is_active");
        [].slice.call(activeNodes).forEach(function (el) {
          el.className = el.className.replace(/ is_active/, "");
          el.style.color = "#fff";
        });
      },
    },
  };
  return {
    name: "ch-horizonal-menu",
    template: chHorizonalMenu,
  };
});
```

### ch-horizonal-menu-item.js

```javascript
(function (root, factory) {
  if (typeof exports === "object") {
    module.exports = exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory());
  } else {
    root.chHorizonalMenuItem = factory();
  }
})(this, function () {
  let chHorizonalMenuItem = {
    template:
      "<div>" +
      '<template v-for = "menu in menus">' +
      '<li v-if="menu.children && menu.children.length" ' +
      '@mouseenter="onMouseEnter($event , menu.id)"' +
      '@mouseleave="onMouseLeave($event)"' +
      'class="ch-horizonal-menu-item ch-horizonal-submenu">' +
      '<div class="ch-horizonal-submenu__title">' +
      "<span>{{menu.name}}</span>" +
      '<i :class=\'[ floor == 1 ? "el-icon-arrow-down" : "el-icon-arrow-right", "ch-horizonal-submenu__icon-arrow"]\'></i>' +
      "</div>" +
      '<div class="ch-horizonal-submenu_inner" v-show="current_id == menu.id">' +
      '<ul class="ch-horizonal-menu__inner" ' +
      ':style="{backgroundColor:backgroundColor}">' +
      "<ch-horizonal-menu-item " +
      ':menus="menu.children" ' +
      ':active-text-color="activeTextColor"' +
      ':background-color="backgroundColor"' +
      ':activeId="activeId"' +
      ':level="floor" ' +
      '@item-click="itemClick">' +
      "</ch-horizonal-menu-item>" +
      "</ul>" +
      "</div>" +
      "</li>" +
      "<li v-else " +
      ":style=\"{color:activeId == menu.id ? activeTextColor :'#fff' }\"" +
      'class="ch-horizonal-menu-item"' +
      '@click="itemClick(menu , $event)">{{menu.name}}</li>' +
      "</template>" +
      "</div>",
    props: {
      menus: {
        type: Array,
        default: function () {
          return [];
        },
      },
      level: {
        type: Number,
        default: 0,
      },
      activeId: {
        type: [Number, String],
        default: "",
      },
      activeTextColor: String,
      backgroundColor: String,
    },
    data: function () {
      return {
        show: false,
        floor: this.level,
        timeId: 0,
        current_id: -1,
        isActive: false,
      };
    },
    created: function () {
      this.floor++;
    },
    methods: {
      onMouseEnter: function (event, id) {
        clearTimeout(this.timeId);
        this.current_id = id;
        this.$nextTick(function () {
          if (this.floor > 1) {
            var innerMenu = event.target.querySelector(
              ".ch-horizonal-menu__inner"
            );
            var innerMenuItem = event.target.querySelector(
              ".ch-horizonal-menu-item"
            );
            innerMenu.style.left = innerMenuItem.offsetWidth - 20 + 5 + "px";
            innerMenu.style.top = -innerMenuItem.offsetHeight + "px";
          }
        });
      },
      onMouseLeave: function (event) {
        this.timeId = setTimeout(
          function () {
            this.current_id = -1;
          }.bind(this),
          200
        );
      },
      itemClick: function (menu, event) {
        this.current_id = -1;
        this.$emit("item-click", menu);
        if (event)
          this.setParentNodeActive(
            event.target.parentNode,
            "ch-horizonal-submenu"
          );
      },
      setParentNodeActive: function (el, cls) {
        var classList = el.className.split(" ");
        if (classList.indexOf("ch-horizonal-menu") == -1) {
          if (classList.indexOf(cls) != -1) {
            el.style.color = this.activeTextColor;
            el.className = el.className.concat(" is_active");
          }
          this.setParentNodeActive(el.parentNode, cls);
        }
      },
    },
  };
  return {
    name: "ch-horizonal-menu-item",
    template: chHorizonalMenuItem,
  };
});
```

### 使用示例

```html
// 注册 chHorizonalMenuItem 必须在 chHorizonalMenu 前注册
Vue.component(chHorizonalMenuItem.name , chHorizonalMenuItem.template);
Vue.component(chHorizonalMenu.name , chHorizonalMenu.template);

<ch-horizonal-menu
  :data="menus"
  background-color="#1B75D5"
  @item-click="onHorizonalMenuClick"
>
</ch-horizonal-menu>
```

## 垂直 el-menu

### ch-vertical-menu-item.js

```javascript
(function (root, factory) {
  if (typeof exports === "object") {
    module.exports = exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory());
  } else {
    root.chVerticalMenuItem = factory();
  }
})(this, function () {
  var chVerticalMenuItem = {
    template:
      '<div class="ch-menu-wrapper">' +
      '<template v-for="menu in data">' +
      '<el-menu-item v-if="!menu.children" :index="menu.id" @click="handleMenuItem(menu)"> ' +
      '<i v-if="menu.icon" :class="menu.icon"></i>' +
      '<span slot="title">{{menu.name}}</span>' +
      "</el-menu-item>" +
      '<el-submenu v-else :index="menu.id">' +
      '<template slot="title">' +
      '<i v-if="menu.icon" :class="menu.icon"></i>' +
      "<span>{{menu.name}}</span>" +
      "</template>" +
      '<ch-vertical-menu-item :data="menu.children" @item-click="onMenuClick"></ch-vertical-menu-item>' +
      "</el-submenu>" +
      "</template>" +
      "</div> ",
    props: {
      data: {
        type: Array,
        default: function () {
          return [];
        },
      },
    },
    methods: {
      handleMenuItem: function (menu) {
        this.$emit("item-click", menu);
      },
      onMenuClick: function (menu) {
        this.$emit("item-click", menu);
      },
    },
  };
  return {
    name: "ch-vertical-menu-item",
    template: chVerticalMenuItem,
  };
});
```

### 使用示例

```html
// 注册 Vue.component(chVerticalMenuItem.name , chVerticalMenuItem.template);

<el-menu
  :default-active="activeMenuId"
  :background-color="themeColor"
  text-color="#fff"
  :collapse="isCollapse"
  class="el-menu-vertical-left"
  active-text-color="#ffd04b"
>
  <ch-vertical-menu-item
    :data="menus"
    @item-click="onCHMenuClick"
  ></ch-vertical-menu-item>
</el-menu>
```

由于垂直模式的 **el-menu** 只是用 **Element UI**原生组件进行再封装，所以相关配置请参考其文档，而水平模式的 **el-menu** 则是自定义的组件，因此两者没有封装到一起，用法上也有所不同，还请各位见谅！

完整代码请查看 [vue-web-frame ](https://github.com/K-walker/vue-web-frame) 导航菜单示例
