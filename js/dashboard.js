//  user login
if (!sessionStorage.getItem("sehati_user")) {
  window.location.href = "index.html";
}

// Navbar aktif
function activateNav() {
  const current = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
}
activateNav();

// Tanggal hari ini 
const todayLabel = new Date().toLocaleDateString("id-ID", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
document.getElementById("tanggal").textContent = todayLabel;

// Data lokal dashboard
let daftarMakanan = JSON.parse(localStorage.getItem("daftarMakanan")) || [];
let totalKalori = daftarMakanan.reduce((sum, item) => sum + item.kalori, 0);
const batasKalori = 2000;
let sudahPeringatan = false;

// Simpan data dashboard
function simpanData() {
  localStorage.setItem("daftarMakanan", JSON.stringify(daftarMakanan));
}

// Tambah makanan
function tambahMakanan() {
  const nama = document.getElementById("makanan").value.trim();
  const kalori = parseInt(document.getElementById("kalori").value);

  if (nama === "" || isNaN(kalori) || kalori <= 0) {
    return alert("Isi nama makanan dan kalori dengan benar!");
  }

  // --- Simpan ke dashboard ---
  daftarMakanan.push({ nama, kalori });
  totalKalori += kalori;
  simpanData();

  // --- Simpan ke history (entries) ---
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD
  entries.push({
    id: Date.now().toString(),
    food: nama,
    cal: kalori,
    date: today,
  });
  localStorage.setItem("entries", JSON.stringify(entries));

  updateUI();

  // Reset input
  document.getElementById("makanan").value = "";
  document.getElementById("kalori").value = "";
}

// Hapus makanan
function hapusMakanan(index) {
  const item = daftarMakanan[index];
  totalKalori -= item.kalori;
  daftarMakanan.splice(index, 1);
  simpanData();

  // Hapus juga dari entries
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries = entries.filter(
    (e) => !(e.food === item.nama && e.cal === item.kalori)
  );
  localStorage.setItem("entries", JSON.stringify(entries));

  updateUI();
}

// tampilan dashboard
function updateUI() {
  const list = document.getElementById("daftarMakanan");
  list.innerHTML = "";
  daftarMakanan.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.nama} - ${item.kalori} kkal</span>
      <button class="del" onclick="hapusMakanan(${index})">Hapus</button>
    `;
    list.appendChild(li);
  });

  document.getElementById(
    "totalKalori"
  ).textContent = `Total: ${totalKalori} / ${batasKalori} kkal`;

  let persen = Math.min((totalKalori / batasKalori) * 100, 100);
  const progress = document.getElementById("progress");
  progress.style.width = persen + "%";
  document.getElementById("progress-text").textContent =
    Math.round(persen) + "%";

  if (persen < 70) {
    progress.style.background = "#4CAF50";
  } else if (persen < 100) {
    progress.style.background = "#ffc107";
  } else {
    progress.style.background = "#dc3545";
  }

  if (totalKalori >= batasKalori && !sudahPeringatan) {
    alert("⚠️ Kalori kamu sudah mencapai atau melebihi target harian!");
    sudahPeringatan = true;
  }
  if (totalKalori < batasKalori) {
    sudahPeringatan = false;
  }
}

updateUI();

// Resep rendah kalori
const resepContainer = document.getElementById("resep-container");
const resep = [
  {
    nama: "Salad Sayur Segar",
    deskripsi: "Kombinasi sayur segar rendah kalori dengan dressing olive oil.",
    link: "https://www.google.com/search?q=salad+sayur+rendah+kalori",
  },
  {
    nama: "Sup Brokoli",
    deskripsi: "Sup hangat brokoli rendah kalori, cocok untuk diet.",
    link: "https://www.google.com/search?q=sup+brokoli+rendah+kalori",
  },
  {
    nama: "Oatmeal Buah",
    deskripsi: "Oatmeal sehat dengan topping buah-buahan segar.",
    link: "https://www.google.com/search?q=oatmeal+buah+sehat",
  },
  {
    nama: "Smoothie Hijau",
    deskripsi: "Campuran bayam, pisang, dan susu almond yang segar.",
    link: "https://www.google.com/search?q=smoothie+bayam+pisang",
  },
  {
    nama: "Tumis Tahu Sayur",
    deskripsi: "Tahu ditumis dengan sayuran rendah kalori, kaya protein.",
    link: "https://www.google.com/search?q=tumis+tahu+sayur+sehat",
  },
  {
    nama: "Ikan Panggang Lemon",
    deskripsi: "Ikan dipanggang dengan perasan lemon, rendah lemak & enak.",
    link: "https://www.google.com/search?q=ikan+panggang+lemon+diet",
  },
];

resep.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add("resep-card");
  card.innerHTML = `
    <h3>${item.nama}</h3>
    <p>${item.deskripsi}</p>
    <a href="${item.link}" target="_blank">Lihat Resep</a>
  `;
  resepContainer.appendChild(card);
});

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () =>
  navLinks.classList.toggle("show")
);
