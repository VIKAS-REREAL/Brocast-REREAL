// ============================================================
// BroCast App Logic v2
// "A premium internet joke disguised as a weather application."
// ============================================================

const MAX_RETRIES = 2;
const RECENT_KEY = 'brocast_recents';
const MAX_RECENTS = 5;

let currentSoundMap = 'damage.mp3';

// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Set rotating loading message
    document.getElementById('loading-msg').textContent = WeatherEngine.getLoadingMessage();

    // Check URL params first
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get('city');

    if (cityParam) {
        const city = decodeURIComponent(cityParam);
        document.getElementById('location-name').textContent = city;
        fetchWeather(city);
    } else {
        detectLocation();
    }

    setupLocationSearch();
    setupActionButtons();
    setupMoreDetails();
    setupLogoLightbox();
});

// ============================================================
// GEOLOCATION (with personality)
// ============================================================

function detectLocation() {
    if (!('geolocation' in navigator)) {
        showLocationError("Your browser doesn't support GPS. Estimating suffering via IP.");
        fetchWeather('auto:ip');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(`${latitude},${longitude}`);
        },
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    showLocationError("Location unavailable. Estimating suffering manually.");
                    break;
                case error.TIMEOUT:
                    showLocationError("GPS is overthinking... Using IP instead.");
                    break;
                default:
                    showLocationError("Location unavailable. Estimating suffering manually.");
            }
            fetchWeather('auto:ip');
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
}

function showLocationError(message) {
    const el = document.getElementById('location-name');
    el.textContent = message;
    el.style.fontSize = '0.7rem';
    // Reset after weather loads
    setTimeout(() => { el.style.fontSize = ''; }, 5000);
}

// ============================================================
// LOCATION SEARCH
// ============================================================

let searchOpen = false;
let debounceTimer = null;

// === LOGO LIGHTBOX ===
function setupLogoLightbox() {
    const logo = document.querySelector('.brand-logo');
    if (!logo) return;

    let isLightbox = false;
    let overlay = document.getElementById('logo-overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'logo-overlay';
        logo.parentElement.appendChild(overlay);
        
        overlay.addEventListener('click', closeLightbox);
    }

    function closeLightbox() {
        if (!isLightbox) return;
        isLightbox = false;
        
        logo.classList.remove('lightbox-active');
        logo.style.transform = 'none';
        
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (!isLightbox) overlay.style.display = 'none';
        }, 400); // match transition duration
    }

    logo.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (isLightbox) {
            closeLightbox();
            return;
        }

        isLightbox = true;
        
        // Show overlay
        overlay.style.display = 'block';
        // Force reflow
        overlay.offsetHeight;
        overlay.style.opacity = '1';
        
        // Add class to logo
        logo.classList.add('lightbox-active');
        
        // Calculate transform
        const rect = logo.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const logoCenterX = rect.left + rect.width / 2;
        const logoCenterY = rect.top + rect.height / 2;
        
        const translateX = centerX - logoCenterX;
        const translateY = centerY - logoCenterY;
        
        // Scale to 80% of width or max 400px
        const targetWidth = Math.min(window.innerWidth * 0.8, 400);
        const scale = targetWidth / rect.width;
        
        logo.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}

function setupLocationSearch() {
    const locationBtn = document.getElementById('location-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchClose = document.getElementById('search-close');
    const searchDropdown = document.getElementById('search-dropdown');
    const liveLocationBtn = document.getElementById('live-location-btn');

    // Live location
    if (liveLocationBtn) {
        liveLocationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSearch();
            
            // Show loading
            const overlay = document.getElementById('loading-overlay');
            overlay.style.display = 'flex';
            overlay.style.opacity = '1';
            document.getElementById('loading-msg').textContent = "Calibrating GPS satellites...";
            
            detectLocation();
        });
    }

    // Open search
    locationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openSearch();
    });

    // Close search
    searchClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeSearch();
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (searchOpen && !searchOverlay.contains(e.target) && !locationBtn.contains(e.target)) {
            closeSearch();
        }
    });

    // Escape to close
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearch();
    });

    // Search input handler (debounced)
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        clearTimeout(debounceTimer);

        if (query.length < 2) {
            renderRecentLocations();
            return;
        }

        debounceTimer = setTimeout(() => {
            searchAutocomplete(query);
        }, 300);
    });
}

