document.addEventListener('DOMContentLoaded', () => {
    requireLogin();
    activateNav();
    const user = currentUser();
    const tbody = document.getElementById('history-body');
    const filterSelect = document.getElementById('filter-select');
    const filterDate = document.getElementById('filter-date');

    function load() {
        let entries = getEntries().filter(e => e.email === user);
        const f = filterSelect.value;
        if (f === 'today') {
            entries = entries.filter(e => e.date === todayIso());
        } else if (filterDate.value) {
            entries = entries.filter(e => e.date === filterDate.value);
        }
        render(entries);
    }

    function render(entries) {
        tbody.innerHTML = '';
        if (entries.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="small" style="color:var(--muted)">Tidak ada data</td></tr>';
            return;
        }
        entries.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
        for (const e of entries) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${escapeHtml(e.food)}</td><td>${e.cal} kkal</td><td>${e.date}</td>
                      <td><button data-id="${e.id}" class="edit">Edit</button> <button data-id="${e.id}" class="del">Hapus</button></td>`;
            tbody.appendChild(tr);
        }

        tbody.querySelectorAll('button.edit').forEach(b => {
            b.addEventListener('click', () => {
                const id = b.dataset.id;
                const entries = getEntries();
                const idx = entries.findIndex(x => x.id === id);
                if (idx === -1) return;
                const nFood = prompt('Nama makanan', entries[idx].food);
                if (nFood === null) return;
                const nCal = prompt('Kalori', entries[idx].cal);
                if (nCal === null) return;
                entries[idx].food = nFood.trim() || entries[idx].food;
                entries[idx].cal = Number(nCal) || entries[idx].cal;
                saveEntries(entries);
                load();
            });
        });

        tbody.querySelectorAll('button.del').forEach(b => {
            b.addEventListener('click', () => {
                if (!confirm('Hapus entri?')) return;
                const id = b.dataset.id;
                let entries = getEntries();
                entries = entries.filter(x => x.id !== id);
                saveEntries(entries);
                load();
            });
        });
    }

    document.getElementById('btn-filter').addEventListener('click', load);
    load();
});