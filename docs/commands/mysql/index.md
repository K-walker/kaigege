# mysql 命令

## 启动/关闭

```shell
mysql.server start
mysql.server stop
```

## 重置密码

本地 mysql 密码： 123456

```shell
set password for root@localhost = password('123')
```

## 导入 sql 文件

```shell
use [DATABASE_NAME];
source [sql 文件路径];
```

## 开启远程登陆

```shell
GRANT ALL PRIVILEGES ON _._ TO 'root'@'%' IDENTIFIED BY '你的 mysql 密码';
flush privileges;
```
