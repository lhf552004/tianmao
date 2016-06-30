---
layout: article
category : articles
title :  node-opcua Note
tagline: ""
tags : [Nodejs]
image:
  feature:
  teaser: nodejs.jpg
---


## node-opcua
I want to learn opcua, so I find a open source project on internet, and it is based on nodejs.<br/>
I think it is easier for me, for now I'm using javasript to develop project.<br/>
This article is focus on node-opcua, so the installing of nodejs is ignored.<br/>
the project is at https://github.com/node-opcua/node-opcua <br/>
    I download it.

## prerequisite

### Nodejs

npm will be installed automatically.

### openssl

this they doesn't mentioned. But the project use it. So we need to install it before. <br/>
   However, <a href="https://www.openssl.org/">official</a> only supply linux version. we have to compile it with .<br/>
   I don't want to go further on openssl. I just want binary file. <br/>
   Yes, They have considered this issue. They mention it at<a href="https://www.openssl.org/community/binaries.html/">Community:</a> <br/>
   Some third party products offered the binary. You just select it at<a href="https://wiki.openssl.org/index.php/Binaries/">Binaries</a> <br/>
   <p>As suggestion, you can download directly from http://indy.fulgan.com/SSL/openssl-1.0.2e-x64_86-win64.zip <br/>
   Put contents at ..\node-opcua\bin\openssl\</p>
   Or you can download from my page. <br/>
   download： <a href = "{{ site.url }}/openssl-1.0.2e-x64_86-win64.zip">openssl</a>

## download

$ git clone https://github.com/node-opcua/node-opcua.git
$ cd node-opcua

## Change

Before run the server. some change need to be done in the source code.<br/>
<a href = "https://github.com/node-opcua/node-opcua/issues/212">Change</a>

## Run server

After doing these, then follow the instruction.
$ npm install
$ node bin/simple_server