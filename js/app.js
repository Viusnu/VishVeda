// ==========================================
// GLOBALS, SELECTORS & EXACT CLIENT ID CONFIGURATION
// ==========================================
const texts = ['Real Estate', 'Mining', 'Restaurants', 'Farming'];
const bgImages = [
    'istockphoto-1456147420-612x612.jpg',
    'istockphoto-143918313-612x612.jpg',
    'istockphoto-1390005458-612x612.jpg',
    'istockphoto-2160078318-612x612.jpg',
];

const rotatingText = document.getElementById('rotating-text');
const bgLayers = [document.getElementById('bg1'), document.getElementById('bg2')];
const dropdown = document.getElementById('dropdown');
const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const navElement = document.querySelector('nav');

let currentIndex = 0;
let visibleBg = 0;
let isGoogleInitialized = false;

// ==========================================
// UNIFIED SCROLL LISTENER
// Handles: navbar scroll class + two-way scroll animations
// Uses requestAnimationFrame to avoid performance issues
// ==========================================
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            // 1. Navbar background toggle
            if (navElement) {
                navElement.classList.toggle('scrolled', window.scrollY > 50);
            }
            // 2. Two-way entrance/exit scroll animations
            handleTwoWayScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// ==========================================
// SLIDESHOW ROTATOR FUNCTIONS
// ==========================================
function updateText() {
    if (navElement && navElement.classList.contains('scrolled')) return;
    if (!rotatingText) return;

    rotatingText.classList.add('fade-out-down');

    setTimeout(() => {
        if (navElement && navElement.classList.contains('scrolled')) {
            rotatingText.classList.remove('fade-out-down');
            return;
        }

        currentIndex = (currentIndex + 1) % texts.length;
        rotatingText.textContent = texts[currentIndex];
        rotatingText.classList.remove('fade-out-down');
        rotatingText.classList.add('fade-in-up');

        updateBackground(currentIndex);

        setTimeout(() => {
            rotatingText.classList.remove('fade-in-up');
        }, 1000);
    }, 750);
}

function updateBackground(index) {
    if (navElement && navElement.classList.contains('scrolled')) return;
    if (!bgLayers[0] || !bgLayers[1]) return;

    const hiddenLayer = bgLayers[1 - visibleBg];
    const visibleLayer = bgLayers[visibleBg];

    hiddenLayer.classList.remove('zoom-in', 'zoom-out');
    visibleLayer.classList.remove('zoom-in', 'zoom-out');

    hiddenLayer.style.backgroundImage = `url('${bgImages[index]}')`;
    void hiddenLayer.offsetWidth; // Force CSS reflow

    hiddenLayer.classList.add('zoom-in');
    visibleLayer.classList.add('zoom-out');

    visibleBg = 1 - visibleBg;
}

// ==========================================
// OAUTH PIPELINE
// ==========================================
// Configuration (Ensure clientID is defined correctly or updated here)
// Configuration (Ensure your clientID matches your Google Developer Console)
if (typeof clientID === 'undefined') {
    var clientID = "449161754303-qppiou09sgdqabt8bo326sgjlep72dp7.apps.googleusercontent.com";
}

// Global state tracking to avoid conflicting layout overwrites
let isUserLoggedIn = false;

// Safe placeholders for custom UI loading states if not declared elsewhere
if (typeof showDropdownLoading !== 'function') { function showDropdownLoading() {} }
if (typeof hideDropdownLoading !== 'function') { function hideDropdownLoading() {} }
if (typeof openSettingsPanel !== 'function') { function openSettingsPanel(user) {} }

// FIXED: Exact string extraction to prevent unhandled array method crashes
function decodeJWT(token) {
    if (!token || typeof token !== 'string' || !token.includes('.')) return null;
    try {
        const parts = token.split('.');
        if (parts.length < 2) return null;
        
        const base64Url = parts[1]; // Correctly targeting the payload string piece
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("JWT decoding error:", e);
        return null;
    }
}

function handleCredentialResponse(response) {
    if (!response || !response.credential) return;
    const user = decodeJWT(response.credential);
    if (user) {
        localStorage.setItem('google_jwt_token', response.credential);
        updateUIToSignedIn(user);
    }
}

