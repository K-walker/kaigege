# 介绍

基于 jQuery 的一种简单的国际化方案，通过改变地址栏 local 的值即可切换语言，首先我们先来看看效果图:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190111162146880.gif)

## 使用

1. 需要国际化的标签 class 中必须包含 ‘ch-i18n’ 类名, 必须有 data-i18nkey 属性
2. 如果 input 有 placeholder 属性，则会对 placeholder 进行国际化显示
3. 如果 input 有 value 属性，则会对 value 进行国际化显示
4. 对于 2,3 这两种情况，一般 input 的 type 为 text,submit,button

## 源码

### i18n.js

```javascript
(function () {
  var i18n = null;
  var SELECTOR = ".ch-i18n";
  var ATTR = "data-i18nkey";
  var LANGUAGE_ARRAY = ["zh-cn", "en-us"];
  var lang = LANGUAGE_ARRAY[0];
  var LOCAL = "local";

  var CHI18n = {
    get: function (key, obj) {
      var text = i18n[key];
      if (obj) {
        for (k in obj) {
          text = text.replace(new RegExp("\\{\\{" + k + "\\}\\}", "g"), obj[k]);
        }
      }
      return text;
    },
  };

  // 我这里根据页面为单位，通过页面的唯一标识，去获取相应的国际化翻译
  function CHI18nFactory(pageName) {
    if (!pageName || pageName == "") throw new Error("参数不能为空");
    loadLanguage(pageName);
    return CHI18n;
  }

  /**
   * 加载语言文件
   */
  function loadLanguage(pageName) {
    var search = window.location.search.replace("?", "");
    var param = search.split("&");

    var index = param.findIndex(function (item) {
      return item.indexOf(LOCAL) != -1;
    });

    if (index != -1) {
      var value = param[index].replace(LOCAL + "=", "");
      if (LANGUAGE_ARRAY.indexOf(value) != -1) {
        lang = value;
      }
    }

    // 加载国际化文本
    $.ajax({
      url: "./i18n/" + lang + ".json",
      async: false,
      dataType: "json",
      success: function (data) {
        i18n = data[pageName];
        setLanguage();
      },
    });
  }

  /**
   * 替换带有 .ch-i18n[data-i18nkey] 类名和属性的标签内容
   */
  function setLanguage() {
    $(SELECTOR + "[" + ATTR + "]").each(function () {
      var value = $(this).attr(ATTR);
      if (value && value != "") {
        if (this.tagName.toLowerCase() === "input") {
          if ($(this).attr("placeholder")) {
            $(this).attr("placeholder", i18n[value]);
          } else if ($(this).attr("value")) {
            $(this).attr("value", i18n[value]);
          }
        } else {
          $(this).html(i18n[value]);
        }
      }
    });
  }

  window.CHI18n = CHI18nFactory;
})();
```

### html

```html
<div>
  <span class="ch-i18n" data-i18nkey="today">今天</span>
</div>

<div>
  <input
    type="text"
    class="ch-i18n"
    data-i18nkey="emailLabel"
    placeholder="请输入邮箱"
  />
</div>

<div>
  <input type="submit" class="ch-i18n" data-i18nkey="submit" value="提交" />
</div>

<div>
  <label>
    <input type="radio" /><span class="ch-i18n" data-i18nkey="man">男</span>
  </label>
  <label>
    <input type="radio" /><span class="ch-i18n" data-i18nkey="woman">女</span>
  </label>
</div>

<div>
  <label>
    <input type="checkbox" /><span class="ch-i18n" data-i18nkey="apple"
      >苹果</span
    >
  </label>
  <label>
    <input type="checkbox" /><span class="ch-i18n" data-i18nkey="banana"
      >香蕉</span
    >
  </label>
</div>

<div id="insert"></div>
<input
  type="button"
  id="btn1"
  class="ch-i18n"
  data-i18nkey="button"
  value="插入HTML"
/>

<div id="placeholder"></div>
<input type="button" id="btn2" value="替换文本中的占位符" />

<script src="./js/jquery-1.8.1.js"></script>
<script src="./js/i18n.js"></script>
<script>
  $(function () {
    var chI18n = CHI18n("login");

    // 动态插入数据
    $("#btn1").click(function () {
      $("#warning").show();
      $("#insert").html("<span>" + chI18n.get("insert") + "</span>");
    });

    $("#btn2").click(function () {
      $("#placeholder").html(
        chI18n.get("msg", { name: "king", age: 24, sex: "男" })
      );
    });
  });
</script>
```

### zn-cn.json

下面是国际化的 json 数据

```json
{
  "login": {
    "today": "今天",
    "submit": "提交",
    "emailLabel": "请输入邮箱",
    "apple": "苹果",
    "banana": "香蕉",
    "woman": "女",
    "man": "男",
    "button": "按钮",
    "insert": "动态插入信息",
    "msg": "我叫{{name}},今年{{age}}岁,性别{{sex}}"
  }
}
```

示例代码如上，此时我们只要在浏览器地址栏中输入: `http://localhost/i18n?local=zh-cn` 切换 local 的值为 en-us 即可切换语言，当然有时候国际化文本中的数据可能是动态的，比如:

::: v-pre
`我叫{{ name }},今年{{ age }}岁,性别{{ sex }}`
:::

这里的 _name，age，sex_，需要我们在设置的时候手动传值进去，因此可以给 `get` 方法传递一个参数即可，如下:

```javascript
chI18n.get("msg", { name: "king", age: 24, sex: "男" });
```

以上便是一个简单的国际化方案，仅供大家参考，谢谢！
