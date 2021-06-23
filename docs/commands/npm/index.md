# npm 命令

## 安装同一个库的不同版本

```shell
npm i <alias>@npm:<packageName>@版本
```

package.json

```json
"dependencies": {
   "别名":"npm:包名@版本号"
}
```

## 查看全局安装的库

```shell
npm list --depth=0 -g
```
