const header = document.getElementById('siteHeader');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const modal = document.getElementById('diagnosisModal');
    const modalCard = modal.querySelector('.modal-card');
    const wizardSteps = [...document.querySelectorAll('.wizard-step')];
    const wizardBars = [...document.querySelectorAll('.wizard-progress span')];
    let currentStep = 1;
    let diagnosis = { stage: '', need: '' };
    let lastFocused = null;

    const icons = {
      check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4L19 6"/></svg>'
    };

    const showStep = (number) => {
      currentStep = number;
      wizardSteps.forEach(step => step.classList.toggle('active', Number(step.dataset.step) === number));
      wizardBars.forEach((bar, index) => bar.classList.toggle('active', index < number));
      modalCard.scrollTop = 0;
    };

    const results = {
      registration: {
        title: 'Diagnóstico registral + hoja de ruta',
        text: 'Revisaremos actividad, jurisdicción, establecimiento y productos para definir habilitaciones, RNE/RPE, RNPA/RPPA y documentación necesaria.'
      },
      quality: {
        title: 'Auditoría inicial + plan de adecuación',
        text: 'Relevaremos instalaciones, prácticas y documentos para priorizar mejoras e implementar un sistema BPM o HACCP sostenible.'
      },
      technical: {
        title: 'Asesoría o dirección técnica',
        text: 'Definiremos el alcance profesional que requiere tu actividad y una modalidad de seguimiento acorde a tus objetivos y operación.'
      },
      training: {
        title: 'Plan de capacitación por rubro',
        text: 'Identificaremos necesidades del equipo y prepararemos una capacitación práctica, con contenidos aplicables a la actividad.'
      }
    };

    const openDiagnosis = () => {
      lastFocused = document.activeElement;
      modal.classList.add('open');
      document.body.classList.add('modal-open');
      showStep(1);
      setTimeout(() => modal.querySelector('.modal-close').focus(), 30);
    };

    const closeDiagnosis = () => {
      modal.classList.remove('open');
      document.body.classList.remove('modal-open');
      if (lastFocused) lastFocused.focus();
    };

    document.querySelectorAll('[data-open-diagnosis]').forEach(button => button.addEventListener('click', openDiagnosis));
    document.querySelectorAll('[data-close-diagnosis]').forEach(button => button.addEventListener('click', closeDiagnosis));
    modal.addEventListener('click', (event) => { if (event.target === modal) closeDiagnosis(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('open')) closeDiagnosis(); });

    document.querySelectorAll('[data-stage]').forEach(button => button.addEventListener('click', () => {
      diagnosis.stage = button.dataset.stage;
      showStep(2);
    }));

    document.querySelectorAll('[data-need]').forEach(button => button.addEventListener('click', () => {
      diagnosis.need = button.dataset.need;
      const result = results[diagnosis.need];
      document.getElementById('resultTitle').textContent = result.title;
      document.getElementById('resultText').textContent = result.text;
      showStep(3);
    }));

    document.getElementById('restartDiagnosis').addEventListener('click', () => {
      diagnosis = { stage: '', need: '' };
      showStep(1);
    });

    document.getElementById('resultCta').addEventListener('click', closeDiagnosis);

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
