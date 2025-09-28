document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("profile-form");
    const logoutBtn = document.getElementById("logout");

    // Ambil data tersimpan (jika ada) dan tampilkan ke form
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile) {
        form.name.value = savedProfile.name || "";
        form.email.value = savedProfile.email || "";
        form.age.value = savedProfile.age || "";
        form.gender.value = savedProfile.gender || "";
        form.target.value = savedProfile.target || "";
    }

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

        localStorage.setItem("profile", JSON.stringify(profileData));

        // Redirect ke dashboard setelah simpan
        alert("Profil berhasil disimpan!");
        window.location.href = "dashboard.html";
    });

    // Logout
    logoutBtn.addEventListener("click", () => {
        if (confirm("Yakin ingin logout?")) {
            localStorage.removeItem("profile");
            window.location.href = "index.html"; // misalnya halaman login/index
        }
    });
});