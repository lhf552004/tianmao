---
layout: article
category : articles
title :  
tagline: ""
tags : [DDD]
image:
  feature:
  teaser: DDD.jpg
---


## 总结
领域驱动设计(DDD: Domain Drive Design)首先也是先建模，建模的好处，是使不同部门之间沟通的桥梁，例如软件部门和需求提出部门的一致性沟通。
DDD另一个优越性，领域模型是有边界的，这句话怎么理解呢，举个例子，同一个人，他具有不同的角色，不同的角色所担负的责任是不同的，这就是边界。
我作为一个程序员，我的工作就是了解需求，设计领域模型，设计代码。而作为一个父亲，我需要辅导孩子的作业，陪孩子玩。所以在领域模型中，
即使是同一个对象，我需要设计两个领域模型。

## 实现
DDD总体结构分为四层  :  Infrastructure(基础实施层)，Domain(领域层)，Application(应用层)，Interfaces(表示层，也叫用户界面层或是接口层)，各个层面的作用下面介绍。

![架构](/images/Structure.png)

根据不同的情况，实现情况并不一定完全一致。或增或减层级。