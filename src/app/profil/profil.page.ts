import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { ApiService } from '../services/api.service'; // pastikan ada file ini

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: false,
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
      ])
    ])
  ]
})
export class ProfilPage implements OnInit {
  nama = '';
  nik = '';
  foto: string | null = null;
  defaultFoto = 'assets/default-profile.png';

  constructor(
    private router: Router,
    private api: ApiService // service untuk HTTP request
  ) {}

  ngOnInit() {
    this.api.getWithAuth('/user').subscribe({
      next: (user: any) => {
        this.nama = user.name || '';
        this.nik = user.nik || '';
        this.foto = user.foto || null;
      },
      error: (err) => {
        console.error('Gagal ambil data user:', err);
        this.router.navigate(['/login']);
      }
    });
  }

  onFotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.foto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  logout() {
    this.api.postWithAuth('/logout', {}).subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }
}