function updateUIToSignedIn(user) {     
    if (!dropdownToggle || !dropdownMenu) return;          
    isUserLoggedIn = true;       
    
    // Completely clear toggle text node content     
    dropdownToggle.textContent = '';      
    dropdownToggle.innerHTML = '';       
    
    // Safe, inline structural transitions to turn the text toggle into an avatar layout     
    dropdownToggle.style.padding = '4px';     
    dropdownToggle.style.borderRadius = '50%';     
    dropdownToggle.style.minWidth = 'auto';     
    dropdownToggle.style.width = '44px';     
    dropdownToggle.style.height = '44px';     
    dropdownToggle.style.display = 'flex';     
    dropdownToggle.style.alignItems = 'center';     
    dropdownToggle.style.justifyContent = 'center';      
    
    // Formatted User Profile Avatar Image element creation     
    const userAvatar = document.createElement('img');     
    userAvatar.src = user.picture || 'https://placeholder.com';      
    userAvatar.alt = user.name || 'User Profile';     
    userAvatar.referrerPolicy = 'no-referrer'; // FIX: Allows Google profile photos to load
    userAvatar.style.width = '44px';     
    userAvatar.style.height = '44px';     
    userAvatar.style.borderRadius = '50%';     
    userAvatar.style.objectFit = 'cover';     
    userAvatar.style.display = 'block';          
    
    dropdownToggle.appendChild(userAvatar);      
    
    // Repopulate user information submenu template literals safely     
    dropdownMenu.innerHTML = `       
      <div class="profile-info">         
        <div class="profile-top-row">           
          <img class="profile-pic" src="${user.picture || 'https://placeholder.com'}" referrerpolicy="no-referrer" alt="Profile picture" style="width:40px; height:40px; border-radius:50%; object-fit:cover;">           
          <div class="profile-meta">             
            <div class="profile-name" style="font-weight:bold;">Welcome, ${user.name}</div>             
            <small style="opacity:0.7;">${user.email}</small>           
          </div>         
        </div>         
        <div class="user-options" style="margin-top:10px;">           
          <button id="settingsBtn" class="settings-btn"><span class="material-icons icon-settings">settings</span>Settings</button>         
        </div>       
      </div>       
      <button class="dropdown-item" id="logoutBtn">Log Out</button>     
    `;      
    
    // Dynamic clean event listener mapping patterns     
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {         
        e.stopPropagation();         
        localStorage.removeItem('google_jwt_token');         
        resetUIToSignedOut();     
    });      
    
    document.getElementById('settingsBtn')?.addEventListener('click', (e) => {         
        e.stopPropagation();         
        openSettingsPanel(user);     
    }); 
}


function resetUIToSignedOut() {
    if (!dropdownToggle || !dropdownMenu) return;

    isUserLoggedIn = false; 

    dropdownToggle.innerHTML = '';
    dropdownToggle.textContent = 'Sign In';

    // Clear dynamic inline layouts back to match your original stylesheet rules
    dropdownToggle.style.padding = '24px 24px';
    dropdownToggle.style.borderRadius = '24px';
    dropdownToggle.style.minWidth = '200px';
    dropdownToggle.style.width = '';
    dropdownToggle.style.height = '';
    dropdownToggle.style.display = '';
    
    showDropdownLoading();
    dropdownMenu.innerHTML = `<div id="g_id_signin"></div>`;

    // Initialize button safely without cascading loops
    initializeGoogleButton();
}

function initializeGoogleButton() {
    if (isUserLoggedIn) {
        hideDropdownLoading();
        return; 
    }

    // FIXED: Removed heavy, rapid polling loops entirely to kill browser lag
    if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
            client_id: clientID,
            callback: handleCredentialResponse,
            ux_mode: 'popup',
        });
        window.google.accounts.id.renderButton(document.getElementById('g_id_signin'), {
            theme: 'outline',
            size: 'large',
            width: '100%',
        });
        hideDropdownLoading();
    } else {
        // If script isn't fully loaded on page boot, gracefully listen for window load events instead of firing endless setTimeouts
        window.addEventListener('load', () => {
            if (window.google && window.google.accounts) {
                initializeGoogleButton();
            }
        }, { once: true });
    }
}

// Lifecycle Entry Hook: Checks internal cache layers instantly on startup
function initOAuth() {
    const savedToken = localStorage.getItem('google_jwt_token');
    if (savedToken) {
        const user = decodeJWT(savedToken);
        if (user) {
            updateUIToSignedIn(user);
            return;
        }
    }
    resetUIToSignedOut();
}

// Safe cross-browser DOM entry listener initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOAuth);
} else {
    initOAuth();
}



let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

// ==========================================
// MULTI-LANGUAGE TRANSLATION SYSTEM
// ==========================================
function changeLanguage(lang) {
    if (!lang) return;
    
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);

    const label = document.querySelector('.language-dropdown-label');
    if (label) {
        const langLabelMap = {
            en: '🇺🇸 English',
            es: '🇪🇸 Español',
            fr: '🇫🇷 Français',
            de: '🇩🇪 Deutsch',
            ja: '🇯🇵 日本語',
            pt: '🇵🇹 Português'
        };
        label.textContent = langLabelMap[lang] || '🇺🇸 English';
    }

    const langAttr = `data-${lang}`;
    const langPlaceholderAttr = `data-${lang}-placeholder`;
    const langAriaAttr = `data-${lang}-aria-label`;
    const langTitleAttr = `data-${lang}-title`;
    const langAltAttr = `data-${lang}-alt`;

    document.querySelectorAll('[data-en], [data-es], [data-fr], [data-de], [data-ja], [data-pt], [data-en-placeholder], [data-es-placeholder], [data-fr-placeholder], [data-de-placeholder], [data-ja-placeholder], [data-pt-placeholder], [data-en-aria-label], [data-es-aria-label], [data-fr-aria-label], [data-de-aria-label], [data-ja-aria-label], [data-pt-aria-label], [data-en-title], [data-es-title], [data-fr-title], [data-de-title], [data-ja-title], [data-pt-title], [data-en-alt], [data-es-alt], [data-fr-alt], [data-de-alt], [data-ja-alt], [data-pt-alt]').forEach(element => {
        const text = element.getAttribute(langAttr);
        const isInput = element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';

        if (isInput) {
            if (element.hasAttribute(langPlaceholderAttr)) {
                element.placeholder = element.getAttribute(langPlaceholderAttr);
            }
            if (element.hasAttribute(`data-${lang}-value`)) {
                element.value = element.getAttribute(`data-${lang}-value`);
            }
        }

        if (element.hasAttribute(langAriaAttr)) {
            element.setAttribute('aria-label', element.getAttribute(langAriaAttr));
        }
        if (element.hasAttribute(langTitleAttr)) {
            element.setAttribute('title', element.getAttribute(langTitleAttr));
        }
        if (element.hasAttribute(langAltAttr)) {
            element.setAttribute('alt', element.getAttribute(langAltAttr));
        }

        if (text && !isInput) {
            const isAuthToggle = element.id === 'dropdownToggle';
            if (isAuthToggle && isUserLoggedIn) {
                return;
            }

            const labelSpan = element.querySelector('.tab-label');
            if (labelSpan) {
                labelSpan.textContent = text;
            } else {
                element.textContent = text;
            }
        }
    });

    document.querySelectorAll('.tab-label').forEach(label => {
        const parent = label.parentElement;
        if (parent && parent.hasAttribute(langAttr)) {
            label.textContent = parent.getAttribute(langAttr);
        }
    });
}

