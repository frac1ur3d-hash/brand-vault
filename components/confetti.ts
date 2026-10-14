/**
 * Tiny dependency-free canvas confetti burst.
 * Creates a fullscreen fixed canvas, animates particles, then removes itself.
 */

export interface ConfettiOptions {
  /** Number of particles to spawn. Default 120. */
  particleCount?: number;
  /** How long the animation runs, in ms. Default 2200. */
  duration?: number;
  /** Particle colors. Defaults to the site's indigo/purple/pink accents + extras. */
  colors?: string[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rot: number;
  vr: number;
  shape: 'rect' | 'circle';
}

const DEFAULT_COLORS = ['#818cf8', '#c084fc', '#f472b6', '#34d399', '#fbbf24', '#38bdf8'];

export function fireConfetti(options: ConfettiOptions = {}): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  // Respect users who prefer reduced motion — skip the celebration entirely.
  if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const { particleCount = 120, duration = 2200, colors = DEFAULT_COLORS } = options;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.scale(dpr, dpr);

  const particles: Particle[] = [];
  const originX = width / 2;
  const originY = height * 0.35;

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 9;
    particles.push({
      x: originX + (Math.random() - 0.5) * 120,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: 5 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      shape: Math.random() > 0.4 ? 'rect' : 'circle',
    });
  }

  const gravity = 0.22;
  const drag = 0.99;
  const start = performance.now();
  let raf = 0;

  const frame = (now: number) => {
    const elapsed = now - start;
    const t = elapsed / duration;
    ctx.clearRect(0, 0, width, height);

    // Fade out during the last 30% of the animation.
    const fade = t > 0.7 ? Math.max(0, 1 - (t - 0.7) / 0.3) : 1;

    for (const p of particles) {
      p.vy += gravity;
      p.vx *= drag;
      p.vy *= drag;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;

      ctx.save();
      ctx.globalAlpha = fade;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    if (elapsed < duration) {
      raf = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(raf);
      canvas.remove();
    }
  };

  raf = requestAnimationFrame(frame);
}
