---
layout: default
title: Blog
---

<h1>Blog Posts</h1>

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

<style>
    /* Styling untuk Blog List */
    .post-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .post-item {
        margin-bottom: 20px;
        padding: 15px;
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .post-title {
        font-size: 1.5em;
        font-weight: 600;
        color: #007bff;
        text-decoration: none;
    }

    .post-title:hover {
        color: #0056b3;
        text-decoration: underline;
    }

    .post-meta {
        font-size: 0.9em;
        color: #888;
        margin-top: 5px;
    }

    .post-tags .tag {
        background-color: #007bff;
        color: white;
        padding: 2px 8px;
        border-radius: 4px;
        margin-right: 5px;
        text-decoration: none;
        font-size: 0.8em;
    }

    .post-tags .tag:hover {
        background-color: #0056b3;
    }

    .post-excerpt {
        font-size: 1em;
        color: #333;
        margin-top: 10px;
    }
</style>
