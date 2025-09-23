import { Component } from '@angular/core';
import { ContactMethod } from '../models/contactForm';
import { ScrollAnimateDirective } from '../directives/scroll-animate';
@Component({
  selector: 'app-contact',
  imports: [ScrollAnimateDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactMethods: ContactMethod[] = [
    {
      id: '1',
      title: 'Email',
      value: 'antoinemor123@gmail.com',
      url: 'mailto:antoinemor123@gmail.com',
      icon: '📧',
    },
    {
      id: '2',
      title: 'LinkedIn',
      value: 'linkedin.com/in/antmor1',
      url: 'https://linkedin.com/in/antmor1',
      icon: '💼',
    },
    {
      id: '3',
      title: 'GitHub',
      value: 'github.com/Ant1-dev',
      url: 'https://github.com/Ant1-dev',
      icon: '🐙',
    },
  ];
}
