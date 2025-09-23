import { Component, signal } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { Hero } from "./hero/hero";
import { Projects } from "./projects/projects";
import { Skills } from "./skills/skills";
import { Contact } from "./contact/contact";
import { BackgroundComponent } from "./background-component/background-component";

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, Projects, Skills, Contact, BackgroundComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
}
