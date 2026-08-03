const revealBtn = document.getElementById('revealBtn');
const musicBtn = document.getElementById('musicBtn');
const surprise = document.getElementById('surprise');

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const targetDate = new Date('2027-01-01T00:00:00');

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

function spawnLaughingEmojis() {
  const emojis = ['😂', '🤣', '😆', '😹'];
  for (let i = 0; i < 24; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.top = '-20px';
    piece.style.fontSize = `${14 + Math.random() * 10}px`;
    piece.style.setProperty('--x', `${(Math.random() - 0.5) * 220}px`);
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1800);
  }
}

let musicPlaying = false;
let currentAudio = null;

function playMusic() {
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    musicPlaying = false;
    return;
  }

  if (!currentAudio) {
    currentAudio = new Audio('i_guess_krsna_intro.mp3');
    currentAudio.loop = true;
    currentAudio.volume = 0.35;
  }

  currentAudio.play().catch(() => {
    musicPlaying = false;
  });
}

revealBtn.addEventListener('click', () => {
  surprise.classList.toggle('hidden');
  spawnLaughingEmojis();
  revealBtn.textContent = surprise.classList.contains('hidden')
    ? 'Reveal another msg'
    : 'Hide message';
});

musicBtn.addEventListener('click', () => {
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    musicBtn.textContent = 'Play soft music';
    return;
  }

  if (!currentAudio) {
    currentAudio = new Audio('i_guess_krsna_intro.mp3');
    currentAudio.loop = true;
    currentAudio.volume = 0.35;
  }

  currentAudio.play().then(() => {
    musicBtn.textContent = 'Pause music';
  }).catch(() => {
    musicBtn.textContent = 'Play soft music';
  });
});

updateCountdown();
setInterval(updateCountdown, 1000);
