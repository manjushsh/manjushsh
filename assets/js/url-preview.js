// URL Preview Functionality
class URLPreviewManager {
  constructor() {
    this.cache = new Map();
    this.init();
  }

  init() {
    // Initialize preview loading for all project cards
    document.addEventListener('DOMContentLoaded', () => {
      this.loadAllPreviews();
    });
  }

  async loadAllPreviews() {
    const placeholders = document.querySelectorAll('.project-preview-placeholder[data-url]');
    
    for (const placeholder of placeholders) {
      const url = placeholder.dataset.url;
      if (url && !this.cache.has(url)) {
        await this.loadPreview(placeholder, url);
      }
    }
  }

  async loadPreview(element, url) {
    try {
      // Show loading state
      element.querySelector('.preview-loader').style.display = 'block';

      // Check for custom preview image first
      const customPreviewImage = element.dataset.previewImage;
      if (customPreviewImage) {
        this.renderCustomPreview(element, customPreviewImage, url);
        return;
      }

      let previewData = this.cache.get(url);
      
      if (!previewData) {
        previewData = await this.fetchPreviewData(url);
        this.cache.set(url, previewData);
      }

      if (previewData.image) {
        this.renderPreview(element, previewData);
      } else {
        this.renderFallback(element, url);
      }

    } catch (error) {
      console.warn('Failed to load preview for:', url, error);
      this.renderFallback(element, url);
    }
  }

  async fetchPreviewData(url) {
    // For GitHub URLs, use GitHub API
    if (url.includes('github.com')) {
      return await this.fetchGitHubPreview(url);
    }
    
    // For other URLs, create appropriate preview
    return await this.fetchGenericPreview(url);
  }

  async fetchGitHubPreview(githubUrl) {
    try {
      // Extract owner and repo from GitHub URL
      const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) throw new Error('Invalid GitHub URL');

      const [, owner, repo] = match;
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();

      return {
        title: data.name || 'GitHub Repository',
        description: data.description || 'No description available',
        image: this.generateGitHubPreviewImage(data),
        language: data.language,
        stars: data.stargazers_count,
        forks: data.forks_count
      };
    } catch (error) {
      throw new Error('Failed to fetch GitHub data: ' + error.message);
    }
  }

  generateGitHubPreviewImage(repoData) {
    // Create a dynamic preview image using Canvas API
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 400;
    canvas.height = 200;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 400, 200);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 200);

    // Repository name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(repoData.name || 'Repository', 200, 60);

    // Description
    if (repoData.description) {
      ctx.fillStyle = '#8b949e';
      ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
      const words = repoData.description.split(' ');
      let line = '';
      let y = 90;
      
      for (let word of words) {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 360 && line !== '') {
          ctx.fillText(line, 200, y);
          line = word + ' ';
          y += 20;
          if (y > 130) break; // Limit to 2 lines
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 200, y);
    }

    // Stats
    if (repoData.stargazers_count !== undefined) {
      ctx.fillStyle = '#f85149';
      ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`⭐ ${repoData.stargazers_count}`, 50, 170);
    }

    if (repoData.language) {
      ctx.fillStyle = '#58a6ff';
      ctx.fillText(`● ${repoData.language}`, 150, 170);
    }

    return canvas.toDataURL();
  }

  async fetchGenericPreview(url) {
    // Create appropriate preview based on URL type
    const domain = this.extractDomainFromUrl(url);
    let title = 'Live Demo';
    let description = 'Interactive demo available';
    
    // Customize based on known domains
    if (url.includes('vercel.app')) {
      title = 'Vercel Deployment';
      description = 'Live application hosted on Vercel';
    } else if (url.includes('netlify.app')) {
      title = 'Netlify Deployment';
      description = 'Live application hosted on Netlify';
    } else if (url.includes('herokuapp.com')) {
      title = 'Heroku App';
      description = 'Live application on Heroku';
    } else {
      title = domain;
      description = 'Live demo application';
    }
    
    return {
      title: title,
      description: description,
      image: this.generateGenericPreviewImage(url)
    };
  }

  generateGenericPreviewImage(url) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 400;
    canvas.height = 200;

    // Different gradients based on domain
    const gradient = ctx.createLinearGradient(0, 0, 400, 200);
    if (url.includes('vercel.app')) {
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(1, '#333333');
    } else if (url.includes('netlify.app')) {
      gradient.addColorStop(0, '#00ad9f');
      gradient.addColorStop(1, '#32e0cd');
    } else {
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 200);

    // Play icon for demo sites
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(160, 70);
    ctx.lineTo(160, 130);
    ctx.lineTo(220, 100);
    ctx.closePath();
    ctx.fill();

    // Demo text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LIVE DEMO', 200, 160);

    // Domain name
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(this.extractDomainFromUrl(url), 200, 180);

    return canvas.toDataURL();
  }

  extractDomainFromUrl(url) {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'Live Demo';
    }
  }

  renderCustomPreview(element, imageUrl, url) {
    // Handle custom preview images from project configuration
    element.innerHTML = `
      <img src="${imageUrl}" alt="Project preview" loading="lazy" class="preview-custom" 
           onerror="this.parentElement.innerHTML='<div class=\\'preview-error\\'>Preview unavailable</div>'; this.parentElement.classList.add('preview-fallback');">
    `;
  }

  renderPreview(element, previewData) {
    element.innerHTML = `
      <img src="${previewData.image}" alt="${previewData.title}" loading="lazy" class="preview-generated">
      ${previewData.language ? `<span class="preview-language">${previewData.language}</span>` : ''}
    `;
  }

  renderFallback(element, url) {
    const isGitHub = url.includes('github.com');
    const fallbackImage = isGitHub ? this.generateGitHubFallback() : this.generateGenericPreviewImage(url);
    
    element.innerHTML = `<img src="${fallbackImage}" alt="Project preview" loading="lazy" class="preview-generated">`;
  }

  generateGitHubFallback() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 400;
    canvas.height = 200;

    // GitHub-style background
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, 400, 200);

    // GitHub logo (simplified)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚡', 200, 120);

    ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
    ctx.fillText('GitHub Repository', 200, 160);

    return canvas.toDataURL();
  }
}

// Initialize the preview manager
const previewManager = new URLPreviewManager();