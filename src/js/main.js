loadProjects();
initApollo();
initApolloChat();
initMobileNav();
initSectionNavigation();
initReveals();

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("mainNav");

  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  nav.querySelectorAll("a, button").forEach((item) => {
    item.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  window.matchMedia("(max-width: 768px)").addEventListener("change", closeMenu);
}

function initSectionNavigation() {
  let scrollFrame;
  const duration = 900;

  function stopScroll() {
    cancelAnimationFrame(scrollFrame);
  }

  window.addEventListener("wheel", stopScroll, { passive: true });
  window.addEventListener("pointerdown", stopScroll, { passive: true });
  window.addEventListener("keydown", (event) => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Tab"].includes(event.key)) {
      stopScroll();
    }
  });

  document.querySelectorAll('.header a[href^="#"], .hero-actions a[href^="#"], .footer a[href^="#"]')
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
          return;
        }

        const target = document.getElementById(link.hash.slice(1));

        if (!target) {
          return;
        }

        event.preventDefault();
        stopScroll();

        const startY = window.scrollY;
        const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
        const targetY = target.getBoundingClientRect().top + startY - offset;
        const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const endY = Math.max(0, Math.min(targetY, maxY));
        const startTime = performance.now();

        if (location.hash !== link.hash) {
          history.pushState(null, "", link.hash);
        }

        function slide(time) {
          const progress = Math.min(1, Math.max(0, (time - startTime) / duration));
          // Acelera no começo e desacelera ao se aproximar da seção.
          const easedProgress = progress * progress * (3 - 2 * progress);
          window.scrollTo({ top: startY + (endY - startY) * easedProgress, behavior: "instant" });

          if (progress < 1) {
            scrollFrame = requestAnimationFrame(slide);
          } else {
            if (!target.hasAttribute("tabindex")) {
              target.setAttribute("tabindex", "-1");
            }
            target.focus({ preventScroll: true });
          }
        }

        scrollFrame = requestAnimationFrame(slide);
      });
    });
}

function initReveals() {
  if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".section-header, .about-story, .about-side")
    .forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });
}
