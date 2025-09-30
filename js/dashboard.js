// Set tanggal otomatis
document.getElementById('tanggal').textContent = new Date().toLocaleDateString('id-ID', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

// Daftar makanan dan kalori
let daftarMakanan = [];
let totalKalori = 0;
const batasKalori = 2000;

function tambahMakanan() {
  const nama = document.getElementById('makanan').value.trim();
  const kalori = parseInt(document.getElementById('kalori').value);

  if(nama === '' || isNaN(kalori) || kalori <= 0) return alert('Isi nama makanan dan kalori dengan benar!');

  daftarMakanan.push({ nama, kalori });
  totalKalori += kalori;

  updateUI();
  document.getElementById('makanan').value = '';
  document.getElementById('kalori').value = '';
}

function hapusMakanan(index) {
  totalKalori -= daftarMakanan[index].kalori;
  daftarMakanan.splice(index, 1);
  updateUI();
}

function updateUI() {
  // Update daftar makanan
  const list = document.getElementById('daftarMakanan');
  list.innerHTML = '';
  daftarMakanan.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.nama} - ${item.kalori} kkal</span>
      <button class="del" onclick="hapusMakanan(${index})">Hapus</button>
    `;
    list.appendChild(li);
  });

  // Update total kalori
  document.getElementById('totalKalori').textContent = `Total: ${totalKalori} / ${batasKalori} kkal`;

  // Update progress bar
  let persen = Math.min((totalKalori / batasKalori) * 100, 100);
  const progress = document.getElementById('progress');
  progress.style.width = persen + '%';
  document.getElementById('progress-text').textContent = Math.round(persen) + '%';
}

// Resep rendah kalori (semua tombol diarahkan ke Google)
const resepContainer = document.getElementById('resep-container');
const resep = [
  { nama: "Salad Sayur Segar", deskripsi: "Kombinasi sayur segar rendah kalori dengan dressing olive oil.", link: "https://www.google.com/search?q=salad+sayur+rendah+kalori" },
  { nama: "Sup Brokoli", deskripsi: "Sup hangat brokoli rendah kalori, cocok untuk diet.", link: "https://www.google.com/search?q=sup+brokoli+rendah+kalori" },
  { nama: "Oatmeal Buah", deskripsi: "Oatmeal sehat dengan topping buah-buahan segar.", link: "https://www.google.com/search?q=oatmeal+buah+sehat" },
  { nama: "Smoothie Hijau", deskripsi: "Campuran bayam, pisang, dan susu almond yang segar.", link: "https://www.google.com/search?q=smoothie+bayam+pisang" },
  { nama: "Tumis Tahu Sayur", deskripsi: "Tahu ditumis dengan sayuran rendah kalori, kaya protein.", link: "https://www.google.com/search?q=tumis+tahu+sayur+sehat" },
  { nama: "Ikan Panggang Lemon", deskripsi: "Ikan dipanggang dengan perasan lemon, rendah lemak & enak.", link: "https://www.google.com/search?q=ikan+panggang+lemon+diet" }
];

resep.forEach(item => {
  const card = document.createElement('div');
  card.classList.add('resep-card');
  card.innerHTML = `
    <h3>${item.nama}</h3>
    <p>${item.deskripsi}</p>
    <a href="${item.link}" target="_blank">Lihat Resep</a>
  `;
  resepContainer.appendChild(card);
});

// Hamburger menu (responsive)
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('show'));
