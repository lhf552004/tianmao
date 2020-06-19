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

运行该命令:
`npm run webdriver-manager-update`

然后并且修改e2e的命令：

 `"e2e": "ng e2e --dev-server-target= --webdriver-update=false",`

修改的原因是由于运行ng e2e默认更新chrome的webdriver，所以需要手动关闭

可以查看update-config.json在
`"/node_modules/protractor/node_modules/webdriver-manager/selenium/update-config.json"`

再次运行e2e test:

`npm run e2e`

问题解决：

![结果](/images/e2e-test-result.PNG)