---
layout: default
title: Blog
---

<h1>Blog Posts</h1>

<ol>
{% for post in site.posts %}
    <li>
        <a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%B %d, %Y" }}
    </li>
{% endfor %}
</ol>
