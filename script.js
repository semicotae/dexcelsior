// DOM Elements
const header = document.getElementById('main-header');
const clock = document.getElementById('clock'); // Elemen untuk jam real-time
let lastScrollY = window.scrollY;

// Mengelola header: sembunyi saat scroll ke bawah, muncul saat scroll ke atas
window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    header.classList.add('hidden'); // Header menghilang
  } else {
    header.classList.remove('hidden'); // Header muncul
  }
  lastScrollY = window.scrollY;
});

// Smooth scroll untuk navigasi menu
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Real-time clock
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
  const year = now.getFullYear();

  // Format waktu dan tanggal
  clock.innerHTML = `Selamat Datang! ${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
}

// Update clock setiap detik
setInterval(updateClock, 1000);

// Animasi kecil untuk galeri (zoom saat scroll)
const galleryImages = document.querySelectorAll('.gallery img');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('zoom-in');
      } else {
        entry.target.classList.remove('zoom-in');
      }
    });
  },
  { threshold: 0.5 }
);

galleryImages.forEach(img => {
  observer.observe(img);
});

// Alert otomatis (contoh untuk mengingatkan pengguna sesuatu)
function showAlert() {
  const alertBox = document.querySelector('.alert');
  if (alertBox) {
    alertBox.style.opacity = '1';
    alertBox.style.transform = 'translateY(0)';
    setTimeout(() => {
      alertBox.style.opacity = '0';
      alertBox.style.transform = 'translateY(-50px)';
    }, 5000); // Sembunyikan setelah 5 detik
  }
}

// Jalankan alert saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  updateClock(); // Jalankan clock pertama kali
  showAlert(); // Tampilkan alert jika ada
});