---
layout: default
title: Blog
---

<ol>
{% for post in site.posts %}
    <li>
        <a href="{{ post.url }}">{{ post.date | date: "%B %d, %Y" }}</a>
    </li>
{% endfor %}
</ol>
