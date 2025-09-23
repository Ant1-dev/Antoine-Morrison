// typewriter.directive.ts
import { Directive, ElementRef, OnInit, OnDestroy, input, inject } from '@angular/core';

@Directive({
  selector: '[typewriter]',
  standalone: true
})
export class TypewriterDirective implements OnInit, OnDestroy {
  typewriter = input<string>();
  typewriterSpeed = input<number>(100);
  typewriterDelay = input<number>(0);
  typewriterCursor = input<boolean>(true);
  el = inject(ElementRef<HTMLElement>);

  private timeouts: any[] = [];

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.startTypewriting();
    }
  }

  ngOnDestroy() {
    // Clear all timeouts
    this.timeouts.forEach(timeout => clearTimeout(timeout));
  }

  private startTypewriting() {
    const element = this.el.nativeElement;
    const text = this.typewriter() || element.textContent || '';
    
    // Clear initial text
    element.textContent = '';
    
    // Add cursor if enabled
    if (this.typewriterCursor()) {
      element.classList.add('typewriter-cursor');
    }

    // Start typing after delay
    const startTimeout = setTimeout(() => {
      this.typeText(element, text);
    }, this.typewriterDelay());
    
    this.timeouts.push(startTimeout);
  }

  private typeText(element: HTMLElement, text: string) {
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < text!.length) {
        element.textContent = text!.substring(0, currentIndex + 1);
        currentIndex++;
        
        const timeout = setTimeout(typeNextChar, this.typewriterSpeed());
        this.timeouts.push(timeout);
      } else {
        // Typing complete - remove cursor after a delay
        if (this.typewriterCursor()) {
          const cursorTimeout = setTimeout(() => {
            element.classList.remove('typewriter-cursor');
          }, 1000);
          this.timeouts.push(cursorTimeout);
        }
      }
    };

    typeNextChar();
  }
}