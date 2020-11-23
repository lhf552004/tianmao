---
layout: article
category : articles
title :  
tagline: ""
tags : [GWT]
image:
  feature:
  teaser: GWT.png
---


### 问题
我在GreetingService中添加了一个method，并在server中添加了实施。运行时出现一个错误
greetServlet: An IncompatibleRemoteServiceException was thrown while processing this call.
com.google.gwt.user.client.rpc.IncompatibleRemoteServiceException: This application is out of date, please click the refresh button on your browser. ( Could not locate requested method 'caculate(int, int)' in interface 'com.jci.myproject2.client.GreetingService' )

根据下面文章发现，确实 class文件没有更新
[java.lang.ClassNotFoundException on GWT async class in webapp](https://stackoverflow.com/questions/23435688/java-lang-classnotfoundexception-on-gwt-async-class-in-webapp)

C:\Users\jliyawe\eclipse-workspace\MyGWTProject2\war\WEB-INF\classes\com\jci\myproject2\server

解决方案
用command 运行 ant devmode, class文件重新编译了问题解决。

遗留问题，如何自动编译呢