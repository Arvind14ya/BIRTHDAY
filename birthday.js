let slides = document.querySelectorAll('.slide');
let index = 0;
let slideshowInterval;
let heartsInterval;

// Start Button
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startBtn").classList.add("hidden");
  document.querySelector(".slideshow").classList.remove("hidden");
  document.getElementById("confetti").classList.remove("hidden");

  // Play music
  document.getElementById("bgMusic").play();

  // Start slideshow
  slideshowInterval = setInterval(showSlide, 5000);

  // Start typing text
  typeWriter();

  // Start confetti
  setInterval(drawConfetti, 20);

  // Start hearts
  heartsInterval = setInterval(createHeart, 500);
});

function showSlide() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
  index = (index + 1) % slides.length;
}

// Typing Effect
const celebrationText = "🎉 Happy Birthday Papa 🎉";
let i = 0;
function typeWriter() {
  if (i < celebrationText.length) {
    document.getElementById("celebrationText").innerHTML += celebrationText.charAt(i);
    i++;
    setTimeout(typeWriter, 150);
  }
}

// Confetti
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confettiParticles = [];
for (let i = 0; i < 150; i++) {
  confettiParticles.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 1 + 1,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.ellipse(p.x, p.y, p.r, p.r / 2, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fill();
  });
  updateConfetti();
}

function updateConfetti() {
  confettiParticles.forEach(p => {
    p.y += p.d;
    p.x += Math.sin(p.y * 0.05);
    if (p.y > confettiCanvas.height) {
      p.y = -10;
      p.x = Math.random() * confettiCanvas.width;
    }
  });
}

window.addEventListener("resize", () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

// Hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.fontSize = Math.random() * 20 + 20 + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}
