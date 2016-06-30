---
layout: archive
title: "Software"
date: 2016-03-30T11:39:03-04:00
modified:
excerpt: "I did some software. Some is useful, others not"
tags: []
image:
  feature: software.jpg
  teaser:
---

<div class="tiles">
{% for post in site.categories.software %}
  {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->