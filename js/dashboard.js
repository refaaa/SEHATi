// =====================
// Proteksi halaman
// =====================
requireLogin();
activateNav();

// =====================
// Tanggal otomatis
// =====================
const today = new Date().toISOString().split("T")[0];
document.addEventListener("DOMContentLoaded", () => {
  const tanggalEl = document.getElementById("tanggal");
  if (tanggalEl) tanggalEl.innerText = today;
  loadMakanan();
});

let totalKalori = 0;
const targetKalori = 2000;

// =====================
// Load data saat halaman dibuka
// =====================
function loadMakanan() {
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  const user = currentUser();

  // Filter: hanya milik user saat ini & hanya hari ini
  entries = entries.filter(e => e.email === user && e.date === today);

  const daftar = document.getElementById("daftarMakanan");
  if (!daftar) return;

  daftar.innerHTML = "";
  totalKalori = 0;

  entries.forEach(e => {
    totalKalori += e.cal;

    const li = document.createElement("li");
    li.innerHTML = `
      <span class="food-info"><strong>${e.food}</strong> - ${e.cal} kkal</span>
      <div class="btn-group">
        <button class="edit" onclick="editMakanan('${e.id}')">Edit</button>
        <button class="del" onclick="hapusMakanan('${e.id}')">Hapus</button>
      </div>
    `;
    daftar.appendChild(li);
  });

  updateTotal();
}

// =====================
// Tambah makanan
// =====================
function tambahMakanan() {
  const makanan = document.getElementById("makanan").value.trim();
  const kalori = parseInt(document.getElementById("kalori").value);

  if (!makanan || isNaN(kalori) || kalori <= 0) {
    alert("Isi nama makanan dan kalori dengan benar!");
    return;
  }

  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  const entry = {
    id: Date.now().toString(),
    email: currentUser(),
    food: makanan,
    cal: kalori,
    date: today
  };

  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));

  totalKalori += kalori;

  if (totalKalori > targetKalori) {
    alert("⚠️ Total kalori hari ini sudah melebihi target!");
  }

  document.getElementById("makanan").value = "";
  document.getElementById("kalori").value = "";

  loadMakanan();
}

// =====================
// Edit makanan
// =====================
function editMakanan(id) {
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  const idx = entries.findIndex(e => e.id === id);
  if (idx === -1) return;

  const newNama = prompt("Edit nama makanan:", entries[idx].food);
  const newKalori = parseInt(prompt("Edit kalori:", entries[idx].cal));

  if (newNama && !isNaN(newKalori) && newKalori > 0) {
    entries[idx].food = newNama;
    entries[idx].cal = newKalori;
    localStorage.setItem("entries", JSON.stringify(entries));
    loadMakanan();
  }
}

// =====================
// Hapus makanan
// =====================
function hapusMakanan(id) {
  if (!confirm("Hapus entri ini?")) return;

  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries = entries.filter(e => e.id !== id);
  localStorage.setItem("entries", JSON.stringify(entries));

  loadMakanan();
}

// =====================
// Update total + progress bar
// =====================
function updateTotal() {
  const totalEl = document.getElementById("totalKalori");
  const progressEl = document.getElementById("progress");
  const progressText = document.getElementById("progress-text");

  if (!totalEl || !progressEl || !progressText) return;

  totalEl.innerText = `Total: ${totalKalori} / ${targetKalori} kkal`;

  const persen = Math.min((totalKalori / targetKalori) * 100, 100);
  progressEl.style.width = persen + "%";
  progressText.innerText = Math.round(persen) + "%";

  if (totalKalori > targetKalori) {
    progressEl.style.background = "red";
  } else if (totalKalori >= targetKalori * 0.75) {
    progressEl.style.background = "gold";
  } else {
    progressEl.style.background = "#1b8f5a";
  }
}
