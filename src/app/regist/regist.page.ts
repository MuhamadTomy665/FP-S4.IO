import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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

  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {}

  ionViewDidLeave() {
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl && typeof activeEl.blur === 'function') {
      activeEl.blur();
    }
  }

  onSubmit() {
    const name = this.name.trim();
    const nik = this.nik.trim();
    const no_hp = this.no_hp.trim();
    const password = this.password;

    // Validasi kosong
    if (!name || !nik || !no_hp || !password) {
      this.errorMessage = 'Isi semua data dengan benar.';
      this.successMessage = '';
      return;
    }

    // Validasi password
    if (password.length < 6) {
      this.errorMessage = 'Password kurang dari 6 karakter.';
      this.successMessage = '';
      return;
    }

    // Validasi NIK
    if (nik.length < 16) {
      this.errorMessage = 'NIK tidak valid.';
      this.successMessage = '';
      return;
    }

    const newUser = { name, nik, no_hp, password };

    this.isLoading = true;

    this.api.register(newUser).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Registrasi berhasil!';
        this.errorMessage = '';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Terjadi kesalahan saat registrasi.';
        this.successMessage = '';
      }
    });
  }
}
