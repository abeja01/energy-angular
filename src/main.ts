import { bootstrapApplication } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface Stat {
  id: number;
  label: string;
  value: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  comment: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './app/app.html',
  styleUrls: ['./app/app.css']
})
export class AppComponent implements OnInit {
  mobileOpen = false;
  API = 'http://localhost:3000/api';

  features: Feature[] = [];
  stats: Stat[] = [];
  testimonials: Testimonial[] = [];

  contact = { name: '', email: '', message: '' };
  contactSent = false;
  contactError = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Feature[]>(`${this.API}/services`).subscribe({
      next: data => this.features = data,
      error: err => console.error('Error cargando servicios:', err)
    });

    this.http.get<Stat[]>(`${this.API}/stats`).subscribe({
      next: data => this.stats = data,
      error: err => console.error('Error cargando stats:', err)
    });

    this.http.get<Testimonial[]>(`${this.API}/testimonials`).subscribe({
      next: data => this.testimonials = data,
      error: err => console.error('Error cargando testimonios:', err)
    });
  }

  sendContact() {
    this.contactSent = false;
    this.contactError = false;
    this.http.post(`${this.API}/contact`, this.contact).subscribe({
      next: () => {
        this.contactSent = true;
        this.contact = { name: '', email: '', message: '' };
      },
      error: () => this.contactError = true
    });
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.mobileOpen = false;
  }
}

bootstrapApplication(AppComponent).catch(err => console.error(err));