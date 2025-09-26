# Blog Post Template

Copy this template when creating new blog posts in the `_posts` directory. 

## File Naming Convention
Files should be named: `YYYY-MM-DD-title-with-hyphens.md`

Example: `2025-09-26-my-awesome-post.md`

## Template

```markdown
---
layout: post
title: "Your Engaging Title Here"
date: YYYY-MM-DD HH:MM:SS +0000
author: "Your Name"
tags: [tag1, tag2, tag3]
featured_image: /assets/images/your-image.jpg
excerpt: "A compelling excerpt that describes what readers will learn from this post. Keep it under 160 characters for best SEO."
---

# Your Main Title

Start with a compelling introduction that hooks the reader and clearly states what they'll learn.

## Section Headers

Use H2 headers for main sections to improve readability and SEO.

### Subsections

H3 headers for subsections when needed.

## Code Examples

Use syntax highlighting for code blocks:

```javascript
// Your code example here
function example() {
  console.log("Hello, World!");
}
```

## Images

Include images with proper alt text:

![Alt text description](/assets/images/your-image.jpg)

## Quotes and Callouts

Use blockquotes for emphasis:

> "This is an important quote or key insight that readers should remember."

## Lists

### Unordered Lists
- Point one
- Point two  
- Point three

### Ordered Lists
1. Step one
2. Step two
3. Step three

## Links

[Link text](https://example.com) for external links.
[Internal link](/about/) for internal pages.

## Tables

| Feature | Description | Status |
|---------|-------------|--------|
| Feature 1 | Cool feature | ✅ Done |
| Feature 2 | Another feature | 🚧 In Progress |

## Conclusion

Wrap up with key takeaways and next steps for readers.

---

**Questions or feedback?** Feel free to reach out - I'd love to hear from you!

*Up next: [Link to related content or upcoming posts]*
```

## Frontmatter Fields Explained

- `layout`: Always use "post" for blog posts
- `title`: The main title of your post (appears in <title> and h1)
- `date`: Publication date and time in YYYY-MM-DD HH:MM:SS +0000 format
- `author`: Author name (optional, defaults to site author)
- `tags`: Array of tags for categorization and search
- `featured_image`: Path to header image (optional)
- `excerpt`: Short description used in previews and SEO

## Writing Tips

### Engaging Content
- Start with a problem or question
- Use personal anecdotes when relevant
- Include practical examples
- End with actionable takeaways

### Technical Posts
- Test all code examples
- Explain complex concepts step by step
- Include error handling in examples
- Provide context for when to use techniques

### SEO Best Practices
- Use descriptive, keyword-rich titles
- Include relevant tags
- Write compelling excerpts
- Use proper heading structure (H1 → H2 → H3)
- Add alt text to images

### Markdown Tips
- Use **bold** for emphasis
- Use *italics* for subtle emphasis
- Use `inline code` for variable names and short snippets
- Use --- for horizontal rules
- Use > for blockquotes

## Image Guidelines

### Adding Images
1. Add images to `/assets/images/`
2. Use descriptive filenames: `javascript-array-methods.jpg`
3. Optimize for web (compress images)
4. Include alt text for accessibility

### Image Formats
- Use `.jpg` for photos
- Use `.png` for screenshots and graphics
- Use `.svg` for simple icons and diagrams

## Publishing Checklist

Before publishing your post:

- [ ] Proofread for typos and grammar
- [ ] Test all code examples
- [ ] Verify all links work
- [ ] Add appropriate tags
- [ ] Include featured image (if applicable)
- [ ] Write compelling excerpt
- [ ] Check formatting in preview
- [ ] Verify publication date is correct