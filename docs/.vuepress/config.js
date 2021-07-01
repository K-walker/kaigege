module.exports = {
  title: "凯歌哥的小破站",
  description: "来了,老弟! 坐下一起喝杯茶,聊聊人生呗^_^",
  base: "/kaigege/",
  head: [
    [
      "script",
      { charset: "utf-8" },
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?1d56a9f2a862cd29074c56b896f1af64";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `,
    ],
  ],
  themeConfig: {
    nav: [
      {
        text: "常用命令",
        items: [
          {
            text: "linux",
            link: "/commands/linux/index.md",
          },
          {
            text: "git",
            link: "/commands/git/index.md",
          },
          {
            text: "nginx",
            link: "/commands/nginx/index.md",
          },
          {
            text: "vi",
            link: "/commands/vi/index.md",
          },
          {
            text: "redis",
            link: "/commands/redis/index.md",
          },
          {
            text: "mysql",
            link: "/commands/mysql/index.md",
          },
          {
            text: "npm",
            link: "/commands/npm/index.md",
          },
          {
            text: "mac",
            link: "/commands/mac/index.md",
          },
          {
            text: "centos",
            link: "/commands/centos/index.md",
          },
        ],
      },
      {
        text: "JS进阶",
        items: [
          {
            text: "函数",
            link: "/js/function/index.md",
          },
          {
            text: "变量对象",
            link: "/js/vo/index.md",
          },
          {
            text: "作用域链",
            link: "/js/scope/index.md",
          },
          {
            text: "闭包",
            link: "/js/closure/index.md",
          },
          {
            text: "跨域",
            link: "/js/cross/index.md",
          },
          {
            text: "继承",
            link: "/js/extends/index.md",
          },
          {
            text: "ajax",
            link: "/js/ajax/index.md",
          },
          {
            text: "event loop",
            link: "/js/event-loop/index.md",
          },
          {
            text: "定时器",
            link: "/js/timer/index.md",
          },
          {
            text: "promise",
            link: "/js/promise/index.md",
          },
          {
            text: "执行上下文",
            link: "/js/context/index.md",
          },
          {
            text: "深拷贝和浅拷贝",
            link: "/js/copy/index.md",
          },
          {
            text: "new",
            link: "/js/new/index.md",
          },
          {
            text: "apply、call和bind",
            link: "/js/apply-call-bind/index.md",
          },
          {
            text: "对象",
            link: "/js/object/index.md",
          },
          {
            text: "运算符",
            link: "/js/operator/index.md",
          },
        ],
      },
      {
        text: "React",
        items: [
          { text: "生命周期", link: "/react/lifecycle/index.md" },
          { text: "diff算法", link: "/react/diff/index.md" },
          {
            text: "组件性能优化",
            link: "/react/comp-performance-optimization/index.md",
          },
          { text: "hooks", link: "/react/hooks/index.md" },
          { text: "Redux", link: "/react/redux/index.md" },
        ],
      },
      { text: "Vue", link: "/vue/index.md" },
      {
        text: "ES6",
        items: [
          { text: "reflect", link: "/es6/reflect/index.md" },
          { text: "iterable", link: "/es6/iterable/index.md" },
          { text: "proxy", link: "/es6/proxy/index.md" },
          { text: "set/map", link: "/es6/set-map/index.md" },
          { text: "symbol", link: "/es6/symbol/index.md" },
          { text: "装饰器", link: "/es6/decorator/index.md" },
          { text: "async/await", link: "/es6/async-await/index.md" },
          { text: "规格", link: "/es6/spec/index.md" },
          { text: "import/export", link: "/es6/import-export/index.md" },
        ],
      },
      {
        text: "Web基础",
        items: [
          { text: "CSS/CSS3", link: "/web/css/index.md" },
          { text: "HTML5", link: "/web/html/index.md" },
          { text: "webpack原理", link: "/web/webpack/index.md" },
          { text: "Http/TCP", link: "/web/http/index.md" },
        ],
      },
      { text: "算法", link: "/algorithm/index.md" },
      {
        text: "就是玩儿",
        items: [
          { text: "粒子特效", link: "/just-play/particle/index.md" },
          { text: "生长的大树", link: "/just-play/tree/index.md" },
          { text: "JSON可视化", link: "/just-play/jsonview/index.md" },
          { text: "弹幕", link: "/just-play/danmu/index.md" },
          { text: "国际化方案", link: "/just-play/i18n/index.md" },
          { text: "动态生成el-menu", link: "/just-play/el-menu/index.md" },
          { text: "vue+apicloud", link: "/just-play/apicloud/index.md" },
        ],
      },
      {
        text: "杂记",
        items: [
          {
            text: "计算机",
            link: "/other/computer/index.md",
          },
          {
            text: "摄影",
            link: "/other/photography/index.md",
          },
          {
            text: "摩托车",
            link: "/other/moto/index.md",
          },
        ],
      },
    ],
    sidebar: "auto",
  },
  markdown: {
    lineNumbers: true,
    toc: {
      includelevel: [1, 2],
    },
  },
};
