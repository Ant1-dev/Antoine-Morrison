import { Component } from '@angular/core';
import { Skill } from '../models/skill';
import { ScrollAnimateDirective } from '../directives/scroll-animate';

@Component({
  selector: 'app-skills',
  imports: [ScrollAnimateDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills {
  skills: Skill[] = [
  {
    id: '1',
    title: 'Frontend Development',
    icon: '⚛️',
    technologies: ['React', 'Angular', 'JavaScript/TypeScript', 'HTML/CSS']
  },
  {
    id: '2',
    title: 'Backend Development',
    icon: '🚀',
    technologies: ['Node.js', 'Spring Boot', 'Express', 'PostgreSQL', 'MongoDB', "SQL"]
  },
  {
    id: '3',
    title: 'Cloud',
    icon: '☁️',
    technologies: ['AWS', 'Docker', 'Git/Github']
  },
];
}
