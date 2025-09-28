// index.js - behavior untuk halaman login
document.addEventListener('DOMContentLoaded', () => {
    activateNav(); // fungsi ini ada di main.js

    const form = document.getElementById('login-form');
    const errEl = document.getElementById('login-error');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = form.email.value.trim().toLowerCase();
        const password = form.password.value.trim();

        // validasi input kosong
        if (!email || !password) {
            errEl.textContent = 'Email dan password harus diisi.';
            errEl.style.display = 'block';
            return;
        }

        // ambil data profiles dari localStorage
        const profiles = getProfiles();

        // kalau email belum ada, buat profil default
        if (!profiles[email]) {
            profiles[email] = {
                name: email.split('@')[0],
                email: email,
                target: 2000
                    // bisa ditambah "password" kalau mau validasi
            };
            saveProfiles(profiles);
        }

        // simpan user yang sedang login di session
        sessionStorage.setItem('sehati_user', email);

        // pindah ke dashboard
        window.location.href = 'dashboard.html';
    });
});