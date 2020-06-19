---
layout: article
category : articles
title :  
tagline: ""
tags : [Angular]
image:
  feature:
  teaser: angular-e2e-test.png
---


### 问题
现在需要运行e2e测试，运行命令
`ng e2e`
发生错误，session not created this version of chromedriver only supports chrome version 83
然后我查看我的chrome的版本， 81.0.4044.138，不匹配。
解决办法是在package.json添加scripts命令：
`"webdriver-manager-update": "webdriver-manager update --versions.chrome 81.0.4044.138",`
并且修改e2e的命令：
 `"e2e": "ng e2e --dev-server-target= --webdriver-update=false",`
修改的原因是由于运行ng e2e会自动更新chrome的webdriver.
可以查看update-config.json在
`"/node_modules/protractor/node_modules/webdriver-manager/selenium/update-config.json"`