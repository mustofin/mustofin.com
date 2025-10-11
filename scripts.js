// Isi file: scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // Fungsi untuk memuat konten HTML ke dalam elemen
    const loadComponent = (elementId, filePath) => {
        return fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Gagal memuat ${filePath}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = data;
                }
            });
    };

    // Fungsi untuk menandai link navigasi yang aktif
    const setActiveNavLink = () => {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPage = window.location.pathname.split('/').pop(); // Mendapatkan nama file, cth: "about.html"

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            
            // Memberi style pada link yang sesuai dengan halaman saat ini
            if (linkPage === currentPage) {
                link.classList.remove('text-gray-700');
                link.classList.add('text-blue-700', 'font-semibold');
            }
        });
    };

    // Memuat Navbar dan Footer, lalu menjalankan fungsi lainnya
    Promise.all([
        loadComponent('navbar-placeholder', 'navbar.html'),
        loadComponent('footer-placeholder', 'footer.html')
    ]).then(() => {
        // Setelah komponen dimuat:
        // 1. Tandai link navigasi yang aktif
        setActiveNavLink();
        // 2. Render ikon Feather (penting karena ikon dimuat secara dinamis)
        feather.replace();
    }).catch(error => {
        console.error("Gagal memuat komponen:", error);
    });
});