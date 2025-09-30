document.addEventListener("DOMContentLoaded", () => {
    // Cek login dulu
    requireLogin();
    activateNav();

    const form = document.getElementById("profile-form");
    const logoutBtn = document.getElementById("logout");

    if (form) {
        // Ambil data tersimpan (jika ada) dan tampilkan ke form
        const savedProfile = JSON.parse(localStorage.getItem("profile") || "{}");

        form.name.value = savedProfile.name || "";
        form.email.value = savedProfile.email || "";
        form.age.value = savedProfile.age || "";
        form.gender.value = savedProfile.gender || "";
        form.target.value = savedProfile.target || "";

        // Simpan profil
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const profileData = {
                name: form.name.value.trim(),
                email: form.email.value.trim(),
                age: form.age.value.trim(),
                gender: form.gender.value,
                target: form.target.value.trim(),
            };

            if (!profileData.name || !profileData.email) {
                alert("Nama dan Email wajib diisi!");
                return;
            }

            localStorage.setItem("profile", JSON.stringify(profileData));
            alert("Profil berhasil disimpan!");
            window.location.href = "dashboard.html";
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            if (confirm("Yakin ingin logout?")) {
                sessionStorage.removeItem("sehati_user");
                // localStorage.removeItem("profile"); // aktifkan jika mau hapus profil juga
                window.location.href = "index.html";
            }
        });
    }

    // --- Toggle menu hamburger ---
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });
    }
});

// --- Fungsi cek login ---
function requireLogin() {
    const user = sessionStorage.getItem("sehati_user");
    if (!user) {
        window.location.href = "index.html"; // arahkan ke login/index
    }
}

// --- Fungsi aktifkan nav ---
function activateNav() {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}