// НПО «Процесс» — site scripts
document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav */
  var burger = document.querySelector('.burger');
  var mobileNav = document.querySelector('.mobile-nav');
  var mobileClose = document.querySelector('.mobile-nav-close');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () { mobileNav.classList.add('open'); document.body.style.overflow='hidden'; });
  }
  if (mobileClose) {
    mobileClose.addEventListener('click', function () { mobileNav.classList.remove('open'); document.body.style.overflow=''; });
  }

  /* Search panel toggle */
  var searchToggle = document.querySelector('.search-toggle');
  var searchPanel = document.querySelector('.search-panel');
  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      searchPanel.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!searchPanel.contains(e.target) && e.target !== searchToggle) {
        searchPanel.classList.remove('open');
      }
    });
  }

  /* Email copy button */
  document.querySelectorAll('.copy-email').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var email = btn.getAttribute('data-email');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(function () {
          var old = btn.innerHTML;
          btn.innerHTML = '&#10003;';
          setTimeout(function () { btn.innerHTML = old; }, 1500);
        });
      }
    });
  });

  /* Tabs (Технологии) */
  document.querySelectorAll('.tabs-nav').forEach(function (nav) {
    var group = nav.getAttribute('data-tabs');
    var buttons = nav.querySelectorAll('.tab-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var target = btn.getAttribute('data-target');
        document.querySelectorAll('[data-panel-group="' + group + '"]').forEach(function (p) {
          p.classList.remove('active');
        });
        var panel = document.querySelector('#' + target);
        if (panel) panel.classList.add('active');
      });
    });
  });

  /* Filter bar (Объекты) */
  var filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    var filterBtns = filterBar.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('[data-filter-item]');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-filter');
        cards.forEach(function (c) {
          var tags = c.getAttribute('data-filter-item');
          if (f === 'all' || tags.indexOf(f) !== -1) {
            c.style.display = '';
          } else {
            c.style.display = 'none';
          }
        });
      });
    });
  }

  /* Cookie banner */
  var cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner) {
    if (!localStorage.getItem('npo_cookie_ack')) {
      setTimeout(function () { cookieBanner.classList.add('show'); }, 600);
    }
    var acceptBtn = cookieBanner.querySelector('.cookie-accept');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem('npo_cookie_ack', '1');
        cookieBanner.classList.remove('show');
      });
    }
  }

  /* File attach buttons in lead forms */
  document.querySelectorAll('.file-field input[type="file"]').forEach(function (input) {
    input.addEventListener('change', function () {
      var nameEl = input.closest('.file-field').querySelector('.file-field-name');
      if (!nameEl) return;
      nameEl.textContent = input.files && input.files.length ? 'Файл: ' + input.files[0].name : '';
    });
  });

  /* Forms: front-end only demo submit */
  document.querySelectorAll('form[data-lead-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.innerHTML : '';
      if (btn) { btn.innerHTML = 'Отправляем…'; btn.disabled = true; }
      setTimeout(function () {
        form.innerHTML = '<div class="form-success"><h3>Заявка отправлена</h3><p>Спасибо! Наш инженер свяжется с вами в течение рабочего дня для уточнения деталей проекта.</p></div>';
      }, 700);
    });
  });

  /* Water-droplet ripple effect on every button click */
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var span = document.createElement('span');
      span.className = 'ripple';
      span.style.width = span.style.height = size + 'px';
      span.style.left = (e.clientX - rect.left - size / 2) + 'px';
      span.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(span);
      setTimeout(function () { span.remove(); }, 700);
    });
  });

  /* Header shadow on scroll */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 4) header.style.boxShadow = '0 4px 20px rgba(11,25,60,.06)';
      else header.style.boxShadow = 'none';
    });
  }

  /* Back to top */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
