// Lazy Loading Chart Configuration and Interaction Logic

// Theme Management - Simplified and Fixed
function initTheme() {
  // Get saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  setTheme(savedTheme);
  
  // Bind click event to theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    console.log('Theme toggle initialized');
  } else {
    console.error('Theme toggle button not found');
  }
}

function setTheme(theme) {
  console.log('Setting theme to:', theme);
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  
  // Visual feedback - temporarily change body opacity to show theme change
  document.body.style.transition = 'all 0.3s ease';
  
  // Update meta theme-color for mobile browsers
  let metaTheme = document.querySelector('meta[name="theme-color"]');
  if (!metaTheme) {
    metaTheme = document.createElement('meta');
    metaTheme.name = 'theme-color';
    document.head.appendChild(metaTheme);
  }
  metaTheme.content = theme === 'light' ? '#f8fafc' : '#0f172a';
  
  console.log('Theme set. Current data-theme:', document.documentElement.getAttribute('data-theme'));
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = current === 'light' ? 'dark' : 'light';
  console.log('Toggling theme from', current, 'to', newTheme);
  setTheme(newTheme);
}

// Loading state management
let chartsLoaded = false;
let chartJsLoaded = false;
let loadStartTime = 0;

// Performance monitoring
function logPerformance(event, duration) {
  if (console.time && console.timeEnd) {
    console.log(`⚡ ${event}: ${duration}ms`);
  }
}

// Get theme-aware colors (excluding tooltips)
function getThemeColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    text: isDark ? "#94a3b8" : "#475569",
    border: isDark ? "#334155" : "#e2e8f0",
    tooltip: {
      // Keep tooltips consistent across themes
      bg: "rgba(15, 23, 42, 0.9)",
      border: "#334155",
      textColor: "#cbd5e1"
    }
  };
}

// Lazy load Chart.js when charts are in viewport
function loadChartJs() {
  return new Promise((resolve, reject) => {
    if (window.Chart) {
      resolve();
      return;
    }
    
    loadStartTime = performance.now();
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = () => {
      chartJsLoaded = true;
      const loadTime = performance.now() - loadStartTime;
      logPerformance('Chart.js loaded', Math.round(loadTime));
      
      // Set theme-aware global defaults after Chart.js loads
      const colors = getThemeColors();
      Chart.defaults.color = colors.text;
      Chart.defaults.borderColor = colors.border;
      Chart.defaults.font.family = "'Inter', sans-serif";
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Intersection Observer for lazy loading
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !chartsLoaded) {
      chartsLoaded = true;
      loadChartsWhenReady();
    }
  });
}, {
  rootMargin: '50px' // Start loading 50px before charts are visible
});

// Show loading skeleton
function showLoadingSkeleton(chartId) {
  const canvas = document.getElementById(chartId);
  if (canvas && canvas.parentNode) {
    const container = canvas.parentNode;
    canvas.style.display = 'none';
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-skeleton chart-loading h-full flex items-center justify-center';
    loadingDiv.innerHTML = '<i class="fas fa-chart-pie mr-2"></i>Loading chart...';
    loadingDiv.id = `loading-${chartId}`;
    container.appendChild(loadingDiv);
  }
}

// Hide loading skeleton and show chart
function hideLoadingSkeleton(chartId) {
  const canvas = document.getElementById(chartId);
  const loadingDiv = document.getElementById(`loading-${chartId}`);
  if (canvas && loadingDiv) {
    loadingDiv.remove();
    canvas.style.display = 'block';
    canvas.classList.add('fade-in');
    setTimeout(() => canvas.classList.add('loaded'), 10);
  }
}

async function loadChartsWhenReady() {
  // Show loading skeletons
  showLoadingSkeleton('focusChart');
  showLoadingSkeleton('domainBarChart');
  
  try {
    // Load Chart.js if not already loaded
    await loadChartJs();
    
    // Small delay for better UX (prevents flash)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Initialize charts
    initializeCharts();
  } catch (error) {
    console.error('Failed to load Chart.js:', error);
    // Show error state
    const focusCanvas = document.getElementById('focusChart');
    if (focusCanvas && focusCanvas.parentNode) {
      focusCanvas.parentNode.innerHTML = '<div class="chart-loading h-full flex items-center justify-center text-red-400"><i class="fas fa-exclamation-triangle mr-2"></i>Failed to load chart</div>';
    }
  }
}

function handleChartClick(evt, elements, chart) {
  if (!elements || elements.length === 0) return;
  const index = elements[0].index;
  const label = chart.data.labels[index];
  showSummary(label);
}

