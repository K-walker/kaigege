# HTML5 特性

## canvas 标签

| 标签   | 描述               |
| ------ | ------------------ |
| canvas | 用于绘制文字，图形 |

## 新多媒体元素

| 标签   | 描述                                                                                        |
| ------ | ------------------------------------------------------------------------------------------- |
| video  | 视频播放                                                                                    |
| audio  | 音频播放                                                                                    |
| source | 定义多媒体资源包含 video 和 audio                                                           |
| embed  | 定义切入的内容比如： `<embed type="text/html" src="snippet.html" width="500" height="200">` |
| track  | 定义 video 和 audio 外部文本轨道                                                            |

## 新表单元素

| 标签     | 描述                                                                       |
| -------- | -------------------------------------------------------------------------- |
| datalist | 配合 input 元素使用为其提供自动补全功能                                    |
| keygen   | 用于表单的密钥对生成器字段，当提交表单时，私钥存储在本地，公钥发送到服务器 |
| output   | 显示计算结果，比如脚本的输出                                               |

## 新的语义和结构元素

| 标签       | 描述                                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| article    | 定义独立的内容区域                                                                                          |
| aside      | 侧边栏                                                                                                      |
| bdi        | 设置一段文本，使其脱离付元素文本方法设置                                                                    |
| details    | 定义用户可见的或者隐藏的需求的补充细节，点击可展开/关闭，默认不可见除非设置 open 属性                       |
| summary    | 给 details 标签定义一个可见的标题，点击这标题可显示/隐藏 details 内容                                       |
| dialog     | 定义一个对话框、确认框                                                                                      |
| figure     | 定义独立的流内容（图片，图标，代码等）                                                                      |
| figcaption | 定义 figure 的标题                                                                                          |
| nav        | 定义导航                                                                                                    |
| footer     | 定义页脚                                                                                                    |
| header     | 定义头部                                                                                                    |
| mark       | 定义带记号的文本，文本填充背景色                                                                            |
| meter      | 定义度量衡，用于已知最大和最小的度量 `<meter value="2" min="0" max="10"> or <meter value="0.6">60%</meter>` |
| progress   | 进度条                                                                                                      |
| section    | 定义文档中的小节（区段）                                                                                    |
| time       | 定义日期或时间                                                                                              |
| wbr        | 在文本合适处添加换行符                                                                                      |

## a 标签

### href

通过指定 href 的类型，进行不同操作

```html
<a href="https://example.com">访问网站</a>
<a href="mailto:bluth@example.com">发送邮件</a>
<a href="tel:+123456789">拨打电话</a>
```

### download

(HTML5) 指示浏览器下载当前 URL 内容，`download` 的值预填充为下载文件名,通过 `download` 属性，将 `<canvas>` 标签的内容保存为 PNG

```js
var link = document.createElement('a');
var link.innerHTML = 'download image'；

link.addEventListener('click', () => {
    link.href = canvas.toDataURL();
    link.download = '123.png'
}, false);

document.body.appendChild(link);
```
