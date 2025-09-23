import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Particle } from '../models/particle';

@Component({
  selector: 'app-background-component',
  imports: [],
  templateUrl: './background-component.html',
  styleUrl: './background-component.css',
})
export class BackgroundComponent implements OnInit, OnDestroy {
   @ViewChild('particleCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId!: number;
  private resizeObserver!: ResizeObserver;

  // Signals for reactive updates
  canvasWidth = signal(0);
  canvasHeight = signal(0);
  scrollProgress = signal(0);

  // Particle settings
  private readonly PARTICLE_COUNT = 50;
  private readonly PARTICLE_COLORS = [
    'rgba(0, 255, 255, ',
    'rgba(255, 0, 255, ',
    'rgba(255, 255, 255, '
  ];

  ngOnInit() {
    // Better browser detection for Vercel deployment
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Add a small delay to ensure DOM is fully ready
      setTimeout(() => {
        this.initCanvas();
        this.createParticles();
        this.startAnimation();
        this.setupEventListeners();
      }, 200);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    // Set initial canvas size
    this.updateCanvasSize();
  }

  private updateCanvasSize() {
    const canvas = this.canvasRef.nativeElement;
    
    // Get actual window dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Set canvas display size (CSS)
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    // Set actual canvas buffer size
    canvas.width = width;
    canvas.height = height;
    
    // Get a fresh context after resize
    this.ctx = canvas.getContext('2d')!;
    
    // Update signals
    this.canvasWidth.set(width);
    this.canvasHeight.set(height);
  }

  private createParticles() {
    this.particles = [];
    
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): Particle {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5, // Gentle floating movement
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 2 + 1,
      opacity: 0, // Start invisible
      life: Math.random() * 0.5 + 0.5 // Random lifespan
    };
  }

  private updateParticles() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    this.particles.forEach((particle, index) => {
      // Gentle floating movement
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Keep particles within screen bounds with gentle bounce
      if (particle.x < 0 || particle.x > width) {
        particle.vx *= -1;
        particle.x = Math.max(0, Math.min(width, particle.x));
      }
      if (particle.y < 0 || particle.y > height) {
        particle.vy *= -1;
        particle.y = Math.max(0, Math.min(height, particle.y));
      }
      
      // Fade in and out effect
      if (particle.life > 0.7) {
        // Fade in phase
        particle.opacity = (1 - particle.life) / 0.3 * 0.6;
      } else if (particle.life < 0.3) {
        // Fade out phase
        particle.opacity = particle.life / 0.3 * 0.6;
      } else {
        // Fully visible phase
        particle.opacity = 0.6;
      }
      
      // Decrease life
      particle.life -= 0.003;
      
      // Reset particle when it dies
      if (particle.life <= 0) {
        this.particles[index] = this.createParticle();
      }
    });
  }

  private drawParticles() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    this.ctx.clearRect(0, 0, width, height);
    
    this.particles.forEach(particle => {
      if (particle.opacity > 0.01) { // Only draw visible particles
        this.ctx.save();
        
        // Set particle style
        const colorIndex = Math.floor(Math.random() * this.PARTICLE_COLORS.length);
        const color = this.PARTICLE_COLORS[colorIndex];
        this.ctx.fillStyle = color + particle.opacity + ')';
        
        // Draw particle
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Add subtle glow effect
        this.ctx.shadowColor = color + (particle.opacity * 0.8) + ')';
        this.ctx.shadowBlur = 8;
        this.ctx.fill();
        
        this.ctx.restore();
      }
    });
  }

  private animate = () => {
    this.updateParticles();
    this.drawParticles();
    this.animationId = requestAnimationFrame(this.animate);
  }

  private startAnimation() {
    this.animate();
  }

  private regenerateParticles() {
    // On resize, redistribute particles proportionally across the new screen size
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Completely recreate all particles with new positions
    this.particles = [];
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private setupEventListeners() {
    // Handle window resize with debouncing
    let resizeTimeout: any;
    this.resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.updateCanvasSize();
        this.regenerateParticles();
      }, 100); // Debounce resize events
    });
    this.resizeObserver.observe(document.body);

    // Handle scroll for progress indicator
    window.addEventListener('scroll', this.onScroll);
  }

  private onScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    this.scrollProgress.set(Math.min(Math.max(scrolled, 0), 100));
  }
}
