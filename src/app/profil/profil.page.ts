import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: false,
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
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
  noHp = '';
  foto: string | null = '';

  editing = false;

  // Password section
  passwordLama = '';
  passwordBaru = '';
  konfirmasiPassword = '';
  showPasswordLama = false;
  showPasswordBaru = false;
  showPasswordKonfirmasi = false;

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    const data = JSON.parse(localStorage.getItem('userData') || '{}');
    this.nama = data.name || '';
    this.nik = data.nik || '';
    this.noHp = data.no_hp || '';
    this.foto = data.foto || null;
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  simpanPerubahan() {
    const data = {
      name: this.nama,
      nik: this.nik,
      no_hp: this.noHp,
      password: JSON.parse(localStorage.getItem('userData') || '{}').password,
      foto: this.foto
    };

    localStorage.setItem('userData', JSON.stringify(data));
    this.showToast('Perubahan disimpan.', 'success');
    this.editing = false;
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

  gantiPassword() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!this.passwordLama || !this.passwordBaru || !this.konfirmasiPassword) {
      this.showToast('Semua kolom harus diisi.', 'danger');
      return;
    }

    if (this.passwordLama !== userData.password) {
      this.showToast('Password lama salah.', 'danger');
      return;
    }

    if (this.passwordBaru !== this.konfirmasiPassword) {
      this.showToast('Password baru dan konfirmasi tidak cocok.', 'danger');
      return;
    }

    if (this.passwordBaru.length < 6) {
      this.showToast('Password baru minimal 6 karakter.', 'danger');
      return;
    }

    userData.password = this.passwordBaru;
    localStorage.setItem('userData', JSON.stringify(userData));

    this.passwordLama = '';
    this.passwordBaru = '';
    this.konfirmasiPassword = '';

    this.showToast('Password berhasil diubah.', 'success');
  }

  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
    this.showToast('Berhasil logout.', 'success');
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    toast.present();
  }
}
