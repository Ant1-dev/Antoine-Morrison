import { Component } from '@angular/core';
import { TypewriterDirective } from '../directives/typewriter';
import { ScrollAnimateDirective } from '../directives/scroll-animate';

@Component({
  selector: 'app-hero',
  imports: [TypewriterDirective, ScrollAnimateDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {

}
