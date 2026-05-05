
/* display works + basic info about works */
const TAPES = {
  comms: {
    title: 'COMMS LAB',
    vol: 'VOL.01',
    color: '#00fff7',
    slides: [
      { type: 'img', src: 'web 1.png', label: 'Assignment 1', title: 'NYUAD Campus Cat Pageant', year: '2026', medium: 'website', link: 'https://ting-anyang.github.io/Assignment1/' },
      { type: 'img', src: 'web 2.png', label: 'Assignment 2', title: 'Don Midori vs. Don Taichi', year: '2026', medium: 'website', link: 'https://rabeyamily.github.io/MAFIA-CampusCats/' },
      { type: 'img', src: 'web 3.png', label: 'Assignment 3', title: 'Faiza the Falcon: Around the World', year: '2026', medium: 'website', link: 'https://kzeina.github.io/sounds_commslab/index.html ' },
      { type: 'img', src: 'web 4.png', label: 'Assignment 4', title: 'The Brew Lab', year: '2026', medium: 'website', link: 'https://alw1nmathew.github.io/VideoCommsLab/' },
    ]
  },
  trad: {
    title: 'TRADITIONAL ART',
    vol: 'VOL.02',
    color: '#ff2d78',
    slides: [
      { type: 'img', src: 'dr. manhattan.jpg', label: 'Dr. Manhattan', title: 'Dr. Manhattan', year: '2025', medium: 'alcohol-based markers, color pencils' },
      { type: 'img', src: 'high noon 1.JPG', label: 'High Noon (page 1)', title: 'High Noon (page 1)', year: '2025', medium: 'fineliner pen, ballpoint pen, water-based brush pen, ink brush pen, white gel pen' },
      { type: 'img', src: 'high noon 2.JPG', label: 'High Noon (page 2)', title: 'High Noon (page 2)', year: '2025', medium: 'fineliner pen, ballpoint pen, water-based brush pen, ink brush pen, white gel pen' },
      { type: 'img', src: 'taiwan print.JPG', label: 'Taiwan', title: 'Shades of Taiwan', year: '2024', medium: 'linocut print with soy-based ink' },
      { type: 'img', src: 'walterwhite.jpg', label: 'Walter White', title: 'Walter White', year: '2024', medium: 'linocut print with soy-based ink' },
      { type: 'img', src: 'broth brawl.jpg', label: 'Broth Brawl', title: 'Broth Brawl', year: '2023', medium: 'fineliner pen, alcohol-based markers' },
      { type: 'img', src: 'monk.jpg', label: 'Monk 1', title: 'Monk (front view)', year: '2024', medium: 'clay' },
      { type: 'img', src: 'monk2.jpg', label: 'Monk 2', title: 'Monk (back view)', year: '2024', medium: 'clay' },
      { type: 'img', src: 'hand.jpg', label: 'Hand 1', title: 'Hand (front view)', year: '2024', medium: 'clay' },
      { type: 'img', src: 'hand2.jpg', label: 'Hand 2', title: 'Hand (side view)', year: '2024', medium: 'clay' },
    ]
  },
  dig: {
    title: 'DIGITAL ART',
    vol: 'VOL.03',
    color: '#ffb800',
    slides: [
      { type: 'img', src: 'sekiro.JPG', label: 'Sekiro', title: 'Ashina Outskirts', year: '2024', medium: 'Procreate on iPad' },
      { type: 'img', src: 'demon 1.JPG', label: 'Demons (page 1)', title: 'Demons (page 1)', year: '2025', medium: 'brush pen, fineliner pen, water-based brush pen, Procreate on iPad' },
      { type: 'img', src: 'demon 2.JPG', label: 'Demons (page 2)', title: 'Demons (page 2)', year: '2025', medium: 'brush pen, fineliner pen, water-based brush pen, Procreate on iPad' },
    ]
  }
};

/* track active "tape" and if the "TV" is animating */
let currentTape  = null;
let currentSlide = 0;
let isAnimating  = false;

