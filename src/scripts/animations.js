/* =====================================================
   Julian Photography — Animations & Interactions
   Compatible with Astro View Transitions (<ClientRouter />)

   Lifecycle:
   - 'astro:page-load' fires on every navigation (including initial)
   - We re-init scroll-triggered animations on each page
   - Loader runs only on the first visit per session (sessionStorage flag)
   - Cursor + global delegated listeners attach once
   ===================================================== */

const FIRST_LOAD_KEY = 'julian_loaded_v1';
let cursorInited = false;
let globalListenersInited = false;

function attachImageFallback() {
  document.querySelectorAll('img').forEach((img, i) => {
    if (img.dataset.fallbackBound) return;
    img.dataset.fallbackBound = '1';
    img.addEventListener('error', function handler() {
      img.removeEventListener('error', handler);
      const w = img.naturalWidth || 1200;
      const h = img.naturalHeight || 1500;
      img.src = `https://picsum.photos/seed/julian-${i}-${Date.now()}/${w || 1200}/${h || 1500}`;
    }, { once: true });
  });
}

function killScrollTriggers() {
  if (window.ScrollTrigger && typeof window.ScrollTrigger.getAll === 'function') {
    window.ScrollTrigger.getAll().forEach((t) => t.kill());
  }
}

function runIntro() {
  if (typeof window.gsap === 'undefined') return;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  // ===== HOMEPAGE HERO =====
  if (document.querySelector('.hero h1 .line span')) {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl.fromTo('#heroImg', { scale: 1.3, opacity: 0 }, { scale: 1.1, opacity: 1, duration: 1.8 })
          .to('.hero h1 .line span', { y: 0, duration: 1.2, stagger: .1, ease: 'power4.out' }, '-=1.4')
          .to('#heroTag', { opacity: 1, y: 0, duration: .8 }, '-=.8')
          .to('#heroMeta', { opacity: 1, y: 0, duration: .8 }, '-=.6')
          .to('#heroScroll', { opacity: 1, duration: .6 }, '-=.4');

    if (ScrollTrigger) {
      gsap.to('#heroImg', {
        yPercent: 25, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    }
  }

  // ===== SUB-PAGE HERO =====
  const subBg = document.querySelector('.subhero-img');
  if (subBg) {
    gsap.fromTo(subBg, { scale: 1.2 }, { scale: 1, duration: 2, ease: 'power3.out' });
    if (ScrollTrigger) {
      gsap.to(subBg, {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: '.subhero', start: 'top top', end: 'bottom top', scrub: true },
      });
    }
    gsap.fromTo('.subhero h1', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: .3 });
    gsap.fromTo('.breadcrumb', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', delay: .5 });
    gsap.fromTo('.subhero-meta', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: .7 });
  }

  // ===== SCROLL REVEALS =====
  if (ScrollTrigger) {
    gsap.utils.toArray('.reveal-up').forEach((el) => {
      gsap.fromTo(el, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });

    gsap.utils.toArray('.reveal-img').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, {
        clipPath: 'inset(0 0 0% 0)', duration: 1.6, ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });

    if (document.querySelector('.cta')) {
      gsap.to('#ctaBg', {
        yPercent: 15, ease: 'none',
        scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }

    gsap.utils.toArray('.stat-num').forEach((el) => {
      const target = parseInt(el.dataset.count);
      if (isNaN(target)) return;
      gsap.to(el, {
        innerText: target, duration: 2, ease: 'power2.out', snap: { innerText: 1 },
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });
  }

  // ===== PORTFOLIO horizontal pinned scroll =====
  const pfSection = document.querySelector('.portfolio');
  const pfTrack = document.getElementById('pfTrack');
  if (pfSection && pfTrack && ScrollTrigger) {
    const pfSticky = document.querySelector('.pf-sticky');
    const pfProgress = document.getElementById('pfProgress');
    const pfCurrent = document.getElementById('pfCurrent');
    const pfSlides = gsap.utils.toArray('.pf-slide');

    if (window.innerWidth > 900) {
      const getDistance = () => pfTrack.scrollWidth - window.innerWidth;
      gsap.to(pfTrack, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pfSection, pin: pfSticky, start: 'top top',
          end: () => '+=' + getDistance(),
          scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (self) => {
            if (pfProgress) gsap.set(pfProgress, { width: (self.progress * 100) + '%' });
            if (!pfCurrent) return;
            const vpCenter = window.innerWidth / 2;
            let closestIdx = 0, closestDist = Infinity;
            pfSlides.forEach((s, i) => {
              const r = s.getBoundingClientRect();
              const c = r.left + r.width / 2;
              const d = Math.abs(c - vpCenter);
              if (d < closestDist) { closestDist = d; closestIdx = i; }
            });
            pfCurrent.textContent = String(closestIdx + 1).padStart(2, '0');
          },
        },
      });
    } else {
      const rail = document.querySelector('.pf-rail');
      if (rail) {
        rail.addEventListener('scroll', () => {
          const max = rail.scrollWidth - rail.clientWidth;
          const p = max > 0 ? rail.scrollLeft / max : 0;
          if (pfProgress) gsap.set(pfProgress, { width: (p * 100) + '%' });
          if (!pfCurrent) return;
          const vpCenter = rail.clientWidth / 2 + rail.scrollLeft;
          let closestIdx = 0, closestDist = Infinity;
          pfSlides.forEach((s, i) => {
            const c = s.offsetLeft + s.offsetWidth / 2;
            const d = Math.abs(c - vpCenter);
            if (d < closestDist) { closestDist = d; closestIdx = i; }
          });
          pfCurrent.textContent = String(closestIdx + 1).padStart(2, '0');
        }, { passive: true });
      }
    }
  }

  // ===== SERVICE CARD IMAGE FOLLOW =====
  document.querySelectorAll('.service-card').forEach((card) => {
    const img = card.querySelector('.service-card-image');
    if (!img || card.dataset.followBound) return;
    card.dataset.followBound = '1';
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const y = e.clientY - rect.top;
      gsap.to(img, { y: y - rect.height / 2 - 170, duration: .6, ease: 'power3.out' });
    });
  });
}

