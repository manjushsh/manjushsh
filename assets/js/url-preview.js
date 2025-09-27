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
    
    // For other URLs, try to extract meta tags (limited by CORS)
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
    // Due to CORS limitations, we'll create a fallback preview
    return {
      title: this.extractDomainFromUrl(url),
      description: 'Live demo available',
      image: this.generateGenericPreviewImage(url)
    };
  }

  generateGenericPreviewImage(url) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 400;
    canvas.height = 200;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 400, 200);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 200);

    // Globe icon (simplified)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(200, 100, 40, 0, Math.PI * 2);
    ctx.stroke();
    
    // Horizontal lines
    ctx.beginPath();
    ctx.moveTo(160, 100);
    ctx.lineTo(240, 100);
    ctx.stroke();
    
    // Vertical curve
    ctx.beginPath();
    ctx.ellipse(200, 100, 20, 40, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Domain name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.extractDomainFromUrl(url), 200, 170);

    return canvas.toDataURL();
  }

  extractDomainFromUrl(url) {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'Live Demo';
    }
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