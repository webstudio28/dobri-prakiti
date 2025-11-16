## Mobile Header Behaviour (Reuse Notes)

- **Structure**
- Header is fixed (`position:fixed`) with `id="header"` and stretches full width. Mobile nav lives in `#mobile-menu`, a full-screen panel offset with `translate-x-full` until toggled.

- **Burger Toggle**
- Button `#mobile-menu-toggle` controls the panel. On click it:
  - Toggles the burger animation by adding/removing the `active` class.
  - Slides the menu in/out by swapping `translate-x-full` with `translate-x-0`.
  - Locks body scroll with `body.style.overflow = 'hidden'` while open.
  - Sets `window.isMobileMenuOpen` so the scroll handler keeps header styling stable while the drawer is open.

- **Header Styling on Scroll**
- `updateHeaderState()` runs on load and scroll, adding a solid background + border after 50px scroll and reverting to transparent near the top. It skips changes while the menu is open so the drawer appearance stays consistent.

- **Accordion Navigation**
- Mobile sections (`#services-list`, `#products-list`) expand/collapse via buttons with class `mobile-accordion-toggle`.
  - JS toggles `maxHeight` between `0` and `scrollHeight` for smooth animation.
  - Icons rotate 180° to mark open state.
  - Opening one accordion closes the others.

- **Drag Scroll Lists**
- Any element with `.drag-scroll` gains drag-to-scroll support (mouse + touch) so horizontal card rows stay usable on mobile.

- **Reusing Tips**
- Copy the full `<header>` + mobile menu markup and paste these JS snippets into your layout. Keep IDs/classes (`header`, `mobile-menu`, `mobile-menu-toggle`, `mobile-accordion-toggle`, `drag-scroll`) intact.
- Ensure the Tailwind utilities referenced (`translate-x-full`, `btn-primary`, etc.) exist in your design system.

### JS Snippet 1 – Include in `<head>` (after loading GSAP/Lottie)
```html
<script>
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    const header = document.getElementById('header');
    window.isMobileMenuOpen = false;

    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', function () {
        this.classList.toggle('active');

        if (mobileMenu.classList.contains('translate-x-full')) {
          mobileMenu.classList.remove('translate-x-full');
          mobileMenu.classList.add('translate-x-0');
          body.style.overflow = 'hidden';
        } else {
          mobileMenu.classList.add('translate-x-full');
          mobileMenu.classList.remove('translate-x-0');
          body.style.overflow = '';
        }

        const isOpen = mobileMenu.classList.contains('translate-x-0');
        window.isMobileMenuOpen = isOpen;

        if (header) {
          if (isOpen) {
            header.classList.add('bg-white', 'border-primary-dune/20');
            header.classList.remove('bg-transparent', 'border-transparent', 'bg-primary-sand/95');
          } else {
            header.classList.remove('bg-white', 'border-primary-dune/20');
            if (window.updateHeaderState) {
              window.updateHeaderState();
            }
          }
        }
      });
    }

    const accordionToggles = document.querySelectorAll('.mobile-accordion-toggle');
    accordionToggles.forEach(toggle => {
      toggle.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        const icon = this.querySelector('svg');

        if (targetElement) {
          const isExpanded = targetElement.style.maxHeight && targetElement.style.maxHeight !== '0px';

          accordionToggles.forEach(otherToggle => {
            if (otherToggle !== toggle) {
              const otherTargetId = otherToggle.getAttribute('data-target');
              const otherTargetElement = document.getElementById(otherTargetId);
              const otherIcon = otherToggle.querySelector('svg');
              if (otherTargetElement) {
                otherTargetElement.style.maxHeight = '0px';
                otherIcon.style.transform = 'rotate(0deg)';
              }
            }
          });

          if (isExpanded) {
            targetElement.style.maxHeight = '0px';
            icon.style.transform = 'rotate(0deg)';
          } else {
            targetElement.style.maxHeight = targetElement.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
          }
        }
      });
    });
  });
</script>
```

### JS Snippet 2 – Include before `</body>`
```html
<script>
  function updateHeaderState() {
    const header = document.getElementById('header');
    if (!header || window.isMobileMenuOpen) {
      return;
    }

    if (window.scrollY > 50) {
      header.classList.add('bg-primary-sand/95', 'border-primary-dune/20');
      header.classList.remove('bg-transparent', 'border-transparent');
    } else {
      header.classList.remove('bg-primary-sand/95', 'border-primary-dune/20');
      header.classList.add('bg-transparent', 'border-transparent');
    }
  }

  window.updateHeaderState = updateHeaderState;
  window.addEventListener('scroll', updateHeaderState);
  updateHeaderState();

  (function () {
    const containers = document.querySelectorAll('.drag-scroll');
    containers.forEach((el) => {
      let isDown = false;
      let startX = 0;
      let scrollLeftStart = 0;

      const onDown = (clientX) => {
        isDown = true;
        startX = clientX;
        scrollLeftStart = el.scrollLeft;
        el.classList.add('dragging');
      };
      const onMove = (clientX) => {
        if (!isDown) return;
        const dx = clientX - startX;
        el.scrollLeft = scrollLeftStart - dx;
      };
      const onUp = () => {
        isDown = false;
        el.classList.remove('dragging');
      };

      el.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        onDown(e.clientX);
        e.preventDefault();
      });
      window.addEventListener('mousemove', (e) => onMove(e.clientX));
      window.addEventListener('mouseup', onUp);

      el.addEventListener('touchstart', (e) => onDown(e.touches[0].clientX), { passive: true });
      window.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
      window.addEventListener('touchend', onUp);
    });
  })();
</script>
```