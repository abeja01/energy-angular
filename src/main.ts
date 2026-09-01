import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  title: string;
  text: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app/app.html',
  styleUrls: ['./app/app.css']
})
export class AppComponent {
  mobileOpen = false;

  features: Feature[] = [
    { title: 'Layered security', text: 'Reliable systems designed to protect every critical operation.' },
    { title: 'Quality control of each part', text: 'Every component is selected and checked for performance.' },
    { title: 'Reliable customer service', text: 'A technical team ready to support you when you need it.' },
    { title: 'Maintenance plans', text: 'Preventive maintenance that keeps your systems working.' },
    { title: 'Verified safety', text: 'Processes designed around safety and long-term reliability.' },
    { title: 'Based on efficient technologies', text: 'Modern solutions that reduce waste and improve results.' }
  ];

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.mobileOpen = false;
  }
}

bootstrapApplication(AppComponent).catch(err => console.error(err));