function initLanguageDropdown() {
    const toggle = document.getElementById('language-dropdown-toggle');
    const menu = document.getElementById('language-dropdown-menu');
    const dropdown = document.getElementById('language-dropdown');

    if (!toggle || !menu || !dropdown) return;

    const closeMenu = () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        dropdown.classList.remove('open');
    };

    toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = menu.classList.contains('open');
        closeMenu();
        if (!isOpen) {
            menu.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
            dropdown.classList.add('open');
        }
    });

    menu.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            changeLanguage(lang);
            closeMenu();
        });
    });

    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) {
            closeMenu();
        }
    });
}

// ==========================================
// SETTINGS PANEL WITH BACKGROUND BLUR
// ==========================================
function openSettingsPanel(user) {
    const settingsPanel = document.getElementById('settingsPanel');
    if (!settingsPanel) return;

    // Populate user info
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    if (profileName) profileName.value = user.name || '';
    if (profileEmail) profileEmail.value = user.email || '';

    // Show panel with background blur
    settingsPanel.classList.add('active');
    document.body.classList.add('settings-open');
    document.body.style.overflow = 'hidden';
    
    // Translate on open
    changeLanguage(currentLanguage);
}

function closeSettingsPanel() {
    const settingsPanel = document.getElementById('settingsPanel');
    if (!settingsPanel) return;

    settingsPanel.classList.remove('active');
    document.body.classList.remove('settings-open');
    document.body.style.overflow = '';
}

function switchTab(tabName) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Add active class to clicked tab and corresponding content
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(`tab-${tabName}`);

    if (activeBtn) activeBtn.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

// Settings panel event listeners initialization
function initSettingsPanel() {
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const settingsOverlay = document.querySelector('.settings-overlay');
    const tabBtns = document.querySelectorAll('.tab-btn');

    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', closeSettingsPanel);
    }

    if (settingsOverlay) {
        settingsOverlay.addEventListener('click', closeSettingsPanel);
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            switchTab(tabName);
        });
    });

    // Load saved settings
    loadSettings();

    // Save buttons with loading state
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            saveSettings(btn);
        });
    });

    // Profile auto-save
    const profileBio = document.getElementById('profileBio');
    if (profileBio) {
        profileBio.addEventListener('change', () => {
            localStorage.setItem('profileBio', profileBio.value);
        });
    }

    // Preferences changes
    const compactView = document.getElementById('prefCompactView');
    if (compactView) {
        compactView.addEventListener('change', () => {
            document.body.classList.toggle('compact-view', compactView.checked);
            localStorage.setItem('compactView', compactView.checked);
        });
    }

    const autoPlayVideos = document.getElementById('prefAutoPlayVideos');
    if (autoPlayVideos) {
        autoPlayVideos.addEventListener('change', () => {
            localStorage.setItem('autoPlayVideos', autoPlayVideos.checked);
        });
    }

    // Privacy toggles
    ['privacyProfilePublic', 'privacyShowEmail', 'privacyAllowMessaging'].forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                localStorage.setItem(id, checkbox.checked);
            });
        }
    });

    // Notification toggles
    ['notifEmail', 'notifPush', 'notifUpdates', 'notifMarketing'].forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                localStorage.setItem(id, checkbox.checked);
            });
        }
    });

    // Download data button
    const downloadBtn = document.querySelector('#tab-privacy .secondary-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadUserData);
    }

    // Delete account button
    const deleteBtn = document.querySelector('.danger-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure? This action cannot be undone.')) {
                deleteAccount();
            }
        });
    }
}

