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

    /* stats items */
    gsap.utils.toArray('.stat-item').forEach(function(el, i) {
      gsap.fromTo(el,
        { opacity: 0, y: 40, rotateX: 20 },
        { opacity: 1, y: 0, rotateX: 0, duration: .65, delay: i * .1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } }
      );
    });

    initThreeHero();
    initTilt();
    initCounters();
  }

  /* ── Three.js 3D Hero ──────────────────────────────── */
  function initThreeHero() {
    var canvas = document.getElementById('heroCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    var hero  = canvas.parentElement;
    var W = hero.offsetWidth;
    var H = hero.offsetHeight;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    var scene  = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 35;

    /* Neon particle field */
    var count = 1200;
    var pPos  = new Float32Array(count * 3);
    var pCol  = new Float32Array(count * 3);
    for (var i = 0; i < count; i++) {
      pPos[i*3]   = (Math.random() - .5) * 110;
      pPos[i*3+1] = (Math.random() - .5) * 80;
      pPos[i*3+2] = (Math.random() - .5) * 70;
      if (Math.random() > .5) {
        pCol[i*3] = .9;  pCol[i*3+1] = 0;   pCol[i*3+2] = .15; /* red */
      } else {
        pCol[i*3] = 0;   pCol[i*3+1] = .7;  pCol[i*3+2] = 1;   /* blue */
      }
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(pCol, 3));
    var pMat = new THREE.PointsMaterial({ size: .22, vertexColors: true, transparent: true, opacity: .8 });
    scene.add(new THREE.Points(pGeo, pMat));

    /* Wireframe materials */
    var redWire   = new THREE.MeshBasicMaterial({ color: 0xe60026, wireframe: true, transparent: true, opacity: .18 });
    var blueWire  = new THREE.MeshBasicMaterial({ color: 0x00b4ff, wireframe: true, transparent: true, opacity: .14 });
    var whiteWire = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: .05 });

    /* Floating wireframe geometries */
    var ico   = new THREE.Mesh(new THREE.IcosahedronGeometry(7, 1), redWire);
    ico.position.set(-18, 5, -8);
    scene.add(ico);

    var torus = new THREE.Mesh(new THREE.TorusGeometry(6, 1.8, 8, 24), blueWire);
    torus.position.set(18, -5, -6);
    scene.add(torus);

    var oct   = new THREE.Mesh(new THREE.OctahedronGeometry(5, 0), whiteWire);
    oct.position.set(5, 10, -20);
    scene.add(oct);

    var tetra = new THREE.Mesh(new THREE.TetrahedronGeometry(4, 0), redWire);
    tetra.position.set(-6, -10, -12);
    scene.add(tetra);

    var sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(3, 0), blueWire);
    sphere.position.set(10, 8, -5);
    scene.add(sphere);

    /* Perspective grid floor */
    var grid = new THREE.GridHelper(200, 40, 0x00b4ff, 0x00b4ff);
    grid.material.opacity = .05;
    grid.material.transparent = true;
    grid.position.y = -22;
    scene.add(grid);

    /* Mouse parallax */
    var mx = 0, my = 0;
    var heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.addEventListener('mousemove', function(e) {
        var r = heroEl.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width  - .5) * 2;
        my = ((e.clientY - r.top)  / r.height - .5) * 2;
      });
    }

    /* Animation loop */
    var clock = new THREE.Clock();
    function tick() {
      requestAnimationFrame(tick);
      var t = clock.getElapsedTime();
      ico.rotation.x   = t * .25;
      ico.rotation.y   = t * .35;
      torus.rotation.x = t * .4;
      torus.rotation.z = t * .28;
      oct.rotation.y   = t * .3;
      oct.rotation.z   = t * .2;
      tetra.rotation.x = t * .45;
      tetra.rotation.y = t * .25;
      sphere.rotation.y = t * .5;
      camera.position.x += (mx * 5  - camera.position.x) * .04;
      camera.position.y += (-my * 3 - camera.position.y) * .04;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }
    tick();

    /* Resize */
    window.addEventListener('resize', function() {
      var w = hero.offsetWidth, h = hero.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  /* ── VanillaTilt 3D card tilt ──────────────────────── */
  function initTilt() {
    if (typeof VanillaTilt === 'undefined') return;
    VanillaTilt.init(document.querySelectorAll('.game-card'), {
      max:          12,
      speed:        500,
      glare:        true,
      'max-glare':  0.2,
      scale:        1.04,
      gyroscope:    true,
    });
  }

  /* ── Stat counters ─────────────────────────────────── */
  function initCounters() {
    var nums = document.querySelectorAll('.stat-num');
    if (!nums.length) return;
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var el     = entry.target;
        var target = parseInt(el.dataset.target, 10);
        var suffix = el.dataset.suffix || '+';
        var dur    = 1800;
        var start  = performance.now();
        function step(now) {
          var p = Math.min((now - start) / dur, 1);
          var ease = 1 - Math.pow(1 - p, 3); /* ease-out-cubic */
          el.textContent = Math.floor(ease * target).toLocaleString() + (p >= 1 ? suffix : '');
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: .5 });
    nums.forEach(function(n) { obs.observe(n); });
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