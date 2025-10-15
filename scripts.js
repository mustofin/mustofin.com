document.addEventListener("DOMContentLoaded", function() {
    
    // Fungsi untuk memuat komponen (navbar, footer)
    const loadComponent = (elementId, filePath) => {
        return fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Gagal memuat ${filePath}`);
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) element.innerHTML = data;
            });
    };

    // Fungsi untuk menandai link navigasi yang aktif
    const setActiveNavLink = () => {
        const navLinks = document.querySelectorAll('.nav-link');
        let currentPage = window.location.pathname.split('/').pop();
        if (currentPage === '' || currentPage === 'index.html') {
            currentPage = 'index.html';
        }

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('text-blue-600', 'font-semibold');
                link.classList.remove('text-gray-700');
            }
        });
    };

    // --- FUNGSI BARU UNTUK MENU MOBILE ---
    const setupMobileMenu = () => {
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (menuButton && mobileMenu) {
            menuButton.addEventListener('click', () => {
                // Toggle (munculkan/sembunyikan) menu dropdown
                mobileMenu.classList.toggle('hidden');
            });
        }
    };

    // --- ALUR UTAMA ---
    // Muat semua komponen
    Promise.all([
        loadComponent('navbar-placeholder', 'navbar.html'),
        loadComponent('footer-placeholder', 'footer.html')
    ]).then(() => {
        // Setelah semua komponen dimuat, jalankan fungsi-fungsi ini
        setActiveNavLink();
        setupMobileMenu(); // Jalankan fungsi menu mobile
        feather.replace(); // Render semua ikon
    }).catch(error => {
        console.error("Gagal memuat komponen penting:", error);
    });
});