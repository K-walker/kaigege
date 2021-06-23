# CSS/CSS3

## CSS3 特性

- 边框：border-radius / box-shadow / border-image
- 背景：background-image / background-size / background-origin / background-clip
- 渐变：线性渐变 linear-gradient / 径向渐变 radial-gradient
- 文本：text-shadow / text-overflow / word-wrap / word-break
- transform： rotate / scale / skew / matrix
- transition： 属性动画
- @keyframes： 帧动画
- 弹性盒子：flex 布局
- 多媒体查询

### column-\*

| 列属性            | 说明                     |
| ----------------- | ------------------------ |
| column-count      | 将文本分为 3 列          |
| column-gap        | 列之间的间隙             |
| column-width      | 列的宽度                 |
| column-rule-style | 指定列与列之间边框的样式 |
| column-rule-color | 边框颜色                 |
| column-rule-width | 边框宽度                 |

### 弹性盒子 flex

## 常用 CSS

### 横向滚动，宽度自适应

```css
display: flex;
align-items: center;
overflow: auto;
/* 关键代码 */
white-space: nowrap;
```

### 多行文本换行显示…

```css
display: -webkit-box;
word-break: break-all;
/*! autoprefixer: off */
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
text-overflow: ellipsis;
```

### 瀑布流布局

```css
/* 父级div样式 */
column-count: 2;
column-gap: 0;
/* 子级div样式 */
break-inside: avoid;
```

### align-content

如果 flex 容器设置了固定高度，并且设置了 flex-wrap: wrap;
则容器中的子元素会自动平分容器的高度，导致元素无法一个贴一个布局，
此时使用 align-content: flex-start; 来规定其布局方式即可

## BFC 快格式化上下文

简单来说，BFC 就是 css 布局的一个概念，是一块区域，它是一个独立的渲染区域，只有 Block-level box (块级盒子) 参与，它规定了内部的 Block-level box (块级盒子) 如何布局，并且与其外部区域毫不相干

### 下列方式会创建块格式化上下文

- 根元素(`<html>`)
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML 表格标题默认为该值）
- 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是 HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
- overflow 值不为 visible 的块元素
- display 值为 flow-root 的元素
- contain 值为 layout、content 或 paint 的元素
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

### BFC 布局有一下特性：

- 内部的 Box 会在垂直方向，一个接一个地放置。
- Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
- 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- BFC 的区域不会与 float box 重叠。
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算 BFC 的高度时，浮动元素也参与计算

## 盒模型

由 4 个部分组成 content padding border margin

### 盒子类型

行内盒子（inline）
行内级盒子（inline-level）
原子行内级盒子（atomic inline-level）
块盒子（block）

### 内容区域 (content)

由内容边界限制，容纳元素的真实内容，尺寸为内容的宽高，它通常含有一个背景颜色或背景图片 (默认为透明色)

如果 `box-sizing:content-box` (默认),则内容区域的大小可明确通过 `width, min-width, max-width, height, min-height, max-height` 来控制

### 内边距区域 (padding)

扩展自 **内容区域** ,也就是说，从内容区域的边界向外扩展,但其只是延伸 **内容区域** 的背景, 也就是说将背景撑大

### 边框区域 (border)

扩展自 **内边距** , 延伸 **内容区域** 的背景，默认边框在 **内容区域** 背景之上, 可通过 `background-clip` 来改变， 因此当把边框颜色设置半透明时，可以看到 **内容区域** 的背景颜色

### 外边距区域 (margin)

用外面的空白区域扩展 **边框区域**, 用来分开相邻的元素，注意 **外边距合并** 的情况

> 对于行内元素来说(宽高设置无效),尽管其周围有内边距和边框，但是其占用的空间(每一行文字的高度)由 `line-height` 来决定

## flex: 0 1 auto 的含义

### 取值

- 第一个参数 flex-grow：分配 flex 容器剩余的空间，按设置的值，进行等比分配
- 第二个参数 flex-shrink: 如果 flex 容器中的子项宽度之和超过容器宽度，则超出的部分，按比例压缩
- 第三个参数 flex-basis: 指定 flex 元素的初始大小
