/* ── Particles ─────────────────────────────────────── */
  (function buildParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = 1 + Math.random() * 2.5;
      p.style.cssText = [
        `left:${Math.random() * 100}%`,
        `width:${size}px`,
        `height:${size}px`,
        `background:${Math.random() > .5 ? '#e60026' : '#00b4ff'}`,
        `animation-duration:${6 + Math.random() * 12}s`,
        `animation-delay:${Math.random() * 12}s`,
        `opacity:${.2 + Math.random() * .6}`,
      ].join(';');
      container.appendChild(p);
    }
  })();

  /* ── Loader ────────────────────────────────────────── */
  function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader || loader.style.display === 'none') return;
    
    loader.style.transition = 'opacity 0.5s';
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      initGSAP();
    }, 500);
  }

  // Hide on load, but also set a safety timeout
  window.addEventListener('load', hideLoader);
  setTimeout(hideLoader, 3000); // Force hide after 3s if assets are slow

  /* ── GSAP Animations ───────────────────────────────── */
  function initGSAP() {
    if (typeof gsap === 'undefined') { fallbackReveal(); return; }
    gsap.registerPlugin(ScrollTrigger);

    /* hero entrance */
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    const logoWrap = document.querySelector('#heroLogoWrap');
    const title = document.querySelector('#heroTitle');
    const sub = document.querySelector('#heroSub');
    const cta = document.querySelector('#heroCTA');

    if (logoWrap) tl.to(logoWrap, { opacity: 1, scale: 1, duration: 1, clearProps: 'scale' });
    if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.8 }, logoWrap ? '-=0.5' : '0');
    if (sub) tl.to(sub, { opacity: 1, y: 0, duration: 0.65 }, title ? '-=0.45' : '0');
    if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 0.55 }, sub ? '-=0.35' : '0');

    /* set initial transforms for GSAP */
    if (title) gsap.set(title, { y: 30 });
    if (sub) gsap.set(sub, { y: 20 });
    if (cta) gsap.set(cta, { y: 20 });
    if (logoWrap) gsap.set(logoWrap, { scale: 0.82 });

    /* section headers */
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: .8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' } }
      );
    });

    /* cards — staggered per section */
    ['#games .game-card', '#table-sports .game-card'].forEach(function (sel) {
      var cards = gsap.utils.toArray(sel);
      cards.forEach(function (card, i) {
        gsap.fromTo(card,
          { opacity: 0, y: 55, rotateX: 4 },
          { opacity: 1, y: 0, rotateX: 0, duration: .7, delay: i * .12, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' } }
        );
      });
    });

    /* contact */
    gsap.fromTo('#contact .reveal',
      { opacity: 0, scale: .95 },
      { opacity: 1, scale: 1, duration: .8, ease: 'power2.out',
        scrollTrigger: { trigger: '#contact', start: 'top 78%', toggleActions: 'play none none none' } }
    );
  }

  /* fallback if GSAP CDN fails */
  function fallbackReveal() {
    document.querySelectorAll('.reveal, .game-card, .hero-title, .hero-sub, .btn-cta, .hero-logo-wrap').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  /* ── Navbar scroll class ───────────────────────────── */
  window.addEventListener('scroll', function () {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── Mobile menu ───────────────────────────────────── */
  function toggleMenu() {
    var links = document.getElementById('navLinks');
    var burger = document.getElementById('hamburger');
    var open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  }

  /* close menu on link click */
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () {
      document.getElementById('navLinks').classList.remove('open');
      document.getElementById('hamburger').classList.remove('open');
    });
  });

  /* ── Testimonials carousel ─────────────────────────── */
  (function initTestimonials() {
    var slides = document.querySelectorAll('.testi-slide');
    var dots   = document.querySelectorAll('.testi-dot');
    if (!slides.length) return;

    var current = 0;
    var timer;

    function goTo(n) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function startAuto() { timer = setInterval(function () { goTo(current + 1); }, 4500); }
    function stopAuto()  { clearInterval(timer); }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        stopAuto();
        goTo(parseInt(this.dataset.idx, 10));
        startAuto();
      });
    });

    var carousel = document.getElementById('testiCarousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAuto);
      carousel.addEventListener('mouseleave', startAuto);
    }

    startAuto();
  })();

  /* ── Game filter bar ───────────────────────────────── */
  (function initGameFilter() {
    var btns  = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('#gamesGrid .game-card');
    if (!btns.length || !cards.length) return;

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = this.dataset.filter;

        /* update active button */
        btns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        /* show / hide cards */
        cards.forEach(function (card) {
          var matches = filter === 'all' || card.dataset.cat === filter;
          card.classList.toggle('cat-hidden', !matches);
          /* ensure GSAP-animated card is visible when shown */
          if (matches) {
            card.style.opacity  = '1';
            card.style.transform = 'none';
          }
        });
      });
    });
  })();