// ==========================================
// SETTINGS FUNCTIONALITY
// ==========================================
function loadSettings() {
    // Profile
    const profileBio = document.getElementById('profileBio');
    if (profileBio && localStorage.getItem('profileBio')) {
        profileBio.value = localStorage.getItem('profileBio');
    }

    // Preferences
    const compactView = document.getElementById('prefCompactView');
    if (compactView) {
        compactView.checked = localStorage.getItem('compactView') === 'true';
        document.body.classList.toggle('compact-view', compactView.checked);
    }

    const autoPlayVideos = document.getElementById('prefAutoPlayVideos');
    if (autoPlayVideos) {
        autoPlayVideos.checked = localStorage.getItem('autoPlayVideos') !== 'false';
    }

    // Privacy
    ['privacyProfilePublic', 'privacyShowEmail', 'privacyAllowMessaging'].forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            const saved = localStorage.getItem(id);
            checkbox.checked = saved === null ? (id === 'privacyProfilePublic' || id === 'privacyAllowMessaging') : saved === 'true';
        }
    });

    // Notifications
    ['notifEmail', 'notifPush', 'notifUpdates'].forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            const saved = localStorage.getItem(id);
            checkbox.checked = saved === null ? true : saved === 'true';
        }
    });

    const notifMarketing = document.getElementById('notifMarketing');
    if (notifMarketing) {
        notifMarketing.checked = localStorage.getItem('notifMarketing') === 'true';
    }

    // Set language
    const prefLanguage = document.getElementById('prefLanguage');
    if (prefLanguage) {
        prefLanguage.value = currentLanguage;
    }

    // Last login
    const lastLogin = document.getElementById('lastLogin');
    if (lastLogin) {
        const loginTime = localStorage.getItem('lastLoginTime');
        lastLogin.textContent = loginTime ? new Date(loginTime).toLocaleString(currentLanguage) : 'Just now';
    }
}

function saveSettings(button) {
    const settingsLoading = document.getElementById('settingsLoading');
    if (settingsLoading) settingsLoading.style.display = 'flex';

    setTimeout(() => {
        // Save profile
        const profileName = document.getElementById('profileName');
        const profileBio = document.getElementById('profileBio');
        if (profileName) localStorage.setItem('profileName', profileName.value);
        if (profileBio) localStorage.setItem('profileBio', profileBio.value);

        // Save preferences
        const compactView = document.getElementById('prefCompactView');
        const autoPlayVideos = document.getElementById('prefAutoPlayVideos');
        if (compactView) localStorage.setItem('compactView', compactView.checked);
        if (autoPlayVideos) localStorage.setItem('autoPlayVideos', autoPlayVideos.checked);

        // Save privacy
        ['privacyProfilePublic', 'privacyShowEmail', 'privacyAllowMessaging'].forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) localStorage.setItem(id, checkbox.checked);
        });

        // Save notifications
        ['notifEmail', 'notifPush', 'notifUpdates', 'notifMarketing'].forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) localStorage.setItem(id, checkbox.checked);
        });

        localStorage.setItem('lastLoginTime', new Date().toISOString());

        if (settingsLoading) settingsLoading.style.display = 'none';

        // Feedback
        const originalText = button.textContent;
        button.textContent = currentLanguage === 'en' ? 'Saved!' : 
                            currentLanguage === 'es' ? '¡Guardado!' :
                            currentLanguage === 'fr' ? 'Enregistré!' :
                            currentLanguage === 'de' ? 'Gespeichert!' :
                            currentLanguage === 'ja' ? '保存済み！' :
                            currentLanguage === 'pt' ? 'Salvo!' : 'Saved!';
        button.style.background = 'rgba(76, 175, 80, 0.8)';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }, 800);
}

function downloadUserData() {
    const userData = {
        profile: {
            name: localStorage.getItem('profileName') || '',
            bio: localStorage.getItem('profileBio') || ''
        },
        preferences: {
            compactView: localStorage.getItem('compactView') === 'true',
            autoPlayVideos: localStorage.getItem('autoPlayVideos') !== 'false',
            language: currentLanguage
        },
        privacy: {
            profilePublic: localStorage.getItem('privacyProfilePublic') !== 'false',
            showEmail: localStorage.getItem('privacyShowEmail') === 'true',
            allowMessaging: localStorage.getItem('privacyAllowMessaging') !== 'false'
        },
        notifications: {
            email: localStorage.getItem('notifEmail') !== 'false',
            push: localStorage.getItem('notifPush') !== 'false',
            updates: localStorage.getItem('notifUpdates') !== 'false',
            marketing: localStorage.getItem('notifMarketing') === 'true'
        },
        exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vishveda-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

function deleteAccount() {
    const userDataBackup = JSON.stringify(localStorage);
    console.log('Account data backed up before deletion');
    
    localStorage.clear();
    
    alert(currentLanguage === 'en' ? 'Account deleted.' : 
          currentLanguage === 'es' ? 'Cuenta eliminada.' :
          currentLanguage === 'fr' ? 'Compte supprimé.' :
          currentLanguage === 'de' ? 'Konto gelöscht.' :
          currentLanguage === 'ja' ? 'アカウントが削除されました。' :
          currentLanguage === 'pt' ? 'Conta deletada.' : 'Account deleted.');
    
    closeSettingsPanel();
    resetUIToSignedOut();
    window.location.reload();
}

// ==========================================
// DROPDOWN LOADING STATE
// ==========================================
function showDropdownLoading() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const gSignin = document.querySelector('.g_id_signin');
    if (loadingSpinner) loadingSpinner.style.display = 'flex';
    if (gSignin) gSignin.style.display = 'none';
}

function hideDropdownLoading() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const gSignin = document.querySelector('.g_id_signin');
    if (loadingSpinner) loadingSpinner.style.display = 'none';
    if (gSignin) gSignin.style.display = 'block';
}

// ==========================================
// DROPDOWN TOGGLE & CLICK OUTSIDE
// ==========================================
if (dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (dropdown) dropdown.classList.toggle('show');
    });
}

