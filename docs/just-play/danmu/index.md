# 弹幕

## 效果：

![效果图](../../.vuepress/public/imgs/just-play/20180522140011701.gif)

## 主要思路

其实弹幕的主要思路很简单，就是将 div 从右向左移动，直到完全移除屏幕之后，将当前 div 从 body 中移除，这里我采用了面向对象的思想来处理，具体 js 代码如下：

## 源码

```js
/**
 * 弹幕
 */
$(function () {
  function BarrageManager(options) {
    this.opts = {
      url: "./res/danmu.json",
      loadDelay: 5000, // 轮询时间间隔
    };

    $.extend(this.opts, options);
    this.bc = new BarrageCollection();
  }

  BarrageManager.prototype.load = function () {
    var self = this;
    $.getJSON(self.opts.url, function (data) {
      if (data.data.length > 0) {
        for (var i = 0; i < data.data.length; i++) {
          var item = data.data[i];
          self.bc.add(
            new Barrage({
              id: item.id,
              name: item.fromUserName,
              text: item.content,
              icon: item.fromUserIcon
                ? item.fromUserIcon
                : "./images/head-icon.png",
            })
          );
        }
        self.loop();
      }
    });
  };

  BarrageManager.prototype.loop = function () {
    var len = this.bc.mq.length,
      self = this;
    while (len--) {
      this.bc.mq[len].start(this.bc, len);
    }

    setTimeout(function () {
      self.load();
    }, this.opts.loadDelay);
  };

  function BarrageCollection() {
    this.mq = [];
  }

  BarrageCollection.prototype.add = function (barrage) {
    this.mq.push(barrage);
  };

  BarrageCollection.prototype.remove = function (barrage) {
    var index = this.mq.findIndex(function (item) {
      return barrage.opts.id == item.opts.id;
    });
    if (index != -1) {
      this.mq.splice(index, 1);
    }
    barrage.opts.$el.remove();
  };

  function Barrage(options) {
    this.opts = {
      $el: null,
      left: 0,
      bgColor: [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
      ],
      offset: 50, // 使弹幕完全移出屏幕外
      duration: 10000, // 弹幕从右往左移动的时间
      delayTime: 1000, // 弹幕延迟移动时间
    };
    $.extend(this.opts, options);
    this.init();
  }

  Barrage.prototype.init = function () {
    this.opts.$el = $(
      "<span><img src=" +
        this.opts.icon +
        "><em>" +
        this.opts.name +
        ":</em>" +
        this.opts.text +
        "</span>"
    );

    var top = Math.ceil(Math.random() * 10);
    this.opts.$el.css({
      top: top * 40 + "px",
      backgroundColor: "rgb(" + this.opts.bgColor.join(",") + ")",
    });

    var delay = Math.ceil(Math.random() * 10);
    this.opts.delayTime *= Math.abs(delay - 5);

    var dur = Math.ceil(Math.random() * 10);
    this.opts.duration += dur * 1000;

    $("#barrage-wrapper").append(this.opts.$el);
    this.opts.left = -this.opts.$el.width() - this.opts.offset;
  };

  Barrage.prototype.start = function (bc, index) {
    var self = this;
    bc.mq.splice(index, 1);
    setTimeout(function () {
      self.move(bc);
    }, this.opts.delayTime);
  };

  Barrage.prototype.move = function (bc) {
    var self = this;
    this.opts.$el.animate(
      {
        left: this.opts.left + "px",
      },
      this.opts.duration,
      "linear",
      function () {
        bc.remove(self);
      }
    );
  };

  new BarrageManager().load();
});
```

## 代码分析

首先我定义了 3 个类

- **BarrageManager** ： 弹幕管理类
- **BarrageCollection** ：弹幕集合类
- **Barrage** ： 弹幕类

### BarrageManager 中的方法：

- **load** : 加载弹幕数据
- **loop**: 间隔指定时间循环加载数据

load 方法就不加以说明了，主要讲一下 loop 方法：

```js
BarrageManager.prototype.loop = function () {
  var len = this.bc.mq.length,
    self = this;
  while (len--) {
    this.bc.mq[len].start(this.bc, len);
  }

  setTimeout(function () {
    self.load();
  }, this.opts.loadDelay);
};
```

