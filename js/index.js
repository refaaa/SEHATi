// untuk halaman login
document.addEventListener("DOMContentLoaded", () => {
    if (typeof activateNav === "function") {
        activateNav();
    }

    const form = document.getElementById("login-form");
    const errEl = document.getElementById("login-error");

    // Matikan auto-complete browser
    if (form) {
        form.setAttribute("autocomplete", "off");
        form.email.setAttribute("autocomplete", "off");
        form.password.setAttribute("autocomplete", "off");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = form.email.value.trim().toLowerCase();
            const password = form.password.value.trim();

            // validasi input kosong
            if (!email || !password) {
                errEl.textContent = "Email dan password harus diisi.";
                errEl.style.display = "block";
                return;
            }

            // ambil data profiles dari localStorage
            const profiles = getProfiles();

            // kalau email belum ada → buat profil default
            if (!profiles[email]) {
                profiles[email] = {
                    name: email.split("@")[0],
                    email: email,
                    target: 2000,
                };
                saveProfiles(profiles);
            }

            // simpan user yang sedang login di session
            sessionStorage.setItem("sehati_user", email);

            // pindah ke dashboard
            window.location.href = "dashboard.html";
        });
    }
});

//Fungsi proteksi halaman lain
function requireLogin() {
    const user = sessionStorage.getItem("sehati_user");
    if (!user) {
        alert("Silakan login terlebih dahulu!");
        window.location.href = "index.html"; // balik ke login kalo belum login
    }
}

// Helper untuk ambil profiles dari localStorage
function getProfiles() {
    return JSON.parse(localStorage.getItem("profiles") || "{}");
}

// Helper untuk simpan profiles ke localStorage
function saveProfiles(profiles) {
    localStorage.setItem("profiles", JSON.stringify(profiles));
}