function openSearch() {
    const locationBtn = document.getElementById('location-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchDropdown = document.getElementById('search-dropdown');

    searchOpen = true;
    locationBtn.style.display = 'none';
    searchOverlay.classList.remove('hidden');
    document.getElementById('search-backdrop').classList.remove('hidden');
    // Force reflow
    document.getElementById('search-backdrop').offsetHeight;
    document.getElementById('search-backdrop').classList.add('active');
    searchInput.value = '';
    searchInput.focus();

    // Show recent locations by default
    renderRecentLocations();
    searchDropdown.classList.remove('hidden');
}

function closeSearch() {
    const locationBtn = document.getElementById('location-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchDropdown = document.getElementById('search-dropdown');

    searchOpen = false;
    locationBtn.style.display = '';
    searchOverlay.classList.add('hidden');
    searchDropdown.classList.add('hidden');
    document.getElementById('search-backdrop').classList.remove('active');
    setTimeout(() => {
        if (!searchOpen) document.getElementById('search-backdrop').classList.add('hidden');
    }, 300);
    clearTimeout(debounceTimer);
}

async function searchAutocomplete(query) {
    const resultsSection = document.getElementById('results-section');

    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`);
        const results = await res.json();

        if (!Array.isArray(results) || !results.length) {
            resultsSection.innerHTML = `<div class="search-item"><span class="item-name" style="color: var(--text-tertiary);">No results found</span></div>`;
            return;
        }

        resultsSection.innerHTML = results.map(r => {
            const mainName = r.name || r.display_name.split(',')[0];
            const parts = r.display_name.split(',').map(s => s.trim());
            parts.shift(); // Remove mainName
            const region = parts.slice(0, 2).join(', '); // Keep up to 2 region elements
            const queryStr = `${r.lat},${r.lon}`; // Pass coordinates

            return `<button class="search-item" data-query="${queryStr}" data-name="${mainName}">
                        <span class="item-icon">📍</span>
                        <span class="item-name">${mainName}</span>
                        <span class="item-region">${region}</span>
                    </button>`;
        }).join('');

        // Attach click handlers
        resultsSection.querySelectorAll('.search-item').forEach(item => {
            item.addEventListener('click', () => {
                const name = item.dataset.name;
                const query = item.dataset.query;
                selectLocation(name, query);
            });
        });

    } catch (e) {
        console.error('Search failed:', e);
        resultsSection.innerHTML = `<div class="search-item"><span class="item-name" style="color: var(--text-tertiary);">Search failed. Try again.</span></div>`;
    }
}

function renderRecentLocations() {
    const recentSection = document.getElementById('recent-section');
    const resultsSection = document.getElementById('results-section');
    const recents = getRecentLocations();

    resultsSection.innerHTML = '';

    if (!recents.length) {
        recentSection.innerHTML = `<div class="search-item" style="pointer-events: none;"><span class="item-name" style="color: var(--text-tertiary);">Type to search cities...</span></div>`;
        return;
    }

    recentSection.innerHTML = `
        <div class="search-section-header">
            <div class="search-section-title">Recent</div>
            <button class="clear-history-btn">Clear All</button>
        </div>
        ${recents.map(r => `
            <div class="search-item-wrapper">
                <button class="search-item recent-search-item" data-query="${r.query}" data-name="${r.name}">
                    <span class="item-icon">🕐</span>
                    <span class="item-name">${r.name}</span>
                </button>
                <button class="delete-recent-btn" data-name="${r.name}" aria-label="Delete recent search">&times;</button>
            </div>
        `).join('')}
        <div class="search-divider"></div>
    `;

    recentSection.querySelectorAll('.recent-search-item').forEach(item => {
        item.addEventListener('click', () => {
            selectLocation(item.dataset.name, item.dataset.query);
        });
    });

    recentSection.querySelectorAll('.delete-recent-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteRecentLocation(btn.dataset.name);
            renderRecentLocations();
        });
    });

    const clearBtn = recentSection.querySelector('.clear-history-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            clearAllRecentLocations();
            renderRecentLocations();
        });
    }
}

function selectLocation(name, query) {
    closeSearch();
    document.getElementById('location-name').textContent = name;
    saveRecentLocation(name, query);

    // Show loading
    const overlay = document.getElementById('loading-overlay');
    overlay.style.display = 'flex';
    overlay.style.opacity = '1';
    document.getElementById('loading-msg').textContent = WeatherEngine.getLoadingMessage();

    fetchWeather(query);
}

// --- Recent Locations (localStorage) ---

function getRecentLocations() {
    try {
        return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    } catch {
        return [];
    }
}

function saveRecentLocation(name, query) {
    let recents = getRecentLocations();
    recents = recents.filter(r => r.name.toLowerCase() !== name.toLowerCase());
    recents.unshift({ name, query });
    recents = recents.slice(0, MAX_RECENTS);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recents));
}

function deleteRecentLocation(name) {
    let recents = getRecentLocations();
    recents = recents.filter(r => r.name !== name);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recents));
}

function clearAllRecentLocations() {
    localStorage.removeItem(RECENT_KEY);
}

// ============================================================
// API CALL (single forecast.json = current + astronomy + alerts)
// ============================================================

async function fetchWeather(query, retryCount = 0) {
    try {
        const url = `https://brocast-api.happysmile123444.workers.dev/?type=forecast&q=${encodeURIComponent(query)}`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`API returned ${res.status}`);
        }

        const json = await res.json();
        const data = json.data || json;

        if (data.error) {
            throw new Error(data.error.message);
        }

        // Update location name
        document.getElementById('location-name').textContent = data.location.name;

        // Save to recents
        saveRecentLocation(data.location.name, data.location.name);

        // Update URL state for sharing
        const shareUrl = `?city=${encodeURIComponent(data.location.name)}`;
        window.history.replaceState(null, '', shareUrl);

        // Extract data
        const current = data.current;
        const forecast = data.forecast?.forecastday?.[0];
        const alerts = data.alerts?.alert || [];

        updateUI(current, forecast, alerts);

    } catch (e) {
        console.error('Weather fetch failed:', e);

        if (retryCount < MAX_RETRIES) {
            const messages = [
                "The weather gods are ignoring us. Retrying...",
                "Your wifi is worse than the weather. Retrying...",
                "Satellites are buffering. Retrying..."
            ];
            document.getElementById('loading-msg').textContent = messages[retryCount] || messages[0];

            setTimeout(() => {
                fetchWeather(query, retryCount + 1);
            }, 3000);
        } else {
            // Final failure
            document.getElementById('loading-msg').textContent = "Completely failed. The sky wins today.";
            document.getElementById('hero-temp').textContent = '--°';
            document.getElementById('main-joke').textContent = "We tried. The internet said no.";

            setTimeout(() => {
                document.getElementById('loading-overlay').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loading-overlay').style.display = 'none';
                }, 600);
            }, 2000);
        }
    }
}

