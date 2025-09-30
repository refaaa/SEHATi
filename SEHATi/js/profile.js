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
                // localStorage.removeItem("profile"); // kalau mau sekalian hapus profil
                window.location.href = "index.html";
            }
        });
    }
});

// --- Tambahin fungsi requireLogin ---
function requireLogin() {
    const user = sessionStorage.getItem("sehati_user");
    if (!user) {
        alert("Anda harus login terlebih dahulu!");
        window.location.href = "index.html"; // arahkan ke login/index
    }
}

// --- Tambahin fungsi activateNav kalau belum ada ---
function activateNav() {
    // isi sesuai kebutuhan, misal kasih highlight di menu
}