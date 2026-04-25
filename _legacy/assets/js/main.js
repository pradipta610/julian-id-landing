/* =====================================================
   Julian Photography — Shared JS
   Defensive: works on any page (homepage or sub-page)
   Requires: GSAP + ScrollTrigger loaded before this file
   ===================================================== */
(function(){
  // ===== IMAGE FALLBACK (Unsplash 404 -> Picsum) =====
  document.querySelectorAll('img').forEach((img, i) => {
    img.addEventListener('error', function handler(){
      img.removeEventListener('error', handler);
      const w = img.naturalWidth || 1200;
      const h = img.naturalHeight || 1500;
      img.src = `https://picsum.photos/seed/julian-${i}-${Date.now()}/${w || 1200}/${h || 1500}`;
    }, { once: true });
  });

  // ===== LOADER =====
  const loader = document.getElementById('loader');
  const loaderPct = document.getElementById('loaderPct');

  function startLoader(){
    if(!loader || !loaderPct){ runIntro(); return; }
    let progress = 0;
    const tick = () => {
      progress += Math.random() * 8 + 2;
      if(progress >= 100){
        progress = 100;
        loaderPct.textContent = '100';
        gsap.to(loader, {y:'-100%', duration:1.2, ease:'power3.inOut', delay:.4, onComplete:()=>{
          loader.style.display='none';
          runIntro();
        }});
      } else {
        loaderPct.textContent = String(Math.floor(progress)).padStart(3,'0');
        requestAnimationFrame(tick);
      }
    };
    tick();
  }

  // ===== INTRO + SCROLL ANIMATIONS =====
  function runIntro(){
    if(typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // ===== HOMEPAGE HERO =====
    if(document.querySelector('.hero h1 .line span')){
      const heroTl = gsap.timeline({defaults:{ease:'power3.out'}});
      heroTl.fromTo('#heroImg', {scale:1.3, opacity:0}, {scale:1.1, opacity:1, duration:1.8})
            .to('.hero h1 .line span', {y:0, duration:1.2, stagger:.1, ease:'power4.out'}, '-=1.4')
            .to('#heroTag', {opacity:1, y:0, duration:.8}, '-=.8')
            .to('#heroMeta', {opacity:1, y:0, duration:.8}, '-=.6')
            .to('#heroScroll', {opacity:1, duration:.6}, '-=.4');

      gsap.to('#heroImg', {
        yPercent:25, ease:'none',
        scrollTrigger:{trigger:'.hero', start:'top top', end:'bottom top', scrub:true}
      });
    }

    // ===== SUB-PAGE HERO (parallax bg) =====
    const subBg = document.querySelector('.subhero-img');
    if(subBg){
      gsap.fromTo(subBg, {scale:1.2}, {scale:1, duration:2, ease:'power3.out'});
      gsap.to(subBg, {
        yPercent:20, ease:'none',
        scrollTrigger:{trigger:'.subhero', start:'top top', end:'bottom top', scrub:true}
      });
      gsap.fromTo('.subhero h1', {y:80, opacity:0}, {y:0, opacity:1, duration:1.4, ease:'power4.out', delay:.3});
      gsap.fromTo('.breadcrumb', {y:30, opacity:0}, {y:0, opacity:1, duration:.8, ease:'power3.out', delay:.5});
      gsap.fromTo('.subhero-meta', {y:30, opacity:0}, {y:0, opacity:1, duration:1, ease:'power3.out', delay:.7});
    }

    // ===== SCROLL REVEALS =====
    gsap.utils.toArray('.reveal-up').forEach(el=>{
      gsap.fromTo(el, {y:60, opacity:0}, {
        y:0, opacity:1, duration:1, ease:'power3.out',
        scrollTrigger:{trigger:el, start:'top 88%', toggleActions:'play none none none'}
      });
    });

    gsap.utils.toArray('.reveal-img').forEach(el=>{
      gsap.fromTo(el, {clipPath:'inset(0 0 100% 0)'}, {
        clipPath:'inset(0 0 0% 0)', duration:1.6, ease:'power3.inOut',
        scrollTrigger:{trigger:el, start:'top 85%'}
      });
    });

    // ===== CTA PARALLAX =====
    if(document.querySelector('.cta')){
      gsap.to('#ctaBg', {
        yPercent:15, ease:'none',
        scrollTrigger:{trigger:'.cta', start:'top bottom', end:'bottom top', scrub:true}
      });
    }

    // ===== STATS COUNTER =====
    gsap.utils.toArray('.stat-num').forEach(el=>{
      const target = parseInt(el.dataset.count);
      if(isNaN(target)) return;
      gsap.to(el, {
        innerText:target, duration:2, ease:'power2.out', snap:{innerText:1},
        scrollTrigger:{trigger:el, start:'top 85%'}
      });
    });

    // ===== PORTFOLIO horizontal pinned scroll (homepage only) =====
    const pfSection = document.querySelector('.portfolio');
    const pfTrack = document.getElementById('pfTrack');
    if(pfSection && pfTrack){
      const pfSticky = document.querySelector('.pf-sticky');
      const pfProgress = document.getElementById('pfProgress');
      const pfCurrent = document.getElementById('pfCurrent');
      const pfSlides = gsap.utils.toArray('.pf-slide');

      if(window.innerWidth > 900){
        const getDistance = () => pfTrack.scrollWidth - window.innerWidth;
        gsap.to(pfTrack, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pfSection, pin: pfSticky, start: 'top top',
            end: () => '+=' + getDistance(),
            scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
            onUpdate: self => {
              if(pfProgress) gsap.set(pfProgress, { width: (self.progress * 100) + '%' });
              if(!pfCurrent) return;
              const vpCenter = window.innerWidth / 2;
              let closestIdx = 0, closestDist = Infinity;
              pfSlides.forEach((s, i) => {
                const r = s.getBoundingClientRect();
                const c = r.left + r.width / 2;
                const d = Math.abs(c - vpCenter);
                if(d < closestDist){ closestDist = d; closestIdx = i; }
              });
              pfCurrent.textContent = String(closestIdx + 1).padStart(2, '0');
            }
          }
        });
      } else {
        const rail = document.querySelector('.pf-rail');
        if(rail){
          rail.addEventListener('scroll', () => {
            const max = rail.scrollWidth - rail.clientWidth;
            const p = max > 0 ? rail.scrollLeft / max : 0;
            if(pfProgress) gsap.set(pfProgress, { width: (p * 100) + '%' });
            if(!pfCurrent) return;
            const vpCenter = rail.clientWidth / 2 + rail.scrollLeft;
            let closestIdx = 0, closestDist = Infinity;
            pfSlides.forEach((s, i) => {
              const c = s.offsetLeft + s.offsetWidth / 2;
              const d = Math.abs(c - vpCenter);
              if(d < closestDist){ closestDist = d; closestIdx = i; }
            });
            pfCurrent.textContent = String(closestIdx + 1).padStart(2, '0');
          }, { passive: true });
        }
      }
    }

    // ===== SERVICE CARD IMAGE FOLLOW (homepage) =====
    document.querySelectorAll('.service-card').forEach(card=>{
      const img = card.querySelector('.service-card-image');
      if(!img) return;
      card.addEventListener('mousemove', e=>{
        const rect = card.getBoundingClientRect();
        const y = e.clientY - rect.top;
        gsap.to(img, {y:y - rect.height/2 - 170, duration:.6, ease:'power3.out'});
      });
    });
  }

  // ===== FAQ ACCORDION =====
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click', ()=>{
      const item = q.closest('.faq-item');
      item.classList.toggle('is-open');
    });
  });

  // ===== ACTIVE NAV LINK (highlight current page) =====
  (function highlightNav(){
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav-links a').forEach(a=>{
      const href = a.getAttribute('href');
      if(!href || href === '#') return;
      const cleanHref = href.replace(/\/$/, '').replace(/\.html$/, '');
      const cleanPath = path.replace(/\.html$/, '');
      if(cleanHref === cleanPath || (cleanHref !== '' && cleanPath.startsWith(cleanHref + '/'))){
        a.classList.add('is-active');
      }
    });
  })();

  // ===== CUSTOM CURSOR (desktop only) =====
  if(window.matchMedia('(hover:hover)').matches && window.innerWidth > 1024){
    const cursor = document.getElementById('cursor');
    const follow = document.getElementById('cursorFollow');
    if(cursor && follow){
      let mx=0,my=0,fx=0,fy=0;
      window.addEventListener('mousemove', e=>{
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx+'px'; cursor.style.top = my+'px';
      });
      const tickCursor = ()=>{
        fx += (mx - fx) * .15;
        fy += (my - fy) * .15;
        follow.style.left = fx+'px'; follow.style.top = fy+'px';
        requestAnimationFrame(tickCursor);
      };
      tickCursor();
      document.querySelectorAll('[data-hover], a, button').forEach(el=>{
        el.addEventListener('mouseenter', ()=>document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', ()=>document.body.classList.remove('cursor-hover'));
      });
    }
  }

  // ===== KICK OFF =====
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', startLoader);
  } else {
    startLoader();
  }
})();
