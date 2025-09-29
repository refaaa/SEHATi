// =====================
// Tanggal otomatis
// =====================
const today = new Date().toISOString().split("T")[0];
document.getElementById("tanggal").innerText = today;

let totalKalori = 0;

// =====================
// Load data saat halaman dibuka
// =====================
document.addEventListener("DOMContentLoaded", loadMakanan);

function loadMakanan() {
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  const user = (typeof currentUser === "function") ? currentUser() : "guest";

  // 🔥 filter: hanya milik user saat ini + hanya hari ini
  entries = entries.filter(e => e.email === user && e.date === today);

  document.getElementById("daftarMakanan").innerHTML = "";
  totalKalori = 0;

  entries.forEach(e => {
    totalKalori += e.cal;
    const li = document.createElement("li");
    li.innerHTML = `${e.food} - ${e.cal} kkal
      <div>
        <button onclick="editMakanan('${e.id}')">Edit</button>
        <button onclick="hapusMakanan('${e.id}')">Hapus</button>
      </div>`;
    document.getElementById("daftarMakanan").appendChild(li);
  });

  updateTotal();
}

// =====================
// Tambah makanan
// =====================
function tambahMakanan() {
  const makanan = document.getElementById("makanan").value.trim();
  const kalori = parseInt(document.getElementById("kalori").value);

  if (makanan && kalori) {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    const entry = {
      id: Date.now().toString(),
      email: (typeof currentUser === "function") ? currentUser() : "guest",
      food: makanan,
      cal: kalori,
      date: today // 🔥 simpan dengan tanggal hari ini
    };

    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));

    loadMakanan();

    document.getElementById("makanan").value = "";
    document.getElementById("kalori").value = "";
  }
}

// =====================
// Update total + progress bar
// =====================
function updateTotal() {
  const totalEl = document.getElementById("totalKalori");
  const progressEl = document.getElementById("progress");
  const progressText = document.getElementById("progress-text");

  const persen = Math.min((totalKalori / 2000) * 100, 100);
  totalEl.innerText = `Total: ${totalKalori} / 2000 kkal`;

  progressEl.style.width = persen + "%";
  progressText.innerText = Math.round(persen) + "%";

  if (totalKalori > 2000) {
    progressEl.style.background = "red";
  } else if (totalKalori >= 1500) {
    progressEl.style.background = "gold";
  } else {
    progressEl.style.background = "#1b8f5a";
  }
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

  if (newNama && newKalori) {
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
// Resep Rendah Kalori
// =====================
const resepList = [
  { nama: "Salad Sayur Segar", deskripsi: "Kombinasi sayur segar rendah kalori dengan dressing olive oil.", link: "https://www.google.com/search?q=salad+sayur+rendah+kalori" },
  { nama: "Sup Brokoli", deskripsi: "Sup hangat brokoli rendah kalori, cocok untuk diet.", link: "https://www.google.com/search?q=sup+brokoli+rendah+kalori" },
  { nama: "Oatmeal Buah", deskripsi: "Oatmeal sehat dengan topping buah-buahan segar.", link: "https://www.google.com/search?q=oatmeal+buah+sehat" },
  { nama: "Smoothie Hijau", deskripsi: "Campuran bayam, pisang, dan susu almond yang segar.", link: "https://www.google.com/search?q=smoothie+bayam+pisang" },
  { nama: "Tumis Tahu Sayur", deskripsi: "Tahu ditumis dengan sayuran rendah kalori, kaya protein.", link: "https://www.google.com/search?q=tumis+tahu+sayur+sehat" },
  { nama: "Ikan Panggang Lemon", deskripsi: "Ikan dipanggang dengan perasan lemon, rendah lemak & enak.", link: "https://www.google.com/search?q=ikan+panggang+lemon+diet" }
];

const resepContainer = document.getElementById("resep-container");
if (resepContainer) {
  resepList.forEach(resep => {
    const div = document.createElement("div");
    div.className = "resep-card";
    div.innerHTML = `
      <h3>${resep.nama}</h3>
      <p>${resep.deskripsi}</p>
      <a href="${resep.link}" target="_blank">Lihat Resep</a>
    `;
    resepContainer.appendChild(div);
  });
}
