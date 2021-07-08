# docker 命令

docker-compose 国内安装镜像

```shell
curl -L https://get.daocloud.io/docker/compose/releases/download/1.24.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

## 启动

```shell
service docker start
# or
systemctl start docker
```

## 镜像 image

```shell
# 查看本机所有镜像
docker image ls

# 删除镜像
docker image rm [镜像名称]

# 拉取镜像 docker image pull [library/]hello-world
# library 为默认分组，可以忽略
docker image pull [镜像名称]

# 通过 Dockerfile 文件创建 image
# docker image build -t kaige:0.0.1 ./home
docker image build -t [镜像名称]:[版本号默认latest] [Dockerfile文件所在目录]

```

## 发布 image

去 [hub.docker.com](hub.docker.com) 或 [cloud.docker.com](cloud.docker.com) 注册一个账户, 使用如下命令登陆:

```shell
docker login
```

然后执行如下命令给镜像打 tag:

```shell
# docker image tag hello:0.0.1 kaige/hello:0.0.1
docker image tag [镜像名称] [username]/[repository]:[tag]

# 或者重新构建 image
docker image build -t [username]/[repository]:[tag] [Dockerfile文件所在目录]
```

最后执行如下命令发布：

```shell
docker image push [username]/[repository]:[tag]
```

## 容器 container

```shell
# 查看本机正在运行的容器
docker container ls

# 查看本机所有容器
docker container ls --all
```

```shell
# 创建一个容器 (每执行一次都会生成一个容器文件)
docker container run [镜像名称]
```

运行 `image` 文件会生成一个容器实例，这个**容器实例**也是一个文件，因此容易一旦生成，
会同时存在 **image 文件**和**容器文件**

> `const 容器文件 = new image() `

```shell
# --rm 参数表示关闭终止容器时，自动删除容器文件
docker container run --rm -p 8080:80 -it [镜像名称] /bin/bash
```

容器的启动与停止

```shell
# 启动一个容器
docker container start [容器ID]

# 停止一个容器
docker container stop [容器ID]

# 删除容器文件
docker container rm [容器ID]

# 终止一个容器
docker container kill [容器ID]
```

## Dockerfile

如何编写 dockerfile 文件

```shell
FROM node:8.0
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 300
CMD node app/index.js
```

Dockerfile 语法解析：

- `FROM node:80`: 继承官方的 node 镜像
- `COPY . /app`: 将当前目录所有内容复制到镜像中的 app 目录下（如果没有 app 文件夹会自动创建）
- `WORKDIR /app`: 指定接下来的工作路径为 /app
- `RUN npm install`: 在 /app 目录下执行 npm install 命令
- `EXPOSE 3000`: 将容器 3000 端口暴露出来，允许外部连接
- `CMD node app/index.js`： 执行 node app/index.js 启动服务

总结：拉取 node 镜像，然后将当前目录文件拷贝到容器的 `/app` 路径下，
并且指定接下来的工作路径为 `/app`, 然后运行 `npm` 命令，安装依赖，然后暴露出 `3000` 端口，
最后启动 node 服务，这样外界就可以通过 `http://localhost:3000` 访问容器里的 node 服务的内容了

### RUN 命令 CMD 的区别

- `RUN` 命令在镜像文件构建阶段执行，执行的结果会打包进入进镜像文件；
- `CMD` 命令则是在容器启动后执行

一个 `Dockerfile` 可以包含多个 `RUN` 命令，但是只能有一个 `CMD` 命令

> 如果指定了 `CMD` 命令，那么在 `docker container run` 后面就不能再附加命令了，比如前面的 `/bin/bash`, 否则会覆盖 `CMD` 命令

## 其他

```shell
# 查看日志
docker container logs [容器ID]

# 进入正在运行的容器
docker container exec -it [容器ID] /bin/bash

# 将容器里的文件拷贝到本机
docker container cp [容器ID]:[文件路径] [本机地址]
```
