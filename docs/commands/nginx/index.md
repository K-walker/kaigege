# nginx 命令

## 启动命令

```nginx
nginx -t # 查看 nginx 配置文件路径
nginx -s reload # 关闭并重启
nginx -s stop # 停止 nginx
```

## 正则

- = : 表示开头精确匹配
- ^~ : 表示 ur 开头以某个常规字符串开头，如 ^~ /static/ 匹配开头为 /static/ 的 uri
- ~ : 表示开头区分大小写
- ~\_ : 表示开头不区分大小写
- !~ ~ : 规则的反向，不匹配区分大小写的开头
- !~\_ : ~\* 规则的方向
- / : 通配符，任何请求都匹配

## SPA 配置

```nginx
  location /mall {
    #告诉客户端永不缓存 html 文件,但是其他文件可以缓存
    if ($request_filename ~* .*\.(?:htm|html)$) {
       add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
    }
    root /Users/king/nginx/www/dist;
    index index.html;
    try_files $uri $uri/ /mall/index.html;
 }
```
