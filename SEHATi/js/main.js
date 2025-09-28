/* main.js - util functions used across pages */
function requireLogin() {
    const user = sessionStorage.getItem('sehati_user');
    if (!user) {
        // allow index/about/contact without login
        const path = location.pathname.split('/').pop();
        if (['index.html', 'about.html', 'contact.html', ''].includes(path)) return;
        location.href = 'index.html';
    }
}

function getProfiles() {
    return JSON.parse(localStorage.getItem('sehati_profiles') || '{}');
}

function saveProfiles(obj) {
    localStorage.setItem('sehati_profiles', JSON.stringify(obj));
}

function getEntries() {
    return JSON.parse(localStorage.getItem('sehati_entries') || '[]');
}

function saveEntries(arr) {
    localStorage.setItem('sehati_entries', JSON.stringify(arr));
}

function currentUser() {
    return sessionStorage.getItem('sehati_user') || null;
}

/* small helper: format date YYYY-MM-DD */
function todayIso(d = new Date()) {
    const y = d.getFullYear(),
        m = ('0' + (d.getMonth() + 1)).slice(-2),
        day = ('0' + d.getDate()).slice(-2);
    return `${y}-${m}-${day}`;
}

/* enable nav active class (call on page load) */
function activateNav() {
    const path = location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === path) a.style.boxShadow = 'inset 0 -3px 0 rgba(255,255,255,0.18)';
    });
}