通过 while 循环，将弹幕集合中所有弹幕对象取出，并调用他的 start 方法，开启弹幕动画，然后每间隔指定时间再去调用一次 load 方法，生成新的弹幕对象，并添加到弹幕结合中。

> PS: 这里其实最好使用 socket，然服务端主动推送，而不是客户端通过 http 进行轮询，我这里主要讲解实现弹幕的思路，至于怎么获取数据，这个大家可以去优化，不过我可以推荐一个 socket 第三方包 [socket.io](https://socket.io/) 这个库挺厉害的，大家可以去看看。

### BarrageCollection 中的方法：

- **add** : 添加弹幕
- **remove**: 移除弹幕

BarrageCollection 中的方法其实就是对数据进行了一层包装操作而已，其实也可以不要这一层。代码也相对简单，我就不多说了（嘻嘻，大家现在水平都不错，一眼就能看明白对吧）。

### Barrage 中的方法：

- **init** : 初始化参数
- **start**: 开启弹幕移动的动画
- **move**: 执行弹幕移动动画

其实 Barrage 中的方法也相对简单，首先在 Barrage 中定义了它所需要的属性，在 new Barrage() 的时候，传递参数，然后调用 init 方法进初始化，生成 dom，设置弹幕块当前的背景颜色，以及屏幕的垂直位置如下：

```js
var top = Math.ceil(Math.random() * 10);
this.opts.$el.css({
  top: top * 40 + "px",
  backgroundColor: "rgb(" + this.opts.bgColor.join(",") + ")",
});
```

随机生成 top 值，为了避免弹幕块在同一垂直位置出现。
然后设置弹幕块从右往左移动时所需要的时间，以及延迟开始移动的时间

```js
// 设置弹幕块延迟移动的时间
var delay = Math.ceil(Math.random() * 10);
this.opts.delayTime *= Math.abs(delay - 5);
// 设置弹幕块移动的时长
var dur = Math.ceil(Math.random() * 10);
this.opts.duration += dur * 1000;
```

设置这两个参数，是为了不让弹幕块在进入屏幕的时候同时出现，并且如果移动速度相同，就感觉整体在一起移动，效果不太好。
最后将弹幕块的 dom 添加在 html 中，并计算出 left 值

```js
$("#barrage-wrapper").append(this.opts.$el);
this.opts.left = -this.opts.$el.width() - this.opts.offset;
```

left 值也就是弹幕块要移动的距离，这里我加了一个偏移量 offset（这个随意），可能我 css 设置有点问题，如果不加这个，弹幕块在还没完全移出屏幕的时候就从 html 中移除了，会突然变没，有点突兀，因此加了一个偏移量，保证弹幕块完全移出屏幕

当弹幕块都初始化完成了之后，调用 start 方法，开始移动

```js
Barrage.prototype.start = function (bc, index) {
  var self = this;
  bc.mq.splice(index, 1);
  setTimeout(function () {
    self.move(bc);
  }, this.opts.delayTime);
};
```

move 方法则是使用 jq 的 animate 方法来实现 dom 的移动动画

```js
Barrage.prototype.move = function (bc) {
  var self = this;
  this.opts.$el.animate(
    {
      left: this.opts.left + "px",
    },
    this.opts.duration,
    "linear",
    function () {
      bc.remove(self);
    }
  );
};
```

在弹幕完全移出屏幕时，也就是动画结束时，将当前弹幕 dom 从 html 中移除。整体的思路也就是这样，是不是很简单，不过在这里我对 start 方法中的这段代码进行说明一下：

> bc.mq.splice(index , 1);

我在开始动画之前，首先将当前弹幕对象从 BarrageCollection 中移出了，按理说应该在弹幕完全移出屏幕时才执行这个操作才对，其实是因为，当我们在调用 BarrageManager 中的 loop 方法循环获取弹幕数据的时候，会改变 BarrageCollection 中弹幕集合的长度，这时候会造成传递到 start 方法中的 index 值可能会大于集合的长度，从而报错，因此我在每次调用 start 的时候就将当前弹幕对象从集合中移除，确保集合每次都是空的，从而不会有其他影响。

[源码下载](https://github.com/K-walker/dm.git)