// ============================================================
// UI UPDATE
// ============================================================

function updateUI(current, forecast, alerts) {
    const temp = Math.round(current.temp_c);
    const humidity = current.humidity;
    const wind = Math.round(current.wind_kph);
    const windDir = current.wind_dir || '';
    const rain = current.precip_mm;
    const condition = current.condition.text.toLowerCase();
    const uv = current.uv;
    const aqi = current.air_quality?.['us-epa-index'] || 1;
    const isDay = current.is_day === 1;

    // Custom feels-like calculation (NOAA-based)
    const feelsLike = WeatherEngine.calculateFeelsLike(current.temp_c, humidity, current.wind_kph);

    // Engine calculations
    const difficulty = WeatherEngine.calculateDifficulty(feelsLike, humidity, wind, rain, aqi);
    const difficultyLabel = WeatherEngine.getDifficultyLabel(difficulty);
    const scooterSeat = WeatherEngine.calculateScooterSeat(current.temp_c, uv);
    const joke = WeatherEngine.getCommentary(feelsLike, humidity, wind, rain, condition, aqi);
    const verdict = WeatherEngine.getVerdict(difficulty, aqi);
    const achievement = WeatherEngine.getAchievement(feelsLike, rain, aqi, humidity, wind);
    const config = WeatherEngine.getUIConfig(feelsLike, condition);
    const graphics = WeatherEngine.getGraphics(feelsLike, condition, isDay);

    // --- Apply Theme ---
    document.getElementById('dynamic-graphics-layer').innerHTML = graphics;
    document.documentElement.style.setProperty('--bg-color-1', config.c1);
    document.documentElement.style.setProperty('--bg-color-2', config.c2);
    currentSoundMap = config.sound;

    // Heat distortion
    if (feelsLike >= 40) {
        document.body.classList.add('heatwave-active');
    } else {
        document.body.classList.remove('heatwave-active');
    }

    // --- Hero Section ---
    animateValue('hero-temp', 0, feelsLike, 1000, '°');
    document.getElementById('main-joke').textContent = joke;
    document.getElementById('difficulty-value').textContent = `${difficulty}/100`;
    document.getElementById('difficulty-label').textContent = difficultyLabel;
    document.getElementById('daily-verdict').textContent = verdict;
    document.getElementById('achievement-value').textContent = achievement;

    // --- Daily Record (from forecast) ---
    if (forecast?.day?.maxtemp_c) {
        const record = WeatherEngine.getDailyRecord(forecast.day.maxtemp_c);
        document.getElementById('daily-record').textContent = record || '';
    }

    // --- Primary Stats (4 visible) ---
    document.getElementById('air-temp-val').textContent = `${temp}°C`;
    document.getElementById('humidity-val').textContent = `${humidity}%`;
    document.getElementById('aqi-val').textContent = `${aqi}/6`;

    // Scooter Seat
    if (scooterSeat !== null) {
        document.getElementById('scooter-val').textContent = `${scooterSeat}°C 🔥`;
    } else {
        document.getElementById('scooter-val').textContent = 'Safe ✓';
    }

    // --- More Details Stats ---
    document.getElementById('uv-val').textContent = uv;
    document.getElementById('wind-val').textContent = `${wind} km/h ${windDir}`;

    if (rain > 0) {
        document.getElementById('rain-container').style.display = 'flex';
        document.getElementById('rain-val').textContent = `${rain} mm`;
    } else {
        document.getElementById('rain-container').style.display = 'none';
    }

    // Astronomy (from forecast)
    if (forecast?.astro) {
        document.getElementById('sunrise-val').textContent = forecast.astro.sunrise || '--';
        document.getElementById('sunset-val').textContent = forecast.astro.sunset || '--';
    }

    // --- Weather Alerts ---
    const alertEl = document.getElementById('weather-alert');
    const alertTextEl = document.getElementById('alert-text');

    if (alerts && alerts.length > 0) {
        alertEl.classList.remove('hidden');
        alertTextEl.textContent = alerts[0].headline || alerts[0].event || 'Weather alert active';
    } else {
        alertEl.classList.add('hidden');
    }

    // --- Hide Loading ---
    const overlay = document.getElementById('loading-overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 600);
}

// ============================================================
// ANIMATION
// ============================================================

function animateValue(id, start, end, duration, suffix = '') {
    if (start === end) return;
    const obj = document.getElementById(id);
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        obj.textContent = Math.floor(ease * (end - start) + start) + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.textContent = end + suffix;
        }
    };

    window.requestAnimationFrame(step);
}

