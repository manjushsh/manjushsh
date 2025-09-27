---
layout: default
title: "Projects"
description: "A showcase of my development projects, experiments, and open-source contributions"
permalink: /projects/
---

<div class="projects-page-header">
  <h1 class="projects-page-title">My Projects</h1>
  <p class="projects-page-description">
    A collection of projects I've built, ranging from web applications to open-source libraries. 
    Each project represents a learning journey and an opportunity to solve real-world problems.
  </p>
</div>

<div class="projects-grid">
  {% assign sorted_projects = site.projects | sort: 'date' | reverse %}
  {% for project in sorted_projects %}
    {% include project-card.html project=project %}
  {% endfor %}
</div>

<script src="{{ '/assets/js/url-preview.js' | relative_url }}"></script>