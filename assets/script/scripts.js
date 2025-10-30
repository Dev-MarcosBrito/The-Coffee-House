/**
 * The Coffee House - Main JavaScript
 * Funcionalidades para navegação responsiva, interações do modal, tema e idioma
 */

// DOM Elements
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");
const contactButtons = document.querySelectorAll(".btn-contact");
const closeModalBtn = document.querySelector(".close-modal");
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const langButtons = document.querySelectorAll(".lang-btn");

// Toggle mobile menu
function toggleMobileMenu() {
    menuToggle.classList.toggle("active");
    navList.classList.toggle("active");
    document.body.classList.toggle("menu-open");
}

// Show modal with animation
function showModal() {
    modal.classList.add("active");
    modalOverlay.classList.add("active");
    document.body.classList.add("modal-open");
}

// Hide modal with animation
function hideModal() {
    modal.classList.remove("active");
    modalOverlay.classList.remove("active");
    document.body.classList.remove("modal-open");
}

// Smooth scroll to sections
function scrollToSection(e) {
    if (e.target.hasAttribute("data-scroll")) {
        e.preventDefault();
        const targetId = e.target.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            if (navList.classList.contains("active")) {
                toggleMobileMenu();
            }
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: "smooth"
            });
        }
    }
}

// Toggle theme function
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Change language function
function changeLanguage(lang) {
    // Aqui seria implementada a lógica de tradução
    // Por enquanto, apenas atualizamos a classe ativa
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    localStorage.setItem('language', lang);
    
    // Exemplo de como seria a implementação real:
    // 1. Carregar arquivo de tradução
    // 2. Atualizar todos os textos da página
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    // Aplicar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Aplicar idioma salvo
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMobileMenu);
    }
    
    // Theme toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", toggleTheme);
    }
    
    // Language buttons
    langButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
    
    // Contact buttons
    contactButtons.forEach(button => {
        button.addEventListener("click", showModal);
    });
    
    // Close modal
    if (modalOverlay) {
        modalOverlay.addEventListener("click", hideModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", hideModal);
    }
    
    // Escape key closes modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            hideModal();
        }
    });
    
    // Smooth scroll for navigation links
    document.body.addEventListener("click", scrollToSection);
    
    // Add animation class to elements when they come into view
    const observeElements = document.querySelectorAll(".animate-on-scroll");
    
    if (observeElements.length > 0 && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animated");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observeElements.forEach(element => {
            observer.observe(element);
        });
    }
});

