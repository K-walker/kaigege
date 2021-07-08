(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{401:function(s,a,t){"use strict";t.r(a);var n=t(42),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"linux-命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#linux-命令"}},[s._v("#")]),s._v(" linux 命令")]),s._v(" "),t("h2",{attrs:{id:"基础命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#基础命令"}},[s._v("#")]),s._v(" 基础命令")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v("   xxx       "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建文件夹")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("vi")]),s._v("  xxx           "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建一个带输入内容的文件")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" xxx            "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除文件")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" -rf xxx        "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 强制删除文件夹及以下所有子目录和文件")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" path1  path2   "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 移动")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h2",{attrs:{id:"设置文件所有者和文件所在组"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#设置文件所有者和文件所在组"}},[s._v("#")]),s._v(" 设置文件所有者和文件所在组")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chgrp")]),s._v("  用户名  文件名  -R   // 修改所有者\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chown")]),s._v("  用户名  文件名  -R   // 修改所在组\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("修改 m 目录的所在分组")]),s._v(" "),t("blockquote",[t("p",[s._v("chown root m/ -R")])]),s._v(" "),t("h2",{attrs:{id:"创建文件并写入内容"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建文件并写入内容"}},[s._v("#")]),s._v(" 创建文件并写入内容")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建 1.md 文件，并写入字符串 hello")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hello"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(".md\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h2",{attrs:{id:"和"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#和"}},[s._v("#")]),s._v(" . 和 /")]),s._v(" "),t("blockquote",[t("p",[t("strong",[s._v(".")]),s._v(" ：表示当前目录\n"),t("strong",[s._v("/")]),s._v(" ：表示系统根目录")])]),s._v(" "),t("h2",{attrs:{id:"建立软连接"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#建立软连接"}},[s._v("#")]),s._v(" 建立软连接")]),s._v(" "),t("p",[s._v("将 node 添加到全局环境")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("   "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ln")]),s._v(" -s /usr/local/bin/nodejs/node /usr/bin/node\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("ul",[t("li",[s._v("/usr/local/bin/nodejs/node: node 的安装路径")]),s._v(" "),t("li",[s._v("/usr/bin/node: 环境变量目录")])]),s._v(" "),t("h2",{attrs:{id:"解压缩"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#解压缩"}},[s._v("#")]),s._v(" 解压缩")]),s._v(" "),t("p",[s._v("tar -zcvf ../release.tgz .\ntar –xvf x.tgz")]),s._v(" "),t("h2",{attrs:{id:"判断文件-文件夹"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#判断文件-文件夹"}},[s._v("#")]),s._v(" 判断文件/文件夹")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("   "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -d 表示文件夹")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" -d "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/data/'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("then")]),s._v("\n     "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'文件夹存在'")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fi")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -f 表示文件")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" -d "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/data/1.txt'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("then")]),s._v("\n     "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'文件存在'")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fi")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ! 表示取反")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" ！-d "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/data/'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("then")]),s._v("\n\n   "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fi")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br")])]),t("h2",{attrs:{id:"文件比较符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#文件比较符"}},[s._v("#")]),s._v(" 文件比较符")]),s._v(" "),t("blockquote",[t("p",[s._v("-e 判断对象是否存在\n-d 同上，并且为目录\n-f 同上，并且为文件\n-L 同上，并且为符号链接\n-h 同上，并且为软链接\n-s 同上，并且长度不为 0")])]),s._v(" "),t("p",[s._v("与判断权限相关：")]),s._v(" "),t("blockquote",[t("p",[s._v("-r 同上，并且可读\n-w 同上，并且可写\n-x 同上，并且可执行\n-O 同上，并且属于当前用户\n-G 同上，并且属于当前用户组")])]),s._v(" "),t("p",[s._v("比较相关：")]),s._v(" "),t("blockquote",[t("p",[s._v('-nt 判断 file1 是否比 file2 新 [ "/data/file1" -nt "/data/file2" ]\n-ot 与上相反')])]),s._v(" "),t("h2",{attrs:{id:"find"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#find"}},[s._v("#")]),s._v(" find")]),s._v(" "),t("p",[s._v("语法:")]),s._v(" "),t("blockquote",[t("p",[s._v("find path -option [ -print ] [ -exec -ok command ] {} ;")])]),s._v(" "),t("p",[s._v("示例:")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查找demo目录及其子目录下所有 .mp3 的文件")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" demo -name "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*.mp3"')]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查询到MP3w文件之后执行 -exec 后面给出的命令(一一删除)不要忘记最后的 ;")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -ok 与 -exec 相同，执行前会询问用户")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" demo -name "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*.mp3"')]),s._v(" -exec "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("p",[s._v("参数说明：")]),s._v(" "),t("blockquote",[t("p",[s._v("-name name,-iname name : 文件名符合 "),t("code",[s._v("name")]),s._v(" 的文件，-iname 忽略大小写\n-path path,-ipath path : 路径符合 "),t("code",[s._v("path")]),s._v(" 的文件， -ipath 忽略大小写\n-pid n: 进程 "),t("code",[s._v("id")]),s._v(" 是 "),t("code",[s._v("n")]),s._v(" 的文件\n-type c : 文件类型是 "),t("code",[s._v("c")]),s._v(" 的文件")])]),s._v(" "),t("p",[s._v("-type 参数说明：")]),s._v(" "),t("blockquote",[t("p",[s._v("d: 目录\nc: 字型装置文件\nb: 区块装置文件\nf: 一般文件\nl: 符号连结\ns: socket\np: 具名贮列")])]),s._v(" "),t("h2",{attrs:{id:"xargs"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#xargs"}},[s._v("#")]),s._v(" xargs")]),s._v(" "),t("p",[s._v("简单解释，给命令传递参数的一个过滤器，可以将管道或标准输入的数据转化成命令行参数")]),s._v(" "),t("h2",{attrs:{id:"sed-修改文件内容并保存"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#sed-修改文件内容并保存"}},[s._v("#")]),s._v(" sed 修改文件内容并保存")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -i"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'.bak'")]),s._v(" -e "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"s/要被取代的字串/新的字串/g"')]),s._v(" index.txt\n "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除备份文件 .bak")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" ./ -name "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'*.bak'")]),s._v(" -exec "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("blockquote",[t("p",[s._v("PS: 记得删除 .bak 备份文件")])]),s._v(" "),t("h2",{attrs:{id:"wc"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wc"}},[s._v("#")]),s._v(" wc")]),s._v(" "),t("p",[s._v("语法：")]),s._v(" "),t("p",[s._v("wc [-clw][--help][--version][文件]")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wc")]),s._v(" -w "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(".txt  // 统计 "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(".txt 文件中的字数\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("blockquote",[t("p",[s._v("-l: 统计行数")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("// 统计 temp 文件夹下所有 .mp3 文件的个数\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" temp -type f -name "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*.mp3"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wc")]),s._v(" -l\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("blockquote",[t("p",[s._v("-c: 显示字节数\n-w: 显示字数")])]),s._v(" "),t("p",[s._v("语法：")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查找 sbin 目录下权限是 700 的文件，并且一一列举出来")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" /sbin -perm +700 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v(" -l\n\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查询demo下所有MP3文件，并将其一一移动到temp文件夹下")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" demo -name "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'*.mp3'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v(" -n1 -I "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" ./temp/\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查找所有 .jpg 文件,并压缩")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v(" -type f -name "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*.jpg"')]),s._v(" -print "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" -czvf images.tar.gz\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("p",[s._v("参数说明:")]),s._v(" "),t("blockquote",[t("p",[s._v("-n num: "),t("code",[s._v("num")]),s._v(" 是数字，表示命令再执行时，一次使用几个参数，默认是所有的\n-I: 将 "),t("code",[s._v("xargs")]),s._v(" 的每项名称，一行一行赋值给 "),t("code",[s._v("{}")]),s._v(",可以用 "),t("code",[s._v("{}")]),s._v(" 代替")])]),s._v(" "),t("p",[s._v("注意："),t("code",[s._v("/bin/rm Argument list too long")])]),s._v(" "),t("blockquote",[t("p",[s._v("执行太多文件时报这个错时，可以通过 "),t("code",[s._v("xargs")]),s._v(" 去避免这个问题")])]),s._v(" "),t("h2",{attrs:{id:"将-find-命令的返回结果赋值给变量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#将-find-命令的返回结果赋值给变量"}},[s._v("#")]),s._v(" 将 find 命令的返回结果赋值给变量")]),s._v(" "),t("p",[s._v("用反引号将 "),t("code",[s._v("find")]),s._v(" 命令包裹起来，结果赋值给 "),t("code",[s._v("VERSION")]),s._v(" 变量")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 获取符合规则的目录名")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("VERSION")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" dist/h5 -type d -name "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"v*"')]),s._v(" -maxdepth "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("basename")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h2",{attrs:{id:"获取-json-文件中指定字段的值"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#获取-json-文件中指定字段的值"}},[s._v("#")]),s._v(" 获取 json 文件中指定字段的值")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function-name function"}},[s._v("get_v")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("local")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("json_file")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("local")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("key")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$2")]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("value")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" -o "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),t("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[s._v('\\"')]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$key")]),t("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[s._v('\\"')]),s._v("\\s*:\\s*"),t("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[s._v('\\"')]),s._v("\\?[^"),t("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[s._v('\\"')]),s._v("]\\+"),t("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[s._v('\\"')]),s._v('\\?"')]),s._v(" $json_file "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -n -e "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'s/\"//gp'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("awk")]),s._v(" -F "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("':'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'{print "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$2")]),s._v("}'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$value")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 调用 get_v方法，获取 package.json 文件中 version 字段的值")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("VERSION")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),s._v("get_v "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'package.json'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'version'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])]),t("h2",{attrs:{id:"修改权限"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#修改权限"}},[s._v("#")]),s._v(" 修改权限")]),s._v(" "),t("blockquote",[t("p",[s._v("chmod [<权限范围><权限操作><具体权限>] [文件或目录…]")])]),s._v(" "),t("ul",[t("li",[t("p",[s._v("权限范围：")]),s._v(" "),t("ul",[t("li",[s._v("u(user) 文件所有者")]),s._v(" "),t("li",[s._v("g(group) 文件所有者所在群组")]),s._v(" "),t("li",[s._v("o(other) 文件所有者及群组以外的用户")]),s._v(" "),t("li",[s._v("a(all) 即全部的用户，包含拥有者，所属群组以及其他用户")])])]),s._v(" "),t("li",[t("p",[s._v("权限操作")]),s._v(" "),t("ul",[t("li",[s._v("+ 添加某个权限。")]),s._v(" "),t("li",[s._v("- 取消某个权限。")]),s._v(" "),t("li",[s._v("= 赋予给定权限并取消其他所有权限")])])]),s._v(" "),t("li",[t("p",[s._v("具体权限:")]),s._v(" "),t("ul",[t("li",[s._v("r(read):表示可读取权限,用数字 4 表示")]),s._v(" "),t("li",[s._v("w(write):表示可写入权限,用数字 2 表示")]),s._v(" "),t("li",[s._v("x(excute):表示可执行权限,用数字 1 表示")])])])])])}),[],!1,null,null,null);a.default=e.exports}}]);