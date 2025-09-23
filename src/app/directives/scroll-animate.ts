// scroll-animate.directive.ts
import { Directive, ElementRef, Input, OnInit, OnDestroy, input, inject } from '@angular/core';

@Directive({
  selector: '[scrollAnimate]',
  standalone: true
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  scrollAnimate = input<string>('fade-up');
  animationDelay = input<number>(0);
  el = inject(ElementRef<HTMLElement>);

  private observer!: IntersectionObserver;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.setupAnimation();
      }, 100);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupAnimation() {
    const element = this.el.nativeElement;

    // Set initial state
    element.style.opacity = '0';
    element.style.transform = this.getInitialTransform();
    element.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    element.style.transitionDelay = `${this.animationDelay()}ms`;

    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target as HTMLElement);
            this.observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    this.observer.observe(element);
  }

  private getInitialTransform(): string {
    switch (this.scrollAnimate()) {
      case 'fade-up': return 'translateY(60px)';
      case 'fade-down': return 'translateY(-60px)';
      case 'fade-left': return 'translateX(-60px)';
      case 'fade-right': return 'translateX(60px)';
      case 'scale-up': return 'scale(0.8)';
      case 'rotate-in': return 'rotate(-10deg) scale(0.8)';
      case 'slide-up': return 'translateY(100px)';
      case 'slide-left': return 'translateX(-100px)';
      case 'slide-right': return 'translateX(100px)';
      default: return 'translateY(60px)';
    }
  }

  private animateElement(element: HTMLElement) {
    // Apply the animated state
    element.style.opacity = '1';
    element.style.transform = this.getFinalTransform();
    
    // Add a class for additional styling if needed
    element.classList.add('animated', `animated-${this.scrollAnimate()}`);
  }

  private getFinalTransform(): string {
    switch (this.scrollAnimate()) {
      case 'rotate-in': return 'rotate(0deg) scale(1)';
      case 'scale-up': return 'scale(1)';
      default: return 'translateX(0) translateY(0)';
    }
  }
}