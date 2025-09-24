import { Component } from '@angular/core';
import { Project } from '../models/project';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScrollAnimateDirective } from '../directives/scroll-animate';

@Component({
  selector: 'app-projects',
  imports: [ScrollAnimateDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  projects: Project[] = [
    {
      id: '1',
      title: 'Anime Live Countdown',
      description:
        'A full-stack application that shows the time remaining till a new seasonal anime episode drops as well as showing any shows that have future confirmed dates.',
      techStack: ['Angular', 'PostgreSQL', 'Spring Boot', 'Java', 'AWS EC2', 'Docker'],
      liveUrl: 'https://animelivecountdown.com',
      imageUrl: '/animeDemo.png',
      githubUrl: 'https://github.com/Ant1-dev/AnimeLiveCountdown',
    },
    {
      id: '2',
      title: 'Medical Image Viewer',
      description:
        'Desktop application that allows users to view and manipulate medical images in DICOM format with various tools and filters.',
      techStack: ['Qt', 'C++', 'CMake', 'GDCM'],
      imageUrl: '/medDemo.gif',
      githubUrl: 'https://github.com/Ant1-dev/Medical-Image-Viewer',
    },
    {
      id: '3',
      title: 'Code Zone',
      description:
        'Keep track of your leetcode progress with this MERN stack application that allows users to log and manage coding problems they have solved.',
      techStack: ['React', 'MongoDB', 'Express', 'Node.js'],
      imageUrl: '/codeDemo.png',
      githubUrl: 'https://github.com/Erickferpinedo/Code-Zone',
    },
  ];

  constructor(private sanitizer: DomSanitizer) {}

  public getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
