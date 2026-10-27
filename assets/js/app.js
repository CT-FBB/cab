/* =====================================================
   Cabinet Equipment Manager — app.js
   ===================================================== */

'use strict';

/* ── 1. Dark Mode ── */
(function initDarkMode() {
  const html   = document.documentElement;
  const toggle = document.getElementById('darkToggle');
  const KEY    = 'cabinet-theme';

  const saved  = localStorage.getItem(KEY);
  const prefer = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme  = saved || prefer;

  applyTheme(theme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next    = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(KEY, next);
    });
  }

  function applyTheme(t) {
    html.setAttribute('data-theme', t);
    if (toggle) toggle.textContent = t === 'dark' ? '☀️' : '🌙';
  }
})();

/* ── 2. Navbar Scroll ── */
(function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── 3. Smooth Scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── 4. Search Overlay ── */
(function initSearch() {
  const openBtn  = document.getElementById('searchOpen');
  const overlay  = document.getElementById('searchOverlay');
  const closeBtn = document.getElementById('searchClose');
  const input    = document.getElementById('searchInput');
  const results  = document.getElementById('searchResults');
  if (!overlay) return;

  const ITEMS = [
    { icon: '🌐', label: 'Huawei MA5800-X17',      sub: 'OLT',    href: 'pages/equipment.html' },
    { icon: '🌐', label: 'ZTE C320',                sub: 'OLT',    href: 'pages/equipment.html' },
    { icon: '📡', label: 'Huawei F688',             sub: 'CPE',    href: 'pages/equipment.html' },
    { icon: '📡', label: 'ZTE F680',                sub: 'CPE',    href: 'pages/equipment.html' },
    { icon: '📶', label: 'Huawei NodeB',            sub: 'NodeB',  href: 'pages/equipment.html' },
    { icon: '🔄', label: 'Huawei CX600',            sub: 'IPRAN',  href: 'pages/equipment.html' },
    { icon: '🔀', label: 'Cisco Catalyst 9300',     sub: 'Switch', href: 'pages/equipment.html' },
    { icon: '🔋', label: 'Megmeet Rectifier',       sub: 'Power',  href: 'pages/equipment.html' },
    { icon: '🗄️', label: 'Cabinet BKK-001',        sub: 'Cabinet', href: 'pages/cabinet-detail.html' },
    { icon: '🗄️', label: 'Cabinet CNX-003',        sub: 'Cabinet', href: 'pages/cabinet-detail.html' },
  ];

  function open() {
    overlay.classList.add('open');
    input.focus();
    renderResults('');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('open');
    input.value = '';
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open(); }
    if (e.key === 'Escape') close();
  });

  input.addEventListener('input', () => renderResults(input.value.trim()));

  function renderResults(q) {
    const filtered = q
      ? ITEMS.filter(i => i.label.toLowerCase().includes(q.toLowerCase()) || i.sub.toLowerCase().includes(q.toLowerCase()))
      : ITEMS;
    if (!filtered.length) {
      results.innerHTML = '<div class="search-result-item" style="color:var(--text-tertiary)">ไม่พบผลลัพธ์</div>';
      return;
    }
    results.innerHTML = filtered.map(i => `
      <a class="search-result-item" href="${i.href}">
        <span class="icon">${i.icon}</span>
        <div>
          <div style="font-weight:600;color:var(--text-primary)">${i.label}</div>
          <div style="font-size:0.75rem;color:var(--text-secondary)">${i.sub}</div>
        </div>
      </a>
    `).join('');
  }
})();

/* ── 5. Stats Counter Animation ── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.dataset.count, 10);
      const dur = 1600;
      const step = Math.max(1, Math.floor(dur / end));
      let cur = 0;
      el.textContent = '0';
      const timer = setInterval(() => {
        cur += Math.ceil(end / (dur / 16));
        if (cur >= end) { cur = end; clearInterval(timer); }
        el.textContent = cur.toLocaleString();
      }, 16);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
})();

/* ── 6. Category / Equipment Filter & Search (equipment.html) ── */
(function initEquipmentFilter() {
  const cards    = document.querySelectorAll('[data-category]');
  const chips    = document.querySelectorAll('.filter-chip');
  const sortSel  = document.getElementById('sortSelect');
  const searchEl = document.getElementById('equipSearch');
  const grid     = document.getElementById('equipGrid');
  const noRes    = document.getElementById('noResults');
  if (!cards.length) return;

  let activeFilter = 'all';
  let searchQ      = '';
  let sortBy       = 'model';

  chips.forEach(c => {
    c.addEventListener('click', () => {
      chips.forEach(x => x.classList.remove('active'));
      c.classList.add('active');
      activeFilter = c.dataset.filter;
      applyFilter();
    });
  });

  if (searchEl) {
    searchEl.addEventListener('input', () => {
      searchQ = searchEl.value.toLowerCase();
      applyFilter();
    });
  }

  if (sortSel) {
    sortSel.addEventListener('change', () => {
      sortBy = sortSel.value;
      applyFilter();
    });
  }

  function applyFilter() {
    let visible = [];
    cards.forEach(card => {
      const cat    = card.dataset.category || '';
      const model  = (card.dataset.model  || '').toLowerCase();
      const vendor = (card.dataset.vendor || '').toLowerCase();
      const matchF = activeFilter === 'all' || cat === activeFilter;
      const matchS = !searchQ || model.includes(searchQ) || vendor.includes(searchQ) || cat.includes(searchQ);
      if (matchF && matchS) {
        card.style.display = '';
        visible.push(card);
      } else {
        card.style.display = 'none';
      }
    });

    if (noRes) noRes.classList.toggle('show', visible.length === 0);

    if (grid && visible.length > 1) {
      const sorted = [...visible].sort((a, b) => {
        const av = (a.dataset[sortBy] || '').toLowerCase();
        const bv = (b.dataset[sortBy] || '').toLowerCase();
        return av.localeCompare(bv);
      });
      sorted.forEach(el => grid.appendChild(el));
    }
  }
})();

/* ── 7. Card Hover Glow ── */
(function initCardGlow() {
  const cards = document.querySelectorAll('.equipment-card, .category-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
})();

/* ── 8. Animate on Scroll ── */
(function initScrollAnimations() {
  const els = document.querySelectorAll('.animate-in');
  if (!els.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.animationPlayState = 'running'; observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => { el.style.animationPlayState = 'paused'; observer.observe(el); });
})();

/* ── 9. Active Nav Link ── */
(function setActiveLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav__link').forEach(a => {
    if (a.getAttribute('href') && path.includes(a.getAttribute('href').replace(/^\.\.\//, ''))) {
      a.classList.add('active');
    }
  });
})();

/* ── 10. Port Progress Bars Animation ── */
(function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  if (!bars.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width + '%';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => { b.style.width = '0%'; observer.observe(b); });
})();

/* ── 11. Table Row Click ── */
(function initTableRows() {
  document.querySelectorAll('tbody tr[data-href]').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => { window.location.href = row.dataset.href; });
  });
})();
