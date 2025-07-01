document.querySelectorAll('.link-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    btn.classList.add('clicked');
    setTimeout(() => btn.classList.remove('clicked'), 150);
  });
});

document.querySelectorAll('.profile-btn').forEach(btn => {
  btn.addEventListener('touchstart', function() {
    btn.classList.add('touched');
  });
  btn.addEventListener('touchend', function() {
    btn.classList.remove('touched');
  });
  btn.addEventListener('touchcancel', function() {
    btn.classList.remove('touched');
  });
});

document.querySelectorAll('.social-icon').forEach(btn => {
  btn.addEventListener('touchstart', function() {
    btn.classList.add('touched');
  });
  btn.addEventListener('touchend', function() {
    btn.classList.remove('touched');
  });
  btn.addEventListener('touchcancel', function() {
    btn.classList.remove('touched');
  });
});

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resize);

const colors = [
  'rgba(180, 70, 255, 0.45)', // purple
  'rgba(0, 200, 255, 0.35)',  // blue
  'rgba(255, 0, 120, 0.32)',  // neon pink
  'rgba(255, 0, 255, 0.22)',  // magenta
  'rgba(80, 0, 255, 0.25)',   // deep blue
];

const blobs = Array.from({ length: 7 }).map((_, i) => ({
  x: Math.random() * width,
  y: Math.random() * height,
  r: 180 + Math.random() * 120,
  color: colors[i % colors.length],
  dx: (Math.random() - 0.5) * 0.3,
  dy: (Math.random() - 0.5) * 0.3,
  pulse: Math.random() * Math.PI * 2,
  pulseSpeed: 0.005 + Math.random() * 0.004,
}));

function animate() {
  ctx.clearRect(0, 0, width, height);
  ctx.globalCompositeOperation = 'lighter';
  for (const blob of blobs) {
    blob.x += blob.dx;
    blob.y += blob.dy;
    blob.pulse += blob.pulseSpeed;
    if (blob.x < -blob.r) blob.x = width + blob.r;
    if (blob.x > width + blob.r) blob.x = -blob.r;
    if (blob.y < -blob.r) blob.y = height + blob.r;
    if (blob.y > height + blob.r) blob.y = -blob.r;
    const pr = blob.r * (0.85 + 0.15 * Math.sin(blob.pulse));
    const grad = ctx.createRadialGradient(blob.x, blob.y, pr * 0.2, blob.x, blob.y, pr);
    grad.addColorStop(0, blob.color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(blob.x, blob.y, pr, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
  requestAnimationFrame(animate);
}

animate(); 