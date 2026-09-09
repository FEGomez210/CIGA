const header = document.getElementById('siteHeader');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));

    window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 12), { passive: true });

    document.querySelectorAll('.filter-btn').forEach(button => button.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      const category = button.dataset.filter;
      document.querySelectorAll('.service-card').forEach(card => {
        card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category);
      });
    }));

    document.querySelectorAll('.faq-question').forEach(button => button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const willOpen = !item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('open');
        faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    }));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    document.getElementById('year').textContent = new Date().getFullYear();
