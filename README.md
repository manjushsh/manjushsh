# Manjush's Blog

A modern, responsive blog built with Jekyll and hosted on GitHub Pages. Features engaging content about software development, programming tutorials, and tech insights.

## 🚀 Features

- **Modern Design**: Clean, responsive design that looks great on all devices
- **Jekyll-Powered**: Built with Jekyll for GitHub Pages compatibility
- **Syntax Highlighting**: Beautiful code syntax highlighting with Rouge
- **SEO Optimized**: Built-in SEO tags and meta information
- **Fast Loading**: Optimized images and efficient CSS/JS
- **Mobile-Friendly**: Responsive design with mobile navigation
- **Interactive Elements**: Code copying, reading progress, search functionality
- **Dark Mode Support**: Automatic dark mode based on system preferences

## 📝 Writing Blog Posts

### Quick Start

1. Create a new file in the `_posts` directory
2. Name it: `YYYY-MM-DD-title-with-hyphens.md`
3. Copy the template from `NEW-POST-TEMPLATE.md`
4. Write your content in Markdown
5. Commit and push to deploy

### Example Post Structure

```markdown
---
layout: post
title: "Your Engaging Title"
date: 2025-09-26 10:00:00 +0000
author: "Your Name"
tags: [javascript, tutorial, programming]
featured_image: /assets/images/your-image.jpg
excerpt: "Brief description of your post content."
---

# Your Post Content

Write your engaging content here using Markdown...
```

### Content Features

- **Code Blocks**: Syntax-highlighted code with copy buttons
- **Images**: Responsive images with proper alt text
- **Quotes**: Beautiful blockquotes for emphasis
- **Tables**: Responsive tables for data presentation
- **Links**: Internal and external linking
- **Tags**: Categorization and search

## 🛠️ Project Structure

```
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page templates
├── _includes/           # Reusable components
├── _sass/              # Stylesheet partials
├── _posts/             # Blog posts
├── assets/             # Static assets
│   ├── css/           # Compiled stylesheets
│   ├── js/            # JavaScript files
│   └── images/        # Image assets
├── index.html          # Homepage
├── blog.html           # Blog listing page
├── about.md            # About page
└── contact.md          # Contact page
```

## 🎨 Customization

### Colors and Typography

Edit variables in `_sass/_variables.scss`:

```scss
:root {
  --primary-color: #2563eb;    // Main brand color
  --text-primary: #1f2937;     // Main text color
  --font-family-sans: 'Inter'; // Main font
}
```

### Adding New Pages

1. Create a new `.md` or `.html` file in the root directory
2. Add frontmatter with `layout: page`
3. Update navigation in `_includes/header.html`

### Styling Components

- **Base styles**: `_sass/_base.scss`
- **Layout**: `_sass/_layout.scss`
- **Components**: `_sass/_components.scss`
- **Responsive**: `_sass/_responsive.scss`

## 🚀 Deployment

This blog is configured to deploy automatically to GitHub Pages from the `blog-v1` branch.

### Deployment Steps

1. **Configure GitHub Pages**:
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `blog-v1` as the source branch
   - Select `/ (root)` as the folder

2. **Push Changes**:
   ```bash
   git add .
   git commit -m "Add new blog post"
   git push origin blog-v1
   ```

3. **Automatic Build**: GitHub Pages will automatically build and deploy your site

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file with your domain
2. Configure DNS settings with your provider
3. Enable HTTPS in GitHub Pages settings

## 📱 Performance Features

- **Responsive Images**: Automatically optimized for different screen sizes
- **CSS Optimization**: Minified and optimized stylesheets
- **JavaScript Enhancement**: Progressive enhancement with vanilla JS
- **SEO Optimization**: Meta tags, Open Graph, and structured data
- **Fast Loading**: Efficient asset loading and caching

## 🎯 SEO Best Practices

- Descriptive page titles and meta descriptions
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text for all images
- Internal linking structure
- Sitemap generation
- Social media meta tags

## 🔧 Development

### Local Development

```bash
# Install Jekyll (requires Ruby)
gem install jekyll bundler

# Clone the repository
git clone https://github.com/manjushsh/manjushsh.git
cd manjushsh

# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# Visit http://localhost:4000
```

### Adding New Features

1. **Styling**: Add styles to appropriate SCSS files
2. **JavaScript**: Enhance `assets/js/main.js`
3. **Components**: Create new includes in `_includes/`
4. **Layouts**: Add new layouts to `_layouts/`

## 📊 Analytics (Optional)

To add Google Analytics:

1. Get your tracking ID
2. Add to `_config.yml`:
   ```yaml
   google_analytics: UA-XXXXXXXXX-X
   ```
3. Analytics will be automatically included

## 🤝 Contributing

Feel free to suggest improvements or report issues:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This blog template is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Jekyll**: Static site generator
- **GitHub Pages**: Free hosting platform
- **Rouge**: Syntax highlighting
- **Inter Font**: Typography by Rasmus Andersson
- **JetBrains Mono**: Code font by JetBrains

---

**Happy blogging!** 🎉

For questions or suggestions, feel free to reach out through the contact page or open an issue on GitHub.
