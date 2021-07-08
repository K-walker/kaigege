# linux 命令

## 基础命令

```shell
mkdir   xxx       # 创建文件夹
vi  xxx           # 创建一个带输入内容的文件
rm xxx            # 删除文件
rm -rf xxx        # 强制删除文件夹及以下所有子目录和文件
mv path1  path2   # 移动
```

## 设置文件所有者和文件所在组

```shell
chgrp  用户名  文件名  -R   // 修改所有者
chown  用户名  文件名  -R   // 修改所在组
```

修改 m 目录的所在分组

> chown root m/ -R

## 创建文件并写入内容

```shell
# 创建 1.md 文件，并写入字符串 hello
echo "hello" > 1.md
```

## . 和 /

> **.** ：表示当前目录
> **/** ：表示系统根目录

## 建立软连接

将 node 添加到全局环境

```shell
   ln -s /usr/local/bin/nodejs/node /usr/bin/node
```

- /usr/local/bin/nodejs/node: node 的安装路径
- /usr/bin/node: 环境变量目录

## 解压缩

tar -zcvf ../release.tgz .
tar –xvf x.tgz

## 判断文件/文件夹

```shell
   # -d 表示文件夹
   if [ -d '/data/'];then
     echo '文件夹存在'
   fi
   # -f 表示文件
   if [ -d '/data/1.txt'];then
     echo '文件存在'
   fi
   # ! 表示取反
   if [ ！-d '/data/'];then

   fi
```

## 文件比较符

> -e 判断对象是否存在
> -d 同上，并且为目录
> -f 同上，并且为文件
> -L 同上，并且为符号链接
> -h 同上，并且为软链接
> -s 同上，并且长度不为 0

与判断权限相关：

> -r 同上，并且可读
> -w 同上，并且可写
> -x 同上，并且可执行
> -O 同上，并且属于当前用户
> -G 同上，并且属于当前用户组

比较相关：

> -nt 判断 file1 是否比 file2 新 [ "/data/file1" -nt "/data/file2" ]
> -ot 与上相反

## find

语法:

> find path -option [ -print ] [ -exec -ok command ] {} \;

示例:

```shell
  # 查找demo目录及其子目录下所有 .mp3 的文件
  find demo -name "*.mp3"

  # 查询到MP3w文件之后执行 -exec 后面给出的命令(一一删除)不要忘记最后的 ;
  # -ok 与 -exec 相同，执行前会询问用户
  find demo -name "*.mp3" -exec rm {} \;
```

参数说明：

> -name name,-iname name : 文件名符合 `name` 的文件，-iname 忽略大小写
> -path path,-ipath path : 路径符合 `path` 的文件， -ipath 忽略大小写
> -pid n: 进程 `id` 是 `n` 的文件
> -type c : 文件类型是 `c` 的文件

-type 参数说明：

> d: 目录
> c: 字型装置文件
> b: 区块装置文件
> f: 一般文件
> l: 符号连结
> s: socket
> p: 具名贮列

## xargs

简单解释，给命令传递参数的一个过滤器，可以将管道或标准输入的数据转化成命令行参数

## sed 修改文件内容并保存

```shell
 sed -i'.bak' -e "s/要被取代的字串/新的字串/g" index.txt
 # 删除备份文件 .bak
 find ./ -name '*.bak' -exec rm {} \;
```

> PS: 记得删除 .bak 备份文件

## wc

语法：

wc [-clw][--help][--version][文件]

```shell
wc -w 1.txt  // 统计 1.txt 文件中的字数
```

> -l: 统计行数

```shell
// 统计 temp 文件夹下所有 .mp3 文件的个数
find temp -type f -name "*.mp3" | wc -l
```

> -c: 显示字节数
> -w: 显示字数

语法：

```shell
  # 查找 sbin 目录下权限是 700 的文件，并且一一列举出来
  find /sbin -perm +700 |xargs ls -l

  # 查询demo下所有MP3文件，并将其一一移动到temp文件夹下
  find demo -name '*.mp3' | xargs -n1 -I {} mv {} ./temp/
  # 查找所有 .jpg 文件,并压缩
  find . -type f -name "*.jpg" -print | xargs tar -czvf images.tar.gz
```

参数说明:

> -n num: `num` 是数字，表示命令再执行时，一次使用几个参数，默认是所有的
> -I: 将 `xargs` 的每项名称，一行一行赋值给 `{}`,可以用 `{}` 代替

注意：`/bin/rm Argument list too long`

> 执行太多文件时报这个错时，可以通过 `xargs` 去避免这个问题

## 将 find 命令的返回结果赋值给变量

用反引号将 `find` 命令包裹起来，结果赋值给 `VERSION` 变量

```shell
# 获取符合规则的目录名
VERSION=`find dist/h5 -type d -name "v*" -maxdepth 1 |xargs basename`
```

## 获取 json 文件中指定字段的值

```shell
function get_v() {
  local json_file=$1
  local key=$2

  value=$(grep -o "\"$key\"\s*:\s*\"\?[^\"]\+\"\?" $json_file | sed -n -e 's/"//gp' | awk -F ':' '{print $2}')
  echo $value
}
# 调用 get_v方法，获取 package.json 文件中 version 字段的值
VERSION=$(get_v 'package.json' 'version')
```

## 修改权限

> chmod [<权限范围><权限操作><具体权限>] [文件或目录…]

- 权限范围：

  - u(user) 文件所有者
  - g(group) 文件所有者所在群组
  - o(other) 文件所有者及群组以外的用户
  - a(all) 即全部的用户，包含拥有者，所属群组以及其他用户

- 权限操作

  - \+ 添加某个权限。
  - \- 取消某个权限。
  - \= 赋予给定权限并取消其他所有权限

- 具体权限:
  - r(read):表示可读取权限,用数字 4 表示
  - w(write):表示可写入权限,用数字 2 表示
  - x(excute):表示可执行权限,用数字 1 表示
