document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("history-body");
  const filterSelect = document.getElementById("filter-select");
  const filterDate = document.getElementById("filter-date");

  function load() {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    const f = filterSelect.value;

    if (f === "today") {
      const today = new Date().toISOString().split("T")[0];
      entries = entries.filter(e => e.date === today);
    } else if (filterDate.value) {
      entries = entries.filter(e => e.date === filterDate.value);
    }

    render(entries);
  }

  function render(entries) {
    tbody.innerHTML = "";
    if (entries.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="color:gray;text-align:center">Tidak ada data</td></tr>`;
      return;
    }

    // urut terbaru dulu
    entries.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));

    entries.forEach(e => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${e.food}</td>
        <td>${e.cal} kkal</td>
        <td>${e.date}</td>
        <td>
          <button class="edit" data-id="${e.id}">Edit</button>
          <button class="del" data-id="${e.id}">Hapus</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // edit & hapus fungsi sama seperti sebelumnya
  tbody.addEventListener("click", e => {
    if (e.target.classList.contains("edit")) {
      let entries = JSON.parse(localStorage.getItem("entries")) || [];
      const idx = entries.findIndex(x => x.id === e.target.dataset.id);
      if (idx === -1) return;

      const newFood = prompt("Edit nama makanan:", entries[idx].food);
      const newCal = parseInt(prompt("Edit kalori:", entries[idx].cal));
      if (newFood && newCal) {
        entries[idx].food = newFood;
        entries[idx].cal = newCal;
        localStorage.setItem("entries", JSON.stringify(entries));
      }
    }

    if (e.target.classList.contains("del")) {
      if (!confirm("Hapus entri ini?")) return;
      let entries = JSON.parse(localStorage.getItem("entries")) || [];
      entries = entries.filter(x => x.id !== e.target.dataset.id);
      localStorage.setItem("entries", JSON.stringify(entries));
      load();
    }
  });

  // tombol filter
  document.getElementById("btn-filter").addEventListener("click", load);

  // ⚠️ Jangan panggil load() di awal
  // load();  <-- hapus baris ini
});
