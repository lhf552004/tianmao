---
layout: archive
title: "杂记"
date: 2014-05-30T11:39:03-04:00
modified:
excerpt: "堆放着思考，灵感和一些琐事"
tags: []
image:
  feature:
  teaser:
---

<div class="tiles">
{% for post in site.categories.articles %}
  {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->