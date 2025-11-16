// Home Animations for Добри практики - Food Safety Consulting

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP animations
    if (typeof gsap !== 'undefined') {
        initializeAnimations();
    }
    
    // Initialize counter animations
    initializeCounters();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize scroll animations
    initializeScrollAnimations();
});

// GSAP Animations
function initializeAnimations() {
    // Hero section animations
    const heroTl = gsap.timeline({ delay: 0.5 });
    
    heroTl
        .from('.hero-badge', {
            y: -30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('.hero-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.hero-buttons', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.trust-indicators .text-center', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1
        }, '-=0.2');
    
    // Services section animations
    gsap.from('.service-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.service-card',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Process section animations
    gsap.from('.process-step', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.process-step',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Industries section animations
    gsap.from('.industry-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.industry-card',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Counter Animations
function initializeCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-counter'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Mobile Menu
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('open');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
}

function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    if (mobileMenu && hamburgerIcon) {
        mobileMenu.classList.add('open');
        hamburgerIcon.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
        
        // Animate hamburger lines
        const lines = document.querySelectorAll('.hamburger-line');
        lines.forEach((line, index) => {
            line.classList.add('open');
        });
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    if (mobileMenu && hamburgerIcon) {
        mobileMenu.classList.remove('open');
        hamburgerIcon.classList.remove('menu-open');
        document.body.style.overflow = '';
        
        // Reset hamburger lines
        const lines = document.querySelectorAll('.hamburger-line');
        lines.forEach((line, index) => {
            line.classList.remove('open');
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in, .slide-up');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation and enhancement
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Add validation feedback
            input.addEventListener('input', function() {
                validateField(this);
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show success message or submit form
                showFormSuccess(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const parent = field.parentElement;
    
    // Remove existing validation classes
    parent.classList.remove('valid', 'invalid');
    
    if (field.hasAttribute('required') && !value) {
        parent.classList.add('invalid');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            parent.classList.add('invalid');
            return false;
        }
    }
    
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        if (!phoneRegex.test(value)) {
            parent.classList.add('invalid');
            return false;
        }
    }
    
    if (value) {
        parent.classList.add('valid');
    }
    
    return true;
}

function validateForm(form) {
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function showFormSuccess(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success bg-food-green-100 text-food-green-800 p-4 rounded-xl mt-4';
    successMessage.innerHTML = `
        <div class="flex items-center gap-2">
            <i class="fas fa-check-circle"></i>
            <span>Съобщението е изпратено успешно! Ще се свържем с вас скоро.</span>
        </div>
    `;
    
    form.appendChild(successMessage);
    
    // Reset form
    form.reset();
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScrolling();
    initializeForms();
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here if needed
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);
