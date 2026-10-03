/* ═══════════════════════════════════════════════════════
   CONFIG — Edit everything here, nothing else needs changing
═══════════════════════════════════════════════════════ */
const CONFIG = {
  // PASSWORD — change this to whatever word you told Faryal
  password: "faryal",

  // How many floating hearts to show
  heartCount: 18,

  // Heart emojis to cycle through
  hearts: ["🌸", "💕", "🌹", "✨", "💗", "🤍"],

  // Confetti colors
  confettiColors: ["#e8637a", "#f5c6d0", "#d5b8e0", "#c0394f", "#fff0f3", "#ffd6e0"],
};

/* ═══════════════════════════════════════════════════════
   PASSWORD GATE
═══════════════════════════════════════════════════════ */
function checkPassword() {
  const input = document.getElementById("pw-input");
  const error = document.getElementById("pw-error");
  const val   = input.value.trim().toLowerCase();

  if (val === CONFIG.password.toLowerCase()) {
    const screen = document.getElementById("password-screen");
    screen.style.transition = "opacity 0.8s ease";
    screen.style.opacity = "0";
    setTimeout(() => {
      screen.style.display = "none";
      document.getElementById("main-site").classList.remove("hidden");
      startHearts("hero-hearts");
      initScrollReveal();
    }, 800);
  } else {
    error.textContent = "That is not quite right. Try again, jaan ✦";
    error.style.animation = "none";
    void error.offsetWidth;
    error.style.animation = "shake 0.4s ease";
    input.value = "";
    input.focus();
  }
}

// Allow Enter key on password input
document.addEventListener("DOMContentLoaded", () => {
  const pwInput = document.getElementById("pw-input");
  if (pwInput) {
    pwInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") checkPassword();
    });
  }
  startHearts("pw-hearts");
});

/* ═══════════════════════════════════════════════════════
   FLOATING HEARTS
═══════════════════════════════════════════════════════ */
function startHearts(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let i = 0; i < CONFIG.heartCount; i++) {
    setTimeout(() => createHeart(container), i * 400);
  }
  setInterval(() => createHeart(container), 1800);
}

function createHeart(container) {
  const el   = document.createElement("span");
  el.className = "heart";
  el.textContent = CONFIG.hearts[Math.floor(Math.random() * CONFIG.hearts.length)];
  el.style.left     = `${Math.random() * 100}%`;
  el.style.fontSize = `${0.8 + Math.random() * 1.4}rem`;
  el.style.animationDuration = `${6 + Math.random() * 8}s`;
  el.style.animationDelay   = `${Math.random() * 2}s`;
  container.appendChild(el);
  setTimeout(() => el.remove(), 16000);
}

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════ */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add("visible"), parseInt(delay));
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  items.forEach((el) => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════
   SMOOTH SCROLL TO SECTION
═══════════════════════════════════════════════════════ */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ═══════════════════════════════════════════════════════
   MUSIC PLAYER
═══════════════════════════════════════════════════════ */
let musicPlaying = false;
const audio = document.getElementById("bg-music");

function toggleMusic() {
  const btn   = document.getElementById("music-btn");
  const label = btn.querySelector(".music-label");

  // Works with both a src attribute and a <source> child element
  const hasSource = audio.querySelector("source") !== null ||
                    (audio.src && audio.src !== window.location.href);

  if (musicPlaying) {
    audio.pause();
    label.textContent = "\u266a Khudaai";
    btn.classList.remove("playing");
    musicPlaying = false;
  } else {
    if (hasSource) {
      audio.play().then(() => {
        label.textContent = "Pause";
        btn.classList.add("playing");
        musicPlaying = true;
      }).catch(() => {
        label.textContent = "Tap to play";
        setTimeout(() => { label.textContent = "\u266a Khudaai"; }, 2000);
      });
    } else {
      label.textContent = "No song added yet";
      setTimeout(() => { label.textContent = "\u266a Play music"; }, 2500);
    }
  }
}

/* ═══════════════════════════════════════════════════════
   FORGIVENESS BUTTONS
═══════════════════════════════════════════════════════ */
function handleForgiveness(choice) {
  const buttons  = document.getElementById("forgive-buttons");
  const resYes   = document.getElementById("response-yes");
  const resTime  = document.getElementById("response-time");

  // Hide buttons with fade
  buttons.style.transition = "opacity 0.5s ease";
  buttons.style.opacity = "0";
  setTimeout(() => {
    buttons.style.display = "none";
    if (choice === "yes") {
      resYes.classList.remove("hidden");
      launchConfetti();
    } else {
      resTime.classList.remove("hidden");
    }
  }, 500);
}

/* ═══════════════════════════════════════════════════════
   CONFETTI
═══════════════════════════════════════════════════════ */
function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx    = canvas.getContext("2d");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const count = 140;

  for (let i = 0; i < count; i++) {
    particles.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height - canvas.height,
      w:     6 + Math.random() * 8,
      h:     10 + Math.random() * 6,
      color: CONFIG.confettiColors[Math.floor(Math.random() * CONFIG.confettiColors.length)],
      speed: 2 + Math.random() * 4,
      angle: Math.random() * Math.PI * 2,
      spin:  (Math.random() - 0.5) * 0.15,
      drift: (Math.random() - 0.5) * 1.5,
    });
  }

  let frame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.y     += p.speed;
      p.x     += p.drift;
      p.angle += p.spin;
      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame = requestAnimationFrame(draw);
  }

  draw();
  // Stop after 5 seconds
  setTimeout(() => {
    cancelAnimationFrame(frame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 5500);
}

// Resize confetti canvas if window resizes
window.addEventListener("resize", () => {
  const canvas = document.getElementById("confetti-canvas");
  if (canvas) {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
