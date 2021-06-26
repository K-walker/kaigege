#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 自动注入百度统计脚本到每个html页面
head="<\/head>"
# 百度统计脚本（请将 / 替换成 \/ 进行转义！！！）
script='<script>var _hmt = _hmt || [];(function() {var hm = document.createElement("script");hm.src = "https:\/\/hm.baidu.com\/hm.js?1d56a9f2a862cd29074c56b896f1af64";var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s);})();<\/script>'

files=`find docs/.vuepress/dist -type f -name "*.html"`
for f in $files
do
  sed -i'.bak' -e "s/$head/$script$head/" $f
  rm -rf "$f.bak"
done

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:K-walker/kaigege.git master:gh-pages

cd -