function showSummary(key) {
  const container = document.getElementById("drilldown-container");
  const title = document.getElementById("drilldown-title");
  const totalEl = document.getElementById("dd-total");
  const systemsEl = document.getElementById("dd-systems");

  // Attempt exact match first
  let data = SUMMARY_DATA[key];

  // Fallback: Fuzzy matching if exact key isn't found (e.g. for long labels)
  if (!data) {
    const fuzzyKey = Object.keys(SUMMARY_DATA).find(
      (k) => key.includes(k) || k.includes(key)
    );
    if (fuzzyKey) data = SUMMARY_DATA[fuzzyKey];
    else {
      console.warn("No data found for key:", key);
      return;
    }
  }

  // Update UI
  title.innerText = `Deep Dive: ${key}`;
  totalEl.innerText = data.total;

  // Clear and rebuild System List
  systemsEl.innerHTML = "";

  // Sort systems by count descending
  const sortedSystems = Object.entries(data.systems).sort(
    (a, b) => b[1] - a[1]
  );

  sortedSystems.forEach(([sys, count], i) => {
    // Calculate percentage for progress bar
    const pct = (count / data.total) * 100;

    const row = document.createElement("div");
    row.className = "flex items-center justify-between mb-2 last:mb-0";
    row.innerHTML = `
            <div class="flex items-center gap-3 w-1/2">
                <span class="text-slate-500 font-mono text-xs w-4">0${
                  i + 1
                }</span>
                <span class="text-sm text-slate-300 truncate" title="${sys}">${sys}</span>
            </div>
            <div class="flex items-center gap-3 w-1/2">
                <div class="h-1.5 rounded-full bg-slate-700/50 flex-grow overflow-hidden">
                    <div class="h-full rounded-full bg-blue-500 transition-all duration-500" style="width: ${pct}%"></div>
                </div>
                <span class="text-xs text-blue-400 font-bold w-6 text-right">${count}</span>
            </div>
        `;
    systemsEl.appendChild(row);
  });

  // Show and scroll to container
  container.classList.remove("hidden");
  
  // Mobile-friendly scroll behavior
  const scrollOptions = {
    behavior: "smooth",
    block: window.innerWidth < 768 ? "start" : "center"
  };
  
  // Small delay to allow class removal to paint before scrolling
  setTimeout(() => {
    container.scrollIntoView(scrollOptions);
  }, 50);
}

function closeDrilldown() {
  document.getElementById("drilldown-container").classList.add("hidden");
}

function initializeCharts() {
  const colors = getThemeColors();
  
  // 1. Focus (Donut Chart)
  const ctxFocus = document.getElementById("focusChart");
  if (ctxFocus) {
    new Chart(ctxFocus.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: WORK_TYPE_LABELS,
        datasets: [
          {
            data: WORK_TYPE_VALUES,
            backgroundColor: [
              "#3b82f6", // Blue
              "#10b981", // Emerald
              "#64748b", // Slate
              "#f59e0b", // Amber
              "#8b5cf6", // Violet
              "#f97316", // Orange
              "#ef4444", // Red
            ],
            borderWidth: 0,
            hoverOffset: window.innerWidth < 768 ? 5 : 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: window.innerWidth < 768 ? "65%" : "70%",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: colors.tooltip.bg,
            borderColor: colors.tooltip.border,
            borderWidth: 1,
            padding: window.innerWidth < 768 ? 8 : 10,
            bodyFont: { 
              family: "'Inter', sans-serif",
              size: window.innerWidth < 768 ? 11 : 12
            },
            titleFont: {
              size: window.innerWidth < 768 ? 12 : 14
            },
            position: 'nearest',
          },
        },
        onClick: handleChartClick,
        interaction: {
          mode: 'nearest',
          intersect: true
        },
      },
    });
    
    hideLoadingSkeleton('focusChart');
  }

  // 2. Domain (Bar Chart)
  const ctxDomain = document.getElementById("domainBarChart");
  if (ctxDomain) {
    new Chart(ctxDomain.getContext("2d"), {
      type: "bar",
      data: {
        labels: DOMAIN_LABELS,
        datasets: [
          {
            label: "Contributions",
            data: DOMAIN_VALUES,
            backgroundColor: [
              "#3b82f6",
              "#10b981",
              "#f59e0b",
              "#ef4444",
              "#8b5cf6",
              "#f97316",
              "#ef4444",
              "#64748b",
            ],
            borderRadius: 4,
            barThickness: window.innerWidth < 768 ? 16 : 20,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: colors.tooltip.bg,
            borderColor: colors.tooltip.border,
            borderWidth: 1,
            padding: window.innerWidth < 768 ? 8 : 10,
            bodyFont: { 
              family: "'Inter', sans-serif",
              size: window.innerWidth < 768 ? 11 : 12
            },
            titleFont: {
              size: window.innerWidth < 768 ? 12 : 14
            },
            position: 'nearest',
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { display: false },
          },
          y: {
            grid: { display: false },
            ticks: {
              color: colors.text,
              font: { 
                size: window.innerWidth < 768 ? 10 : 11,
                weight: 500, 
                family: "'Inter', sans-serif" 
              },
            },
          },
        },
        onClick: handleChartClick,
        interaction: {
          mode: 'nearest',
          intersect: true
        },
      },
    });
    
    hideLoadingSkeleton('domainBarChart');
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  console.log('DOM loaded, initializing theme...');
  // Initialize theme management first
  initTheme();
  
  // Set up intersection observer for chart containers
  const chartContainers = document.querySelectorAll('.chart-container');
  chartContainers.forEach(container => {
    chartObserver.observe(container);
  });
  
  // If charts are already in viewport (e.g., on small screens), load immediately
  const firstChart = document.querySelector('.chart-container');
  if (firstChart) {
    const rect = firstChart.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      chartsLoaded = true;
      loadChartsWhenReady();
    }
  }
});