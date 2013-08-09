---
layout: page
tagline:
---
{% include JB/setup %}

<div class="hero-unit">
  <h1 class="name">Tom</h1>
</div>

### 最新文章
<ul class="posts">
  {% for post in site.posts limit:5%}
  <li>
      <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
      <time datetime="{{ post.date }}">{{ post.date | date: "%Y年%m月%d日" }}</time>
  </li>
  {% endfor %}
</ul>