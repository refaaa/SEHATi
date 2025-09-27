document.addEventListener('DOMContentLoaded', () => {
    requireLogin();
    activateNav();
    const user = currentUser();
    const profiles = getProfiles();
    const profile = profiles[user] || { name: user, email: user, target: 2000 };

    const form = document.getElementById('profile-form');
    form.name.value = profile.name || '';
    form.email.value = profile.email || user;
    form.target.value = profile.target || 2000;
    form.age.value = profile.age || '';
    form.gender.value = profile.gender || '';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = form.name.value.trim();
        const newEmail = form.email.value.trim().toLowerCase();
        const newTarget = Number(form.target.value) || 2000;
        const newAge = form.age.value.trim();
        const newGender = form.gender.value.trim();

        if (!newName || !newEmail) {
            alert('Isi nama & email');
            return;
        }

        const profiles = getProfiles();
        const oldEmail = user;

        // if email changed, migrate profile and entries
        if (newEmail !== oldEmail) {
            // move profile
            profiles[newEmail] = {
                name: newName,
                email: newEmail,
                target: newTarget,
                age: newAge,
                gender: newGender
            };
            // remove old profile
            delete profiles[oldEmail];

            // update entries
            const entries = getEntries().map(e => {
                if (e.email === oldEmail) e.email = newEmail;
                return e;
            });
            saveEntries(entries);
            saveProfiles(profiles);
            sessionStorage.setItem('sehati_user', newEmail);
            alert('Email diubah. Kamu akan diarahkan ulang.');
            location.href = 'dashboard.html';
            return;
        }

        // else just save updates
        profiles[oldEmail] = {
            name: newName,
            email: oldEmail,
            target: newTarget,
            age: newAge,
            gender: newGender
        };
        saveProfiles(profiles);
        alert('Profil tersimpan.');
    });

    document.getElementById('logout').addEventListener('click', () => {
        if (confirm('Keluar dari SEHATi?')) {
            sessionStorage.removeItem('sehati_user');
            location.href = 'index.html';
        }
    });
});