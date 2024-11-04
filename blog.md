---
layout: default
title: Blog
---

# Blog Posts

<div class="post-list">
    <ul>
    {% for post in site.posts %}
        <li class="post-item">
            <a href="{{ post.url }}" class="post-title">{{ post.title }}</a>
            <div class="post-meta">
                <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
                {% if post.tags %}
                    <span class="post-tags">
                        {% for tag in post.tags %}
                            <a href="/tags/{{ tag | downcase | slugify }}" class="tag">{{ tag }}</a>
                        {% endfor %}
                    </span>
                {% endif %}
            </div>
            {% if post.excerpt %}
                <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
            {% endif %}
        </li>
    {% endfor %}
    </ul>
</div>
