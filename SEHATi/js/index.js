// behavior for login page
document.addEventListener('DOMContentLoaded', () => {
  activateNav();
  const form = document.getElementById('login-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value.trim();
    const errEl = document.getElementById('login-error');
    if(!email || !password){ errEl.textContent='Email dan password harus diisi.'; errEl.style.display='block'; return; }

    // profiles map
    const profiles = getProfiles();
    if(!profiles[email]){
      // create default profile for this email
      profiles[email] = { name: email.split('@')[0], email: email, target: 2000 };
      saveProfiles(profiles);
    }
    sessionStorage.setItem('sehati_user', email);
    // redirect
    window.location.href = 'dashboard.html';
  });
});
