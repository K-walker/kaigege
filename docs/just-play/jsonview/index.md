# JSON 可视化

说到这个 json 格式化工具，相信大家都用过，比如我个人就喜欢用的一款本地化 json 格式化工具 **HiJson**，也有一些在线格式化工具 [bejson](http://www.bejson.com/), 这些工具都是将 json 转化为视图方便进行查看。今日我闲来无事，自己写了个简陋的 json 格式化视图工具，其实是为了方便公司的测试妹子来查看数据，因为她没此拉数据然后将数据解密出来，然后再格式化，我感觉挺浪费时间的，所有就给他做了一个工具，附带加解密功能，并将解密的结果转成 json 视图查看，下面是整体的效果图：

![效果图](https://img-blog.csdnimg.cn/img_convert/80dcf6be2941db6e81cf86d3c14e15ef.png)

如上，左边是加解密工具，右边则是将解密的 json 字符串转成的视图（有点简陋^\_^）！

今天这篇文章的重点是如何去实现右边 json 视图的功能，下面我把代码贴出来
文件名：**kjson.js**

```js
/**
 * Created by 004928 on 2016/12/22.
 * json格式化工具
 */
function KJSON() {
  // 默认偏移量
  var defaule_offsetX = 25;
  /**
   * 判断是否是JsonObject对象
   * @param obj
   * @returns {*|boolean}
   */
  function isJsonObject(obj) {
    return obj && typeof obj === "object";
  }
  /**
   * 判断是否是空的JSON对象
   * @param obj
   */
  function isEmptyJsonObject(obj) {
    return JSON.stringify(obj) == "{}";
  }
  /**
   * 判断是否是空的JSON数组
   */
  function isEmptyJsonArray(obj) {
    return JSON.stringify(obj) == "[]";
  }
  /**
   * 判断是否是JsonArray对象
   * @param obj
   * @returns {boolean}
   */
  function isJsonArray(obj) {
    return obj.length === "number";
  }
  /**
   * 取出JSON对象值为string 和 null 类型的值
   * @param text
   * @returns {*}
   */
  function getValue(key, obj) {
    if (obj[key] && typeof obj[key] === "object") {
      key = "╋" + key;
    } else if (!obj[key]) {
      key = key + ":" + "null";
    } else {
      key = key + ":" + obj[key];
    }
    return key;
  }

  /**
   * 创建元素
   * @param parent
   * @param obj
   */
  function createElement(parent, obj, propertyName, left) {
    var el = document.createElement("div");
    var textNode = document.createTextNode(getValue(propertyName, obj));
    el.appendChild(textNode);
    el.style.paddingLeft = left + "px";
    parent.appendChild(el);
    addClickListener(el, obj[propertyName], propertyName);
  }

  /**
   * 添加点击事件
   * @param el
   * @param value
   */
  function addClickListener(el, value, key) {
    if (isJsonObject(value)) {
      el.addEventListener("click", function (event) {
        if (event.target == this) {
          // 判断当前项是否是展开状态
          if (el.children.length > 0) {
            el.innerHTML = "";
            el.innerText = "╋" + key;
          } else {
            el.innerText =
              el.innerText.charAt(0) == "╋" ? "━" + key : "╋" + key;
            if (typeof value.length === "number") {
              if (isEmptyJsonArray(value)) {
                el.innerText = el.innerText.concat(":[]");
                return;
              }
              var arrayTemp = {};
              for (var i = 0; i < value.length; i++) {
                arrayTemp["[" + i + "]"] = value[i];
                createElement(el, arrayTemp, "[" + i + "]", defaule_offsetX);
              }
            } else {
              if (isEmptyJsonObject(value)) {
                el.innerText = el.innerText.concat(":{}");
                return;
              }
              for (propertyName in value) {
                createElement(el, value, propertyName, defaule_offsetX);
              }
            }
          }
        }
      });
    }
  }

  /**
   * 转化为json
   * @param parent
   * @param jsonStr
   */
  function toJson(parent, jsonStr) {
    if (jsonStr) {
      try {
        var jsonObj = JSON.parse(jsonStr);
        for (propertyName in jsonObj) {
          createElement(parent, jsonObj, propertyName, 0);
        }
      } catch (e) {
        console.log("内容非json格式");
      }
    }
  }

  return {
    /**
     * 暴漏给外部调用的方法
     * @param parent
     * @param jsonStr
     */
    toJson: function (parent, jsonStr) {
      toJson(parent, jsonStr);
    },
  };
}
```

以上是所有 js 代码，通过调用 toJson 方法，传递两个参数:

- **parent:** 父容器 div 对象那个
- **jsonStr:** json 格式的字符串

首先说一下我实现的思路，我不是将所有 json 都解析后然后一个一个层级去创建，点击之后再展开显示，
我是每次只遍历最外层，然后创建 div 添加进父 div 中，然后点击某个 div 再去创建其子元素，显示出来。
如下结构：

```json
{
  "data": "123",
  "result": {
    "name": "xxx"
  }
}
```

如上，我会先创建 data 和 result 的 div，添加到其父 div 中，当点击 result div 时，我再去创建 name div 添加进去，因此我是每次点击父 div 的时候再去加载其子元素。所有主要方法看 **addClickListener** 方法，首先判断当前 div 是否有子元素，如果有，说明当前是展开状态，清除其所有子元素（因为我是点击之后再去加载其子元素的，所以如果 **el.children.length > 0** 说明当前是展开的），如果没有则判断当前 div 的值是 jsonArray 还是 jsonObject，然后再分别对其遍历，创建元素。主要的逻辑代码都在**addClickListener** 方法中，大家可以仔细看，其中我做了一些优化判断，值是 string，boolean，number 的就没有设置监听，同事空的 jsonArray 和 jsonObject 的我会显示 “[]”和“{}”来表示当前对象/数组 没有值 。

最后贴一下在网页中如何去引用的代码：

```html
<div id="parent">// json视图父容器</div>
<script src="../js/kjson.js"></script>
<script>
  function changeToJsonView() {
    var el = document.getElementById("parent");
    var kjson = new KJSON();
    kjson.toJson(el, "json格式的字符串");
  }
</script>
```

结束，写的不好大家见谅啊，欢迎批评指正，谢谢了！
