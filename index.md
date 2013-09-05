---
layout: default
title: 主页
---

<div class="container" style="margin-top:10px;">
	<div class="row">
		<div class="col-lg-12">
			<img src="../css/banner.jpg" class="img-responsive" style="height: 400px; width: 100%; margin-bottom: 5px;">
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h3 class="panel-title">最新文章</h3>
				</div>
				<div class="panel-body">
					<div class="list-group">
						{% for post in site.posts limit:8 %}
						<a href="{{ BASE_PATH }}{{ post.url }}" class="list-group-item">
							<span class="badge">new</span>
							<h4 class="list-group-item-heading">{{ post.title }}</h4>
							<p class="list-group-item-text">{{ post.description }}</p>
						</a>
						{% endfor %}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>