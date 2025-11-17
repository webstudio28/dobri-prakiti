// Hero section animations on page load
document.addEventListener('DOMContentLoaded', function() {
  // Ensure page starts at top
  window.scrollTo(0, 0);
  
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.warn('GSAP is not loaded');
    return;
  }

  // Check if we're on the homepage
  const heroSection = document.querySelector('.hero-content');
  if (!heroSection) {
    return; // Not on homepage, exit
  }

  // Simple check: if user scrolled, don't reset
  let userScrolled = false;
  window.addEventListener('scroll', () => { userScrolled = true; }, { once: true, passive: true });

  // Create timeline for hero animations
  const heroTimeline = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });

  // Animate hero elements
  const heroTitle = document.querySelector('.hero-title');
  const heroTitleAccent = document.querySelector('.hero-title-accent');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroButtons = document.querySelector('.hero-buttons');
  const heroImage = document.querySelector('.hero-image');

  // Set initial states - text elements slide up, image scales from center
  if (heroTitle) {
    gsap.set(heroTitle, { opacity: 0, y: 40 });
  }
  if (heroTitleAccent) {
    gsap.set(heroTitleAccent, { opacity: 0, y: 30 });
  }
  if (heroSubtitle) {
    gsap.set(heroSubtitle, { opacity: 0, y: 30 });
  }
  if (heroButtons) {
    gsap.set(heroButtons, { opacity: 0, y: 30 });
  }
  if (heroImage) {
    gsap.set(heroImage, { opacity: 0, scale: 0.2, transformOrigin: 'center center' });
  }

  // Animate in sequence - text slides up, image scales from center
  if (heroTitle) {
    heroTimeline.to(heroTitle, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, 0);
  }
  
  if (heroTitleAccent) {
    heroTimeline.to(heroTitleAccent, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.2);
  }

  if (heroSubtitle) {
    heroTimeline.to(heroSubtitle, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.5);
  }

  if (heroButtons) {
    heroTimeline.to(heroButtons, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.7);
  }

  if (heroImage) {
    heroTimeline.to(heroImage, { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.7)' }, 0.3);
  }

  // Only reset scroll if user hasn't scrolled
  heroTimeline.call(function() {
    if (!userScrolled) {
      window.scrollTo(0, 0);
    }
  });
});