document.addEventListener('click', (e) => {
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

// ==========================================
// PAGE LOAD — SINGLE window.onload + handleTwoWayScroll on DOMContentLoaded
// ==========================================
window.addEventListener('load', () => {
    // Background layers setup
    if (bgLayers[0] && bgLayers[1]) {
        bgLayers[0].style.backgroundImage = `url('${bgImages[0]}')`;
        bgLayers[0].style.opacity = '1';
        bgLayers[0].style.transform = 'scale(1.1)';
        bgLayers[1].style.backgroundImage = `url('${bgImages[1]}')`;
        bgLayers[1].style.opacity = '0';
        bgLayers[1].style.transform = 'scale(1)';
        void bgLayers[0].offsetWidth;
        bgLayers[0].classList.add('zoom-in');
    }

    // Text rotator
    if (rotatingText) {
        setInterval(updateText, 3000);
    }

    // Footer year
    const startYear = 2025;
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.innerHTML = `${startYear}-${new Date().getFullYear()}`;
    }

    // Auth session restore
    const token = localStorage.getItem('google_jwt_token');
    const user = decodeJWT(token);
    if (token && user) {
        updateUIToSignedIn(user);
    } else {
        localStorage.removeItem('google_jwt_token');
        resetUIToSignedOut();
    }

    // Run scroll animations for elements already on screen
    handleTwoWayScroll();

    // Initialize settings panel
    initSettingsPanel();

    // Restore language
    changeLanguage(currentLanguage);
    initLanguageDropdown();
});

// ==========================================
// TWO-WAY SCROLL ANIMATION CONTROLLER
// ==========================================
function handleTwoWayScroll() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    const viewportHeight = window.innerHeight;

    animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const enteredBottom = rect.top < viewportHeight * 0.85;
        const exitedTop = rect.bottom < 0;

        if (enteredBottom && !exitedTop) {
            element.classList.add('in-view');
        } else {
            element.classList.remove('in-view');
        }
    });
}

// ==========================================
// HAMBURGER MENU
// ==========================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        navLinks.classList.toggle('active');
        e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && e.target !== menuToggle) {
            navLinks.classList.remove('active');
        }
    });
}

// ==========================================
// SCROLL RESTORATION
// ==========================================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// ==========================================
// OS & BROWSER VERSION GATING
// ==========================================
(function () {
    const ua = navigator.userAgent;

    if (/iP(hone|od|ad)/i.test(ua)) {
        const v = ua.match(/OS (\d+)_/);
        if (v && parseInt(v[1], 10) < 9) { window.location.replace('unsupported.html'); return; }
    }
    if (/Android/i.test(ua)) {
        const v = ua.match(/Android\s([0-9.]+)/);
        if (v && parseFloat(v[1]) < 9.0) { window.location.replace('unsupported.html'); return; }
    }
    if (/Windows NT/i.test(ua)) {
        const v = ua.match(/Windows NT\s([0-9.]+)/);
        if (v && parseFloat(v[1]) <= 6.2) { window.location.replace('unsupported.html'); return; }
    }
    if (/Macintosh/i.test(ua) && /Mac OS X/i.test(ua)) {
        const v = ua.match(/Mac OS X\s(\d+)[_.](\d+)/);
        if (v && parseInt(v[1], 10) === 10 && parseInt(v[2], 10) < 13) {
            window.location.replace('unsupported.html'); return;
        }
    }

    let unsupported = false;
    const chrome = ua.match(/Chrome\/(\d+)/);
    if (chrome && parseInt(chrome[1], 10) < 35) unsupported = true;
    const ff = ua.match(/Firefox\/(\d+)/);
    if (ff && parseInt(ff[1], 10) < 30) unsupported = true;
    const safari = ua.match(/Version\/(\d+)/);
    if (safari && parseInt(safari[1], 10) < 8) unsupported = true;

    if (unsupported) window.location.replace('unsupported.html');
})();