function runLoader() {
  const loader = document.getElementById('loader');
  const loaderPct = document.getElementById('loaderPct');
  if (!loader || !loaderPct) {
    runIntro();
    return;
  }
  let progress = 0;
  const tick = () => {
    progress += Math.random() * 8 + 2;
    if (progress >= 100) {
      progress = 100;
      loaderPct.textContent = '100';
      if (window.gsap) {
        window.gsap.to(loader, {
          y: '-100%', duration: 1.2, ease: 'power3.inOut', delay: .4,
          onComplete: () => {
            loader.style.display = 'none';
            try { sessionStorage.setItem(FIRST_LOAD_KEY, '1'); } catch (_) {}
            runIntro();
          },
        });
      } else {
        loader.style.display = 'none';
        try { sessionStorage.setItem(FIRST_LOAD_KEY, '1'); } catch (_) {}
        runIntro();
      }
    } else {
      loaderPct.textContent = String(Math.floor(progress)).padStart(3, '0');
      requestAnimationFrame(tick);
    }
  };
  tick();
}

function highlightNav() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    a.classList.remove('is-active');
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    try {
      const u = new URL(href, window.location.origin);
      const cleanHref = u.pathname.replace(/\/$/, '');
      const cleanPath = path.replace(/\.html$/, '');
      if (cleanHref === cleanPath) a.classList.add('is-active');
    } catch (_) { /* ignore */ }
  });
}

function attachFAQ() {
  document.querySelectorAll('.faq-q').forEach((q) => {
    if (q.dataset.faqBound) return;
    q.dataset.faqBound = '1';
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      if (item) item.classList.toggle('is-open');
    });
  });
}

function initCustomCursor() {
  if (cursorInited) return;
  if (!window.matchMedia('(hover:hover)').matches || window.innerWidth <= 1024) return;
  const cursor = document.getElementById('cursor');
  const follow = document.getElementById('cursorFollow');
  if (!cursor || !follow) return;
  cursorInited = true;

  let mx = 0, my = 0, fx = 0, fy = 0;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  const tickCursor = () => {
    fx += (mx - fx) * .15;
    fy += (my - fy) * .15;
    follow.style.left = fx + 'px'; follow.style.top = fy + 'px';
    requestAnimationFrame(tickCursor);
  };
  tickCursor();

  // Delegated listeners — survive view transitions automatically
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('[data-hover], a, button')) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('[data-hover], a, button')) {
      document.body.classList.remove('cursor-hover');
    }
  });
}

function initOnce() {
  if (globalListenersInited) return;
  globalListenersInited = true;
  initCustomCursor();
}

function setup() {
  // Always: re-attach per-page handlers on every navigation
  attachImageFallback();
  killScrollTriggers();
  attachFAQ();
  highlightNav();

  const isFirstEver = !(() => {
    try { return sessionStorage.getItem(FIRST_LOAD_KEY); } catch (_) { return null; }
  })();

  const loader = document.getElementById('loader');

  if (isFirstEver && loader) {
    // First visit in this tab session — show loader, then animations
    runLoader();
  } else {
    // Subsequent navigation — skip loader entirely
    if (loader) loader.style.display = 'none';
    document.documentElement.classList.add('skip-loader');
    runIntro();
  }
}

// Listen to Astro's page-load event (fires every navigation, including first)
document.addEventListener('astro:page-load', () => {
  initOnce();
  setup();
});

// Fallback for environments without ClientRouter (also handles edge case where
// the script loads after astro:page-load already fired)
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Only run if astro:page-load hasn't already fired
      if (!globalListenersInited) {
        initOnce();
        setup();
      }
    });
  } else if (!globalListenersInited) {
    // DOM already ready; run on next tick so Astro's listener wins if it's also queued
    setTimeout(() => {
      if (!globalListenersInited) {
        initOnce();
        setup();
      }
    }, 0);
  }
}
