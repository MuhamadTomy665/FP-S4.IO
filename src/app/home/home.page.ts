import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  searchTerm: string = '';
  filteredServices: any[] = [];
  greeting: string = '';
  userName: string = 'Pasien';

  services = [
    {
      title: 'Daftar Poli',
      subtitle: 'Lihat dan pilih poli yang tersedia',
      icon: 'medkit-outline',
      color: 'light-blue',
      route: '/daftar-poli'
    },
    {
      title: 'Daftar Dokter',
      subtitle: 'Lihat dokter yang bertugas',
      icon: 'people-outline',
      color: 'light-yellow',
      route: '/daftar-dokter'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredServices = this.services;

    const hour = new Date().getHours();
    if (hour < 12) this.greeting = 'Selamat pagi 👋';
    else if (hour < 18) this.greeting = 'Selamat siang 👋';
    else this.greeting = 'Selamat malam 🌙';

    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userName = user.name || 'Pasien';
  }

  ionViewDidLeave() {
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl && typeof activeEl.blur === 'function') {
      activeEl.blur();
    }
  }
  
  filterServices() {
    const keyword = this.searchTerm.toLowerCase();
    this.filteredServices = this.services.filter(service =>
      service.title.toLowerCase().includes(keyword)
    );
  }

  goToDetail(route: string) {
    this.router.navigate([route]);
  }

  startAntrian() {
    this.router.navigate(['/beranda']); // Langsung ke beranda karena user sudah login
  }

  goToRiwayat() {
    this.router.navigate(['/riwayat']);
  }
}
