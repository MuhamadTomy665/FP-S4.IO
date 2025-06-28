import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-regist',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './regist.page.html',
  styleUrls: ['./regist.page.scss'],
})
export class RegistPage implements OnInit {
  name = '';
  nik = '';
  no_hp = '';
  password = '';
  showPassword = false;

  isLoading: boolean = false; // ⬅️ Tambahkan ini

  constructor(
    private router: Router,
    private api: ApiService,
    private loader: LoadingController,
    private toast: ToastController
  ) {}


  ngOnInit() {}

  ionViewDidLeave() {
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl && typeof activeEl.blur === 'function') {
      activeEl.blur();
    }
  }

  async onSubmit() {
    const payload = {
      name: this.name.trim(),
      nik: this.nik.trim(),
      no_hp: this.no_hp.trim(),
      password: this.password.trim(),
    };

    // Validasi input
    if (!payload.name || !payload.nik || !payload.no_hp || !payload.password) {
      return this.showToast('Isi semua data dengan benar.', 'danger');
    }

    if (payload.nik.length !== 16 || !/^\d{16}$/.test(payload.nik)) {
      return this.showToast('NIK harus terdiri dari 16 digit angka.', 'danger');
    }

    if (payload.password.length < 6) {
      return this.showToast('Password minimal 6 karakter.', 'danger');
    }

    const loading = await this.loader.create({ message: 'Mendaftarkan akun...' });
    await loading.present();

    this.api.register(payload).subscribe({
      next: async () => {
        await loading.dismiss();
        this.showToast('Registrasi berhasil! Silakan login.', 'success');
        this.router.navigate(['/login']);
      },
      error: async (err) => {
        await loading.dismiss();
        const msg = err?.error?.message || 'Terjadi kesalahan saat registrasi.';
        this.showToast(msg, 'danger');
      },
    });
  }

  private async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toast.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    await toast.present();
  }
}