/* helpers */
function hexToRgba(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

/* page routing */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showAbout() { showPage('about'); }

function goHome() {
  showPage('home');
  ejectTape();
}

/* VHS tape "insertion" animation */
function insertTape(el) {
  if (isAnimating) return; // stops user spam-clicking during animation
  isAnimating = true;

  const cat = el.dataset.cat;
  el.classList.add('inserting'); // trigger CSS animation

  const lights = ['light1', 'light2', 'light3'].map(id => document.getElementById(id)); // LED light effect

  setTimeout(() => {
    document.getElementById('tapeInSlot').classList.add('visible');
    document.getElementById('tapeInSlotLabel').textContent = TAPES[cat].title;
    lights.forEach(l => l.classList.add('active'));
  }, 450);

  // CRT TV loading screen logic
  setTimeout(() => {
    document.getElementById('screenIdle').style.display    = 'none';
    document.getElementById('screenLoading').style.display = 'flex';
    document.getElementById('tvIndicator').classList.add('on');

    let progress = 0;
    const fill  = document.getElementById('trackingFill');
    const label = document.getElementById('trackingLabel');

    const interval = setInterval(() => {
      progress += Math.random() * 8 + 4;
      if (progress >= 100) {
        clearInterval(interval);
        label.textContent = '▶ PLAY';
        fill.style.width  = '100%';
        setTimeout(() => showGallery(cat), 300);
      } else {
        if (progress > 60)      label.textContent = '▶ PLAY';
        else if (progress > 30) label.textContent = 'LOADING...';
        fill.style.width = progress + '%';
      }
    }, 80);
  }, 750);
}

/* tape "ejection" */
function ejectTape() {
  ['light1', 'light2', 'light3']
    .map(id => document.getElementById(id))
    .forEach(l => l.classList.remove('active'));

  document.getElementById('tapeInSlot').classList.remove('visible');
  document.getElementById('tvIndicator').classList.remove('on');
  document.getElementById('screenLoading').style.display = 'none';
  document.getElementById('screenIdle').style.display    = 'flex';
  document.getElementById('trackingFill').style.width    = '0%';
  document.getElementById('trackingLabel').textContent   = 'TRACKING...';

  document.querySelectorAll('.vhs-tape').forEach(t => t.classList.remove('inserting'));
  currentTape  = null;
  isAnimating  = false;
}

/* gallery */
function showGallery(cat) {
  currentTape  = cat;
  currentSlide = 0;

  const tape = TAPES[cat];
  showPage('gallery');

  document.getElementById('galleryTitle').textContent     = tape.title;
  document.getElementById('galleryCatLabel').textContent  = tape.vol;
  document.getElementById('tapeInfoName').textContent     = tape.title;
  document.getElementById('tapeInfoStripe').style.cssText =
    `background:${tape.color};box-shadow:0 0 6px ${tape.color}`;

  document.getElementById('infoScreen')
    .style.setProperty('--info-glow', hexToRgba(tape.color, 0.05));

  buildCarousel(tape);
  updateInfoPanel();
  isAnimating = false;
}

function buildCarousel(tape) {
  const screen = document.getElementById('galleryScreen');
  const dots   = document.getElementById('carouselDots');
  screen.innerHTML = '';
  dots.innerHTML   = '';

  tape.slides.forEach((slide, i) => {
    const el = document.createElement('div');
    el.className = 'carousel-slide' + (i === 0 ? ' active' : '');

    //decide whether to display image or placeholder
    if (slide.type === 'placeholder') {
      el.innerHTML = `
        <div class="slide-placeholder">
          <div class="slide-placeholder-icon">${slide.icon}</div>
          <div class="slide-placeholder-label">${slide.label}</div>
          <div class="slide-placeholder-hint">ADD YOUR IMAGE HERE</div>
        </div>`;
    } else {
      el.innerHTML = `<img src="${slide.src}" alt="${slide.label}" />`;
    }

    screen.appendChild(el);

    //navigation dots
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dots.appendChild(dot);
  });

  updateCounter();
}

/* work description panel */
function updateInfoPanel() {
  const slide = TAPES[currentTape].slides[currentSlide];
  const tape  = TAPES[currentTape];

  const empty   = document.getElementById('infoEmpty');
  const content = document.getElementById('infoContent');

  if (!slide.title) {
    empty.style.display   = 'flex';
    content.style.display = 'none';
    return;
  }

  empty.style.display   = 'none';
  content.style.display = 'flex';

  // title + colour
  const titleEl = document.getElementById('infoTitle');
  titleEl.textContent   = slide.title || '—';
  titleEl.style.color   = tape.color;
  titleEl.style.textShadow = `0 0 12px ${hexToRgba(tape.color, 0.4)}`;

  // rows
  document.getElementById('infoYear').textContent   = slide.year   || '—';
  document.getElementById('infoMedium').textContent = slide.medium || '—';

  // accent left border to match tape
  document.querySelectorAll('.info-row').forEach(r => {
    r.style.borderColor = hexToRgba(tape.color, 0.35);
  });

  const descRow = document.getElementById('infoDescRow');
  if (slide.desc) {
    descRow.style.display = 'flex';
    document.getElementById('infoDesc').textContent = slide.desc;
  } else {
    descRow.style.display = 'none';
  }

  const linkRow = document.getElementById('infoLinkRow');
  const linkEl  = document.getElementById('infoLink');
  if (slide.link) {
  linkRow.style.display    = 'flex';
  linkEl.href              = slide.link;
  linkEl.textContent       = '↗ VIEW PROJECT';
  linkEl.style.color       = tape.color;
  linkEl.style.textShadow  = `0 0 8px ${hexToRgba(tape.color, 0.5)}`;
  } else {
  linkRow.style.display = 'none';
}
}

/* image carousel */
function updateCounter() {
  document.getElementById('carouselCounter').textContent =
    `${currentSlide + 1} / ${TAPES[currentTape].slides.length}`;
}

function goToSlide(idx) {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots   = document.querySelectorAll('.dot');

  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = idx;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');

  updateCounter();
  updateInfoPanel();
}

function nextSlide() {
  goToSlide((currentSlide + 1) % TAPES[currentTape].slides.length);
}

function prevSlide() {
  goToSlide(
    (currentSlide - 1 + TAPES[currentTape].slides.length) % TAPES[currentTape].slides.length
  );
}

/* keyboard navigation */
document.addEventListener('keydown', e => {
  if (!currentTape) return;
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft')  prevSlide();
});