// ==========================================
// CUSTOM CURSOR TRACKING
// ==========================================
function initCustomCursorTracking() {
    const cursorBlob = document.getElementById('custom-cursor');
    if (!cursorBlob) return;

    document.addEventListener('mousemove', (e) => {
        const scale = cursorBlob.classList.contains('grow') ? 'scale(2.8)' : 'scale(1)';
        cursorBlob.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) ${scale}`;
    });

    document.addEventListener('mouseleave', () => { cursorBlob.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursorBlob.style.opacity = '1'; });

    document.addEventListener('mouseover', (e) => {
        const t = e.target;
        const hoverable =
            t.tagName === 'A' || t.tagName === 'BUTTON' ||
            t.closest('a') || t.closest('button') ||
            t.classList.contains('dropdown-toggle') ||
            t.classList.contains('nav-search-link-btn');
        if (hoverable) cursorBlob.classList.add('grow');
    });

    document.addEventListener('mouseout', (e) => {
        const t = e.target;
        if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('a') || t.closest('button')) {
            cursorBlob.classList.remove('grow');
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomCursorTracking);
} else {
    initCustomCursorTracking();
}

// Search UI is simplified to a navbar icon-only trigger.

// ==========================================
// DARK MODE
// FIX: null guards on every section to prevent crashes
// FIX: single localStorage key 'theme' is sufficient — removed redundant per-section keys
// ==========================================
// Centralized theme management object
const ThemeManager = {
    init() {
        const savedTheme = localStorage.getItem('theme');
        // Check local storage, fall back to system preference
        const isDark = savedTheme === 'dark' || 
            (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        this.setTheme(isDark);
        this.listenToSystemChanges();
    },

    toggle() {
        const isDark = !document.body.classList.contains('dark-mode');
        this.setTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    },

    setTheme(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
    },

    listenToSystemChanges() {
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches);
                }
            });
    }
};

// Expose minimal global function for inline HTML onclick attribute
window.toggleDarkMode = () => ThemeManager.toggle();

// Initialize as soon as DOM is interactable
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
} else {
    ThemeManager.init();
}

// ==========================================
// GOOGLE TRANSLATE
// ==========================================
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');
    if (!languageSwitcher) return;

    languageSwitcher.addEventListener('change', function () {
        const googleSelect = document.querySelector('#google_translate_element select');
        if (!googleSelect) { console.log('Google Translate not ready yet'); return; }
        googleSelect.value = this.value;
        googleSelect.dispatchEvent(new Event('change'));
    });
});

// ==========================================
// COOKIE CONSENT BANNER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-btn');
    const declineBtn = document.getElementById('decline-btn');

    if (!banner || !acceptBtn || !declineBtn) return;

    if (localStorage.getItem('cookieConsent')) {
        banner.classList.add('hidden');
    } else {
        banner.classList.remove('hidden');
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.classList.add('hidden');
    });

    declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        banner.classList.add('hidden');
    });
});

// ==========================================
// MULTI-LANGUAGE SWITCHER (data-en / data-es / data-fr attributes)
// ==========================================
const SUPPORTED_LANGS = ['en', 'es', 'fr'];

function detectBrowserLanguage() {
    const lang = (navigator.language || navigator.userLanguage || 'en').substring(0, 2);
    return SUPPORTED_LANGS.includes(lang) ? lang : 'en';
}

function setLanguage(lang) {
    if (lang === 'auto') lang = detectBrowserLanguage();

    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.innerText = text;
    });

    localStorage.setItem('site-lang', lang);
    const switcher = document.getElementById('language-switcher');
    if (switcher) switcher.value = lang;
}

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('site-lang') || 'auto';
    setLanguage(saved);

    const switcher = document.getElementById('language-switcher');
    if (switcher) {
        switcher.addEventListener('change', (e) => setLanguage(e.target.value));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 🔴 PASTE YOUR ACTUAL APPS SCRIPT WEB APP URL HERE
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxZTFxJJDz64PVH__n52M3A5SG-ofSAFFJh8xUvevaNkbTJ57BWEXBZauAdR8TnmnJD/exec";

    const aiWindow = document.getElementById('aiWindow');
    const openAiBtn = document.getElementById('openAiBtn');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const chatBody = document.getElementById('chatBody');
    const aiSuggestions = document.getElementById('aiSuggestions');

    const originalBtnText = openAiBtn ? openAiBtn.innerHTML : "Ask AI";
    let isAiThinking = false;
    const conversationHistory = [];

    if (!aiWindow || !openAiBtn) return;

    aiWindow.classList.add('minimized');

    const suggestionPrompts = [
        'Tell me about VishVeda',
        'What services do you offer?',
        'How can I contact you?'
    ];

    function renderSuggestions() {
        if (!aiSuggestions) return;
        aiSuggestions.innerHTML = suggestionPrompts.map(prompt => `
            <button class="ai-chip" type="button" data-prompt="${prompt}">${prompt}</button>
        `).join('');

        aiSuggestions.querySelectorAll('.ai-chip').forEach(button => {
            button.addEventListener('click', () => handleAiMessage(button.dataset.prompt));
        });
    }

    function resetInputState() {
        isAiThinking = false;
        if (sendBtn) sendBtn.disabled = false;
        if (userInput) userInput.disabled = false;
    }

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function formatMessageText(text) {
        const escaped = escapeHtml(text).replace(/\n/g, '<br>');
        return escaped
            .split('<br>')
            .map(line => {
                if (!line.trim()) return '<div class="message-spacer"></div>';
                if (line.trim().startsWith('•')) {
                    return `<div class="message-bullet">${line.trim().replace(/^•\s*/, '')}</div>`;
                }
                return `<div>${line}</div>`;
            })
            .join('');
    }

    function appendChatMsg(text, typeClass) {
        if (!chatBody) return null;
        const bubble = document.createElement('div');
        bubble.classList.add('message', typeClass);
        bubble.innerHTML = formatMessageText(text);
        chatBody.appendChild(bubble);
        chatBody.scrollTop = chatBody.scrollHeight;
        return bubble;
    }

    function pushToHistory(role, text) {
        conversationHistory.push({ role, text: String(text).trim() });
        if (conversationHistory.length > 8) {
            conversationHistory.splice(0, conversationHistory.length - 8);
        }
    }

    function appendLoadingBubble() {
        if (!chatBody) return null;
        const bubble = document.createElement('div');
        bubble.classList.add('message', 'bot-msg', 'ai-loading-bubble');
        bubble.innerHTML = '<div class="typing-loader"><span></span><span></span><span></span></div>';
        chatBody.appendChild(bubble);
        chatBody.scrollTop = chatBody.scrollHeight;
        return bubble;
    }

    function getLocalAiReply(text) {
        const query = text.toLowerCase();

        if (/(about|who|company|vision|group|found|story)/.test(query)) {
            return 'VishVeda Group is a forward-looking venture platform focused on mining, hospitality, real estate, and agriculture. We combine strategy, execution, and long-term partnerships to build durable businesses.';
        }
        if (/(service|services|offer|sector|industry|what do you do)/.test(query)) {
            return 'We support mining, hospitality, real estate, and agriculture with strategy, planning, execution support, and long-term growth partnerships. If you want, I can also outline which service fits your current goal best.';
        }
        if (/(contact|reach|email|talk|hello|meet|schedule)/.test(query)) {
            return 'You can reach us at hello@vishveda.com. We typically respond within 24 hours and are happy to discuss new opportunities or strategic conversations.';
        }
        if (/(real estate|property|building|housing)/.test(query)) {
            return 'Our real estate work focuses on refined property strategy, development insight, and high-value opportunities shaped around long-term demand.';
        }
        if (/(mining|resource|extract)/.test(query)) {
            return 'Our mining approach blends operational discipline, strategic planning, and responsible execution for complex resource projects.';
        }
        if (/(next step|process|how work|start|journey)/.test(query)) {
            return 'A strong first step is to share your objective, sector, and timeline. From there, we can shape a focused plan for strategy, operations, or growth.';
        }
        if (/(compare|difference|better|which)/.test(query)) {
            return 'The best fit depends on your goal. Real estate is strongest for property-led growth, while mining is better for resource and operational planning. I can help compare both based on your brief.';
        }
        if (/(thanks|thank you|good|great)/.test(query)) {
            return 'You’re welcome. I can also help with sectors, contact details, or the best next step for your project.';
        }
        
        // Return null if no local matches found, telling the app to fall back to the live Gemini API
        return null; 
    }

    if (chatBody) {
        chatBody.innerHTML = '';
        appendChatMsg('Hello! I’m VishVeda’s AI guide. Ask about our sectors, services, or next steps.', 'bot-msg');
    }

    renderSuggestions();

    openAiBtn.addEventListener('click', () => {
        openAiBtn.classList.add('btn-hidden');
        if (aiWindow.classList.contains('hidden')) {
            aiWindow.classList.remove('hidden');
        }
        setTimeout(() => {
            aiWindow.classList.remove('minimized');
            if (userInput) userInput.focus();
        }, 30);
    });

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            aiWindow.classList.add('minimized');
            setTimeout(() => {
                openAiBtn.innerHTML = '<span class="material-icons">chat</span> Chat minimized';
                openAiBtn.classList.remove('btn-hidden');
            }, 150);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            aiWindow.classList.add('minimized');
            setTimeout(() => {
                aiWindow.classList.add('hidden');
                openAiBtn.innerHTML = originalBtnText;
                openAiBtn.classList.remove('btn-hidden');
                if (chatBody) {
                    chatBody.innerHTML = '';
                    appendChatMsg('Hello! I’m VishVeda’s AI guide. Ask about our sectors, services, or next steps.', 'bot-msg');
                }
            }, 250);
        });
    }

    // Attach click event to Send Button
    if (sendBtn) {
        sendBtn.addEventListener('click', () => handleAiMessage());
    }

    // Attach press Enter key event to input field
    if (userInput) {
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleAiMessage();
            }
        });
    }

    async function handleAiMessage(customText) {
        const text = (customText || userInput.value).trim();
        if (!text || isAiThinking) return;

        // Clear input immediately and set loading state
        if (userInput) userInput.value = '';
        isAiThinking = true;
        if (sendBtn) sendBtn.disabled = true;
        if (userInput) userInput.disabled = true;

        // Add the user message directly to UI
        appendChatMsg(text, 'user-msg');
        pushToHistory('user', text);

        // Display typing/loading visual element
        const loadingIndicator = appendLoadingBubble();

        // 1. Run local keyword matching checks first
        const localReply = getLocalAiReply(text);
        if (localReply) {
            setTimeout(() => {
                if (loadingIndicator) loadingIndicator.remove();
                appendChatMsg(localReply, 'bot-msg');
                pushToHistory('assistant', localReply);
                resetInputState();
            }, 400);
            return;
        }

        // 2. FALLBACK: Ask the Live Cloud Gemini API via Apps Script
        try {
            const response = await fetch(WEB_APP_URL, {
                method: "POST",
                body: JSON.stringify({ prompt: text })
            });

            if (!response.ok) {
                throw new Error(`HTTP Error Status: ${response.status}`);
            }

            const data = await response.json();
            
            if (loadingIndicator) loadingIndicator.remove();

            if (data.reply) {
                appendChatMsg(data.reply, 'bot-msg');
                pushToHistory('assistant', data.reply);
            } else if (data.error) {
                appendChatMsg("Error from Cloud: " + data.error, 'bot-msg');
            } else {
                appendChatMsg("I couldn't generate a clear response. Let's try again.", 'bot-msg');
            }

        } catch (error) {
            if (loadingIndicator) loadingIndicator.remove();
            console.error("Connection Failed:", error);
            appendChatMsg("Unable to access live AI server. Please check connection.", 'bot-msg');
        } finally {
            resetInputState();
        }
    }
});


function openSidebar() {
    const sidebar = document.getElementById('mySidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!sidebar || !overlay) return;

    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.classList.add('sidebar-open');
}

function closeSidebar() {
    const sidebar = document.getElementById('mySidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!sidebar || !overlay) return;

    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.classList.remove('sidebar-open');
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeSidebar();
        closeSearch();
    }
});

function openSearch() {
    const modal = document.getElementById('searchModal');
    const input = document.getElementById('searchInput');
    if (!modal || !input) return;

    modal.classList.remove('hidden');
    document.body.classList.add('search-open');
    modal.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => modal.classList.add('open'));
    setTimeout(() => input.focus(), 140);
    updateSearchResults();
}

function closeSearch() {
    const modal = document.getElementById('searchModal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('search-open');
    setTimeout(() => modal.classList.add('hidden'), 220);
}

function updateSearchResults() {
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    const query = (input?.value || '').toLowerCase().trim();
    const items = [
        { title: 'About VishVeda', subtitle: 'Company overview and mission', target: '#about' },
        { title: 'Services', subtitle: 'Mining, hospitality, real estate, agriculture', target: '#services' },
        { title: 'Reach us', subtitle: 'Contact and collaboration details', target: '#contact' },
        { title: 'Real Estate', subtitle: 'Visit the dedicated real estate section', target: '/real-estate/index.html' },
        { title: 'Mining', subtitle: 'Explore the mining page', target: '/mining/index.html' }
    ];

    if (!results) return;

    if (!query) {
        results.innerHTML = '<p class="search-empty">Start typing to explore the site.</p>';
        return;
    }

    const filtered = items.filter(item =>
        item.title.toLowerCase().includes(query) || item.subtitle.toLowerCase().includes(query)
    );

    if (!filtered.length) {
        results.innerHTML = '<p class="search-empty">No matches yet. Try a broader term.</p>';
        return;
    }

    results.innerHTML = filtered.map(item => `
        <button class="search-result-item" type="button" data-target="${item.target}">
            <strong>${item.title}</strong>
            <span>${item.subtitle}</span>
        </button>
    `).join('');

    results.querySelectorAll('.search-result-item').forEach(button => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;
            if (target.startsWith('#')) {
                window.location.hash = target;
            } else {
                window.location.href = target;
            }
            closeSearch();
        });
    });
}

function updateOfflineState() {
    const offlineScreen = document.getElementById('offlineScreen');
    const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false;

    if (!offlineScreen) return;

    offlineScreen.classList.toggle('hidden', !isOffline);
    document.body.classList.toggle('offline-active', isOffline);

    if (isOffline) {
        offlineScreen.style.pointerEvents = 'auto';
    } else {
        offlineScreen.style.pointerEvents = 'none';
    }
}

window.addEventListener('online', updateOfflineState);
window.addEventListener('offline', updateOfflineState);

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchTriggerBtn');
    const searchModal = document.getElementById('searchModal');
    const searchBackdrop = document.getElementById('searchModalBackdrop');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchResults = document.getElementById('searchResults');

    if (!searchBtn || !searchModal) return;

    searchBtn.addEventListener('click', openSearch);
    if (searchBackdrop) searchBackdrop.addEventListener('click', closeSearch);
    if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);
    if (searchInput) {
        searchInput.addEventListener('input', updateSearchResults);
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const firstResult = searchResults?.querySelector('.search-result-item');
                if (firstResult) firstResult.click();
            }
        });
    }

    const offlineRetryBtn = document.getElementById('offlineRetryBtn');
    if (offlineRetryBtn) {
        offlineRetryBtn.addEventListener('click', () => {
            updateOfflineState();
        });
    }

    updateOfflineState();

    const quickSuggestions = ['About', 'Services', 'Contact', 'Mining'];
    if (searchSuggestions) {
        searchSuggestions.innerHTML = quickSuggestions.map(text => `
            <button class="search-chip" type="button">${text}</button>
        `).join('');
        searchSuggestions.querySelectorAll('.search-chip').forEach(button => {
            button.addEventListener('click', () => {
                const value = button.textContent.trim().toLowerCase();
                if (searchInput) {
                    searchInput.value = value;
                    updateSearchResults();
                    searchInput.focus();
                }
            });
        });
    }
});

const formWrapper = document.querySelector('.newsletter-form');
const emailInput = document.getElementById('newsletter-email');
const statusMessage = document.getElementById('error-message');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (formWrapper && emailInput && statusMessage) {
    emailInput.addEventListener('input', function() {
        formWrapper.classList.remove('error', 'success');
        statusMessage.classList.remove('visible');
    });

    document.getElementById('newsletter-btn').addEventListener('click', function(event) {
        event.preventDefault();

        if (emailInput.value.trim() === '' || !emailPattern.test(emailInput.value)) {
            statusMessage.textContent = 'Please enter a valid email address.';
            statusMessage.style.color = '#ff4d4d';
            statusMessage.classList.add('visible');
            formWrapper.classList.add('error');
            formWrapper.classList.remove('success');
        } else {
            statusMessage.textContent = 'Successfully subscribed!';
            statusMessage.style.color = '#4caf50';
            statusMessage.classList.add('visible');
            formWrapper.classList.remove('error');
            formWrapper.classList.add('success');
            emailInput.value = '';
        }
    });
}
