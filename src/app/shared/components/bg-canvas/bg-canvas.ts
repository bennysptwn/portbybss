import {
  Component, ElementRef, ViewChild,
  AfterViewInit, OnDestroy, inject,
  PLATFORM_ID, HostListener
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  type: 'dot' | 'cross' | 'square';
}

interface CodeLine {
  x: number; y: number;
  text: string;
  speed: number;
  opacity: number;
  fontSize: number;
}

const CODE_SNIPPETS = [
  'const app = bootstrapApplication(App);',
  'export class ShellComponent {}',
  'signal<Theme>("dark")',
  'loadComponent: () => import("./home")',
  '@for (item of list; track item.id)',
  'provideRouter(routes)',
  'inject(ThemeService)',
  'gsap.from(".hero", { opacity: 0 })',
  'interface WorkingField { status: string }',
  'git commit -m "feat: add canvas bg"',
  'npm run build --configuration production',
  'docker compose up --build',
  'SELECT * FROM projects WHERE active = true',
  'const [state, setState] = signal(null)',
  'async function fetchData(): Promise<void>',
  'border: 1px solid var(--color-border)',
  'z-index: 1; position: relative;',
  'kubectl apply -f deployment.yaml',
  'export type AvailabilityStatus =',
  'withNavigationErrorHandler(() => ...)',
  'backdrop-filter: blur(12px)',
  'animation: fade-in 300ms ease forwards',
  'npx tsc --noEmit -p tsconfig.app.json',
  'return res.status(200).json({ ok: true })',
  '@Injectable({ providedIn: "root" })',
];

@Component({
  selector: 'app-bg-canvas',
  standalone: true,
  template: `<canvas #canvas class="bg-canvas" aria-hidden="true"></canvas>`,
  styles: [`
    .bg-canvas {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 0;
    }
  `]
})
export class BgCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly themeService = inject(ThemeService);
  private ctx!: CanvasRenderingContext2D;
  private animId = 0;
  private particles: Particle[] = [];
  private codeLines: CodeLine[] = [];
  private readonly MAX_DIST = 130;
  private readonly PARTICLE_COUNT = 45;
  private readonly CODE_LINE_COUNT = 12;
  private mouseX = -9999;
  private mouseY = -9999;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    this.initParticles();
    this.initCodeLines();
    this.animate();
  }

  @HostListener('window:resize')
  resize(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  private initParticles(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const types: Particle['type'][] = ['dot', 'dot', 'dot', 'cross', 'square'];
    this.particles = Array.from({ length: this.PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.5 + 0.8,
      opacity: Math.random() * 0.3 + 0.06,
      type: types[Math.floor(Math.random() * types.length)]
    }));
  }

  private initCodeLines(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.codeLines = Array.from({ length: this.CODE_LINE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.06 + 0.02,
      fontSize: Math.floor(Math.random() * 3) + 9
    }));
  }

  private animate(): void {
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.width;
    const h = canvas.height;
    const isDark = this.themeService.theme() === 'dark';
    const baseColor = isDark ? '255,255,255' : '0,0,0';

    this.ctx.clearRect(0, 0, w, h);

    // ── Draw scrolling code lines ─────────────────────────
    this.ctx.font = `${10}px 'JetBrains Mono', monospace`;
    for (const line of this.codeLines) {
      line.y -= line.speed;
      if (line.y < -20) {
        line.y = h + 20;
        line.x = Math.random() * w;
        line.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
        line.opacity = Math.random() * 0.06 + 0.02;
      }
      this.ctx.save();
      this.ctx.globalAlpha = line.opacity;
      this.ctx.fillStyle = `rgba(${baseColor},1)`;
      this.ctx.font = `${line.fontSize}px 'JetBrains Mono', monospace`;
      this.ctx.fillText(line.text, line.x, line.y);
      this.ctx.restore();
    }

    // ── Update + draw particles ───────────────────────────
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      // Mouse repulsion
      const dx = p.x - this.mouseX;
      const dy = p.y - this.mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90 && dist > 0) {
        const force = (90 - dist) / 90 * 0.012;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.0) { p.vx = (p.vx / speed) * 1.0; p.vy = (p.vy / speed) * 1.0; }
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = `rgba(${baseColor},1)`;
      this.ctx.strokeStyle = `rgba(${baseColor},1)`;
      this.ctx.lineWidth = 0.8;

      if (p.type === 'dot') {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.type === 'cross') {
        const s = p.size * 2.5;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x - s, p.y); this.ctx.lineTo(p.x + s, p.y);
        this.ctx.moveTo(p.x, p.y - s); this.ctx.lineTo(p.x, p.y + s);
        this.ctx.stroke();
      } else {
        const s = p.size * 1.8;
        this.ctx.strokeRect(p.x - s, p.y - s, s * 2, s * 2);
      }
      this.ctx.restore();
    }

    // ── Draw connections ──────────────────────────────────
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < this.MAX_DIST) {
          const alpha = (1 - d / this.MAX_DIST) * 0.10;
          this.ctx.save();
          this.ctx.globalAlpha = alpha;
          this.ctx.strokeStyle = `rgba(${baseColor},1)`;
          this.ctx.lineWidth = 0.4;
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }

    this.animId = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy(): void {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}