// ============================================================
// MORE DETAILS TOGGLE
// ============================================================

function setupMoreDetails() {
    const btn = document.getElementById('more-details-btn');
    const details = document.getElementById('more-details');

    btn.addEventListener('click', () => {
        const isHidden = details.classList.contains('hidden');
        if (isHidden) {
            details.classList.remove('hidden');
            btn.classList.add('expanded');
        } else {
            details.classList.add('hidden');
            btn.classList.remove('expanded');
        }
    });
}

// ============================================================
// ACTION BUTTONS & TOAST
// ============================================================

let toastTimer;
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function setupActionButtons() {
    const shareBtn = document.getElementById('share-btn');

    // Share
    shareBtn.addEventListener('click', async () => {
        const appContainer = document.getElementById('app-container');
        const actionButtons = document.querySelector('.action-buttons');
        const shareTitle = document.getElementById('share-title');
        const shareBranding = document.getElementById('share-branding');
        const shareTitleText = document.getElementById('share-title-text');

        // Prepare for screenshot
        appContainer.classList.add('sharing');
        actionButtons.style.display = 'none';
        shareTitle.style.display = 'block';
        shareBranding.style.display = 'block';

        const titles = ['BroCast Report', 'Human Survival Bulletin', 'Reality Forecast', 'Emotional Damage Report'];
        shareTitleText.textContent = titles[Math.floor(Math.random() * titles.length)];

        try {
            // Using html-to-image natively uses the browser's SVG engine. 
            // It perfectly captures -webkit-background-clip: text and gradients.
            const blob = await htmlToImage.toBlob(appContainer, {
                pixelRatio: 2,
                cacheBust: true,
                filter: (node) => {
                    // Ignore toast notification and action buttons
                    if (node.id === 'toast') return false;
                    return true;
                }
            });

            // Revert UI
            appContainer.classList.remove('sharing');
            actionButtons.style.display = 'flex';
            shareTitle.style.display = 'none';
            shareBranding.style.display = 'none';
            
            // Write to clipboard
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({
                        [blob.type]: blob
                    })
                ]);
                showToast("Copied to clipboard! 📸");
            } catch (err) {
                console.error('Clipboard write failed:', err);
                showToast("Failed to copy image. 😢");
            }
        } catch (e) {
            console.error('Share failed:', e);
            appContainer.classList.remove('sharing');
            actionButtons.style.display = 'flex';
            shareTitle.style.display = 'none';
            shareBranding.style.display = 'none';
            showToast("Failed to generate image.");
        }
    });
}
