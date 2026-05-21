document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     DEVICE CHECK
  ========================================================= */
  const isMobile = () =>
    window.innerWidth <= 768 || 'ontouchstart' in window;

  /* =========================================================
     CUSTOM CURSOR
  ========================================================= */
  const outer = document.getElementById('cursor-outer');
  const dot   = document.getElementById('cursor-dot');
  const trail = document.getElementById('cursor-trail');

  let mX = innerWidth / 2,
      mY = innerHeight / 2,
      rX = mX,
      rY = mY,
      tX = mX,
      tY = mY;

  if (!isMobile() && outer && dot && trail) {

    document.addEventListener('mousemove', e => {
      mX = e.clientX;
      mY = e.clientY;

      dot.style.left = `${mX}px`;
      dot.style.top  = `${mY}px`;

      // Dynamic Glow
      document.documentElement.style.setProperty('--mx', `${mX}px`);
      document.documentElement.style.setProperty('--my', `${mY}px`);
    });

    (function animateCursor() {

      rX += (mX - rX) * 0.15;
      rY += (mY - rY) * 0.15;

      tX += (mX - tX) * 0.07;
      tY += (mY - tY) * 0.07;

      outer.style.left = `${rX}px`;
      outer.style.top  = `${rY}px`;

      trail.style.left = `${tX}px`;
      trail.style.top  = `${tY}px`;

      requestAnimationFrame(animateCursor);

    })();

    document.querySelectorAll(`
      a, button, .proj-card,
      .btn-fill, .btn-line,
      .sk-chip, .nav-btn
    `).forEach(el => {

      el.addEventListener('mouseenter', () => {
        document.body.classList.add('c-hover');
      });

      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('c-hover');
      });

    });

    document.addEventListener('mousedown', () => {
      document.body.classList.add('c-click');
    });

    document.addEventListener('mouseup', () => {
      document.body.classList.remove('c-click');
    });

  }

  /* =========================================================
     NAVBAR SCROLL EFFECT
  ========================================================= */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* =========================================================
     ACTIVE NAV LINK
  ========================================================= */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const secObs = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        navLinks.forEach(link =>
          link.classList.remove('active')
        );

        const active = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );

        active?.classList.add('active');

      }

    });

  }, {
    threshold: 0.4
  });

  sections.forEach(section => secObs.observe(section));

  /* =========================================================
     HAMBURGER MENU
  ========================================================= */
  const ham    = document.getElementById('hamburger');
  const drawer = document.getElementById('drawer');

  ham?.addEventListener('click', () => {

    ham.classList.toggle('open');
    drawer.classList.toggle('open');

    document.body.style.overflow =
      drawer.classList.contains('open')
        ? 'hidden'
        : '';

  });

  document.querySelectorAll('.d-link').forEach(link => {

    link.addEventListener('click', () => {

      ham.classList.remove('open');
      drawer.classList.remove('open');

      document.body.style.overflow = '';

    });

  });

  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', e => {

      const target = document.querySelector(
        anchor.getAttribute('href')
      );

      if (!target) return;

      e.preventDefault();

      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });

    });

  });

  /* =========================================================
     SCROLL REVEAL
  ========================================================= */
  const revealEls = document.querySelectorAll(
    '.fade-up, .fade-right, .fade-left'
  );

  const revealObs = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObs.observe(el));

  /* =========================================================
     HERO LOAD ANIMATION
  ========================================================= */
  window.addEventListener('load', () => {

    document.querySelectorAll(
      '.hero .fade-up, .hero .fade-right'
    ).forEach((el, i) => {

      setTimeout(() => {
        el.classList.add('visible');
      }, 100 + i * 100);

    });

  });

  /* =========================================================
     TYPING EFFECT
  ========================================================= */
  const typingText = document.getElementById('typing');

  if (typingText) {

    const roles = [
      'AI Developer',
      'Data Scientist',
      'Python Developer',
      'ML Enthusiast'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

      const current = roles[roleIndex];

      if (!deleting) {

        typingText.textContent =
          current.substring(0, charIndex++);

        if (charIndex > current.length) {

          deleting = true;

          setTimeout(typeEffect, 1200);
          return;

        }

      } else {

        typingText.textContent =
          current.substring(0, charIndex--);

        if (charIndex < 0) {

          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;

        }

      }

      setTimeout(typeEffect, deleting ? 40 : 80);

    }

    typeEffect();

  }

  /* =========================================================
     TEXT SCRAMBLE
  ========================================================= */
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  function scramble(el, finalText, duration = 900) {

    let frame = 0;
    const totalFrames = duration / 30;

    const timer = setInterval(() => {

      frame++;

      const progress = frame / totalFrames;

      el.textContent = finalText
        .split('')
        .map((char, i) => {

          if (char === ' ') return ' ';

          if (i / finalText.length < progress)
            return char;

          return chars[
            Math.floor(Math.random() * chars.length)
          ];

        })
        .join('');

      if (frame >= totalFrames) {

        el.textContent = finalText;
        clearInterval(timer);

      }

    }, 30);

  }

  window.addEventListener('load', () => {

    const heroName =
      document.querySelector('.hero-text h1 em');

    if (heroName) {

      const original = heroName.textContent;

      setTimeout(() => {
        scramble(heroName, original);
      }, 500);

    }

  });

  /* =========================================================
     STATS COUNTER
  ========================================================= */
  function countUp(el, to, suffix = '') {

    let start = null;
    const duration = 1600;

    function update(ts) {

      if (!start) start = ts;

      const progress =
        Math.min((ts - start) / duration, 1);

      const value =
        Math.floor(progress * to);

      el.textContent = value + suffix;

      if (progress < 1)
        requestAnimationFrame(update);

    }

    requestAnimationFrame(update);

  }

  const statsSection =
    document.querySelector('.stats-row');

  if (statsSection) {

    const statsObs =
      new IntersectionObserver(entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target
              .querySelectorAll('.s-item strong')
              .forEach(el => {

                const txt = el.textContent.trim();

                if (txt === '2+')
                  countUp(el, 2, '+');

                if (txt === '12+')
                  countUp(el, 12, '+');

                if (txt === '3')
                  countUp(el, 3);

              });

            statsObs.unobserve(entry.target);

          }

        });

      }, {
        threshold: 0.5
      });

    statsObs.observe(statsSection);

  }

  /* =========================================================
     PROJECT CARD 3D TILT
  ========================================================= */
  if (!isMobile()) {

    document.querySelectorAll('.proj-card')
      .forEach(card => {

        card.addEventListener('mousemove', e => {

          const rect =
            card.getBoundingClientRect();

          const x =
            (e.clientX - rect.left) /
            rect.width - 0.5;

          const y =
            (e.clientY - rect.top) /
            rect.height - 0.5;

          card.style.transform = `
            perspective(1000px)
            rotateX(${-y * 8}deg)
            rotateY(${x * 8}deg)
            translateY(-6px)
          `;

        });

        card.addEventListener('mouseleave', () => {

          card.style.transform = `
            perspective(1000px)
            rotateX(0)
            rotateY(0)
            translateY(0)
          `;

        });

      });

  }

  /* =========================================================
     SKILL CHIP STAGGER
  ========================================================= */
  const skills =
    document.querySelectorAll('.sk-chip');

  const skillObs =
    new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          skills.forEach((chip, i) => {

            setTimeout(() => {

              chip.classList.add('show');

            }, i * 80);

          });

          skillObs.disconnect();

        }

      });

    }, {
      threshold: 0.2
    });

  if (skills.length)
    skillObs.observe(skills[0]);

  /* =========================================================
     PAGE PROGRESS BAR
  ========================================================= */
  const progressBar =
    document.getElementById('progress-bar');

  window.addEventListener('scroll', () => {

    const total =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      (window.scrollY / total) * 100;

    if (progressBar)
      progressBar.style.width =
        `${progress}%`;

  });

  /* =========================================================
     PRELOADER
  ========================================================= */
  const preloader =
    document.getElementById('preloader');

  window.addEventListener('load', () => {

    setTimeout(() => {

      preloader?.classList.add('hide');

    }, 800);

  });

  /* =========================================================
     PAGE FADE IN
  ========================================================= */
  document.body.style.opacity = '0';

  requestAnimationFrame(() => {

    document.body.style.transition =
      'opacity 0.6s ease';

    document.body.style.opacity = '1';

  });

});
