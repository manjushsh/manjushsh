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

            // Get fallback image from data attribute
            const fallbackImage = element.getAttribute('data-fallback-image');

            let previewData = this.cache.get(url);

            if (!previewData) {
                previewData = await this.fetchPreviewData(url, fallbackImage);
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

    async fetchPreviewData(url, fallbackImage = null) {
        // For GitHub URLs, use GitHub API
        if (url.includes('github.com')) {
            return await this.fetchGitHubPreview(url);
        }

        // For other URLs, create appropriate preview
        return await this.fetchGenericPreview(url, fallbackImage);
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

    async fetchGenericPreview(url, fallbackImage = null) {
        // Try to fetch Open Graph data first
        try {
            const ogData = await this.fetchOpenGraphData(url);
            if (ogData && ogData.image) {
                return ogData;
            }
        } catch (error) {
            console.warn('Failed to fetch Open Graph data for:', url, error);
        }

        // Use configured fallback image if available
        if (fallbackImage) {
            console.log('Using configured fallback image:', fallbackImage);
            return {
                title: this.getTitleFromUrl(url),
                description: this.getDescriptionFromUrl(url),
                image: fallbackImage
            };
        }

        // Fallback to generated preview
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

    getTitleFromUrl(url) {
        const domain = this.extractDomainFromUrl(url);
        
        // Customize based on known domains
        if (url.includes('vercel.app')) {
            return 'Vercel Deployment';
        } else if (url.includes('netlify.app')) {
            return 'Netlify Deployment';
        } else if (url.includes('herokuapp.com')) {
            return 'Heroku App';
        } else {
            return domain;
        }
    }

    getDescriptionFromUrl(url) {
        // Customize based on known domains
        if (url.includes('vercel.app')) {
            return 'Live application hosted on Vercel';
        } else if (url.includes('netlify.app')) {
            return 'Live application hosted on Netlify';
        } else if (url.includes('herokuapp.com')) {
            return 'Live application on Heroku';
        } else {
            return 'Live demo application';
        }
    }

    async fetchOpenGraphData(url) {
        console.log(`Attempting to fetch Open Graph data for: ${url}`);

        // Try multiple CORS proxy services
        const proxies = [
            `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
            `https://corsproxy.io/?${encodeURIComponent(url)}`,
            `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
        ];

        for (const proxyUrl of proxies) {
            try {
                console.log(`Trying proxy: ${proxyUrl}`);
                const response = await fetch(proxyUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json, text/html'
                    }
                });

                if (!response.ok) {
                    console.warn(`Proxy returned status ${response.status}`);
                    continue;
                }

                let html;
                const contentType = response.headers.get('content-type');

                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    html = data.contents || data.data || data.body;
                } else {
                    html = await response.text();
                }

                if (html) {
                    console.log('Successfully fetched HTML content');
                    const ogData = this.parseOpenGraphTags(html, url);
                    if (ogData && ogData.image) {
                        console.log('Found Open Graph data:', ogData);
                        return ogData;
                    }
                }

            } catch (error) {
                console.warn(`Proxy ${proxyUrl} failed:`, error);
                continue;
            }
        }

        console.log('All proxy attempts failed, returning null');
        return null;
    }

    parseOpenGraphTags(html, originalUrl) {
        console.log('Parsing HTML for Open Graph tags...');

        // Create a temporary DOM element to parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract Open Graph tags with multiple fallbacks
        const ogImage = this.getMetaContent(doc, 'og:image') ||
            this.getMetaContent(doc, 'og:image:url') ||
            this.getMetaContent(doc, 'twitter:image') ||
            this.getMetaContent(doc, 'twitter:image:src') ||
            this.getMetaContent(doc, 'image') ||
            this.getLinkHref(doc, 'image_src') ||
            this.findFaviconUrl(doc, originalUrl);

        const ogTitle = this.getMetaContent(doc, 'og:title') ||
            this.getMetaContent(doc, 'og:site_name') ||
            this.getMetaContent(doc, 'twitter:title') ||
            this.getMetaContent(doc, 'application-name') ||
            doc.querySelector('title')?.textContent?.trim() ||
            'Live Demo';

        const ogDescription = this.getMetaContent(doc, 'og:description') ||
            this.getMetaContent(doc, 'twitter:description') ||
            this.getMetaContent(doc, 'description') ||
            'Interactive web application';

        console.log('Extracted metadata:', { ogTitle, ogDescription, ogImage });

        // Return data if we found at least an image or sufficient metadata
        if (ogImage || (ogTitle && ogTitle !== 'Live Demo')) {
            let imageUrl = ogImage;

            if (imageUrl) {
                // Handle relative URLs
                if (imageUrl.startsWith('//')) {
                    const baseUrl = new URL(originalUrl);
                    imageUrl = `${baseUrl.protocol}${imageUrl}`;
                } else if (imageUrl.startsWith('/')) {
                    const baseUrl = new URL(originalUrl);
                    imageUrl = `${baseUrl.protocol}//${baseUrl.host}${imageUrl}`;
                } else if (!imageUrl.startsWith('http')) {
                    const baseUrl = new URL(originalUrl);
                    imageUrl = `${baseUrl.protocol}//${baseUrl.host}/${imageUrl}`;
                }
            }

            return {
                title: ogTitle.substring(0, 80), // Allow longer titles
                description: ogDescription.substring(0, 150), // Allow longer descriptions
                image: imageUrl
            };
        }

        console.log('No suitable Open Graph data found');
        return null;
    }

    getLinkHref(doc, rel) {
        const link = doc.querySelector(`link[rel="${rel}"]`);
        return link ? link.getAttribute('href') : null;
    }

    findFaviconUrl(doc, originalUrl) {
        // Look for favicon as last resort
        const favicon = doc.querySelector('link[rel="icon"]') ||
            doc.querySelector('link[rel="shortcut icon"]') ||
            doc.querySelector('link[rel="apple-touch-icon"]');

        if (favicon) {
            let href = favicon.getAttribute('href');
            if (href) {
                if (href.startsWith('/')) {
                    const baseUrl = new URL(originalUrl);
                    return `${baseUrl.protocol}//${baseUrl.host}${href}`;
                } else if (!href.startsWith('http')) {
                    const baseUrl = new URL(originalUrl);
                    return `${baseUrl.protocol}//${baseUrl.host}/${href}`;
                }
                return href;
            }
        }

        return null;
    }

    getMetaContent(doc, property) {
        // Try property attribute first (for og: tags)
        let meta = doc.querySelector(`meta[property="${property}"]`);
        if (meta) return meta.getAttribute('content');

        // Try name attribute (for standard meta tags)
        meta = doc.querySelector(`meta[name="${property}"]`);
        if (meta) return meta.getAttribute('content');

        return null;
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

    renderPreview(element, previewData) {
        const imgElement = document.createElement('img');
        imgElement.alt = previewData.title;
        imgElement.loading = 'lazy';
        imgElement.className = 'preview-generated';

        // Handle both canvas data URLs and external image URLs
        imgElement.src = previewData.image;

        // Add error handling for external URLs
        if (typeof previewData.image === 'string' && previewData.image.startsWith('http')) {
            imgElement.onerror = () => {
                // Fallback to generated image if external URL fails
                const fallbackUrl = element.dataset.url;
                imgElement.src = this.generateGenericPreviewImage(fallbackUrl);
            };
        }

        element.innerHTML = '';
        element.appendChild(imgElement);

        // Add language badge if available
        if (previewData.language) {
            const languageBadge = document.createElement('span');
            languageBadge.className = 'preview-language';
            languageBadge.textContent = previewData.language;
            element.appendChild(languageBadge);
        }
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