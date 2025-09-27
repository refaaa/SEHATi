// dashboard logic
document.addEventListener('DOMContentLoaded', () => {
    requireLogin();
    activateNav();

    const user = currentUser();
    const profiles = getProfiles();
    const profile = profiles[user] || { target: 2000, name: user };

    const dateLabel = document.getElementById('date-label');
    const today = todayIso();
    dateLabel.textContent = today;

    const totalEl = document.getElementById('total-cal');
    const targetEl = document.getElementById('target-cal');
    targetEl.textContent = profile.target;

    const progressBar = document.getElementById('progress-bar');
    const todayList = document.getElementById('today-list');
    const warning = document.getElementById('warning');

    function loadToday() {
        const entries = getEntries().filter(e => e.email === user && e.date === today);
        renderList(entries);

        const total = entries.reduce((s, e) => s + Number(e.cal), 0);
        totalEl.textContent = total;

        const percent = Math.min(100, Math.round((total / profile.target) * 100));
        progressBar.style.width = percent + '%';
        progressBar.textContent = percent + '%';

        // warna + warning
        if (total < profile.target * 0.7) {
            progressBar.style.background = 'green';
            warning.classList.add("hidden");
        } else if (total <= profile.target) {
            progressBar.style.background = 'orange';
            warning.classList.add("hidden");
        } else {
            progressBar.style.background = 'red';
            warning.textContent = "⚠️ Anda sudah melebihi batas kalori harian!";
            warning.classList.remove("hidden");
        }
    }

    function renderList(entries) {
        todayList.innerHTML = '';
        if (entries.length === 0) {
            todayList.innerHTML = '<li class="small" style="color:var(--muted)">Belum ada entri hari ini</li>';
            return;
        }
        entries.forEach(en => {
            const li = document.createElement('li');
            li.innerHTML = `
              <div>
                <strong>${escapeHtml(en.food)}</strong>
                <div class="meta">${en.cal} kkal</div>
              </div>
              <div style="display:flex;gap:6px">
                <button data-id="${en.id}" class="edit">Edit</button>
                <button data-id="${en.id}" class="del">Hapus</button>
              </div>`;
            todayList.appendChild(li);
        });

        // attach actions
        todayList.querySelectorAll('button.edit').forEach(b => {
            b.addEventListener('click', () => editEntry(b.dataset.id));
        });
        todayList.querySelectorAll('button.del').forEach(b => {
            b.addEventListener('click', () => deleteEntry(b.dataset.id));
        });
    }

    function addFood(e) {
        e.preventDefault();
        const nameInput = document.getElementById('food-name');
        const calInput = document.getElementById('food-cal');

        const name = nameInput.value.trim();
        const cal = parseFloat(calInput.value);

        if (!name || isNaN(cal) || cal <= 0) {
            alert('Masukkan nama makanan dan kalori yang benar!');
            return;
        }

        const entries = getEntries();
        const newEntry = {
            id: 'id' + Date.now(),
            email: user,
            date: today,
            food: name,
            cal: cal
        };
        entries.push(newEntry);
        saveEntries(entries);

        nameInput.value = '';
        calInput.value = '';
        nameInput.focus(); // auto-focus

        loadToday();
    }

    function deleteEntry(id) {
        if (!confirm('Hapus entri ini?')) return;
        let entries = getEntries();
        entries = entries.filter(e => e.id !== id);
        saveEntries(entries);
        loadToday();
    }

    function editEntry(id) {
        const entries = getEntries();
        const idx = entries.findIndex(e => e.id === id);
        if (idx === -1) return alert('Entri tidak ditemukan');

        const cur = entries[idx];

        // perbaikan optional chaining
        const foodPrompt = prompt('Ubah nama makanan', cur.food);
        if (foodPrompt === null) return;
        const newFood = foodPrompt.trim();

        const newCalStr = prompt('Ubah kalori (kkal)', cur.cal);
        if (newCalStr === null) return;
        const newCal = parseFloat(newCalStr);

        entries[idx].food = newFood || cur.food;
        entries[idx].cal = !isNaN(newCal) && newCal > 0 ? newCal : cur.cal;

        saveEntries(entries);
        loadToday();
    }

    document.getElementById('food-form').addEventListener('submit', addFood);
    loadToday();
});

/* tiny helpers */
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}