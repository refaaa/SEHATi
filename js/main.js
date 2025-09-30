/* ===== main.js ===== */

/* ===== Login / Proteksi halaman ===== */
function requireLogin() {
    const user = sessionStorage.getItem('sehati_user');
    if (!user) {
        // izinkan akses bebas untuk halaman umum
        const path = location.pathname.split('/').pop();
        if (['index.html', 'about.html', 'contact.html', ''].includes(path)) return;
        window.location.href = 'index.html';
    }
}

/* ===== Profiles ===== */
function getProfiles() {
    return JSON.parse(localStorage.getItem('sehati_profiles') || '{}');
}

function saveProfiles(obj) {
    localStorage.setItem('sehati_profiles', JSON.stringify(obj));
}

/* ===== Entries (riwayat makanan) ===== */
function getEntries() {
    return JSON.parse(localStorage.getItem('sehati_entries') || '[]');
}

function saveEntries(arr) {
    localStorage.setItem('sehati_entries', JSON.stringify(arr));
}

/* ===== Current User ===== */
function currentUser() {
    return sessionStorage.getItem('sehati_user') || null;
}

/* ===== Tanggal Hari Ini ===== */
function todayIso(d = new Date()) {
    const y = d.getFullYear(),
        m = ('0' + (d.getMonth() + 1)).slice(-2),
        day = ('0' + d.getDate()).slice(-2);
    return `${y}-${m}-${day}`;
}

/* ===== Navbar Active Class ===== */
function activateNav() {
    const path = location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === path) a.classList.add('active');
        else a.classList.remove('active');
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Tutup menu ketika link diklik
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}
