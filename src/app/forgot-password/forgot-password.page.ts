import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';           // ⬅️ NEW
import { ApiService } from '../services/api.service';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ForgotPasswordPage {
  // ──────────────────────────────── Form state
  nik             = '';
  newPassword     = '';
  confirmPassword = '';

  // ──────────────────────────────── UI state
  errorMessage   = '';
  successMessage = '';
  nikValid       = false;
  loading        = false;

  constructor(
    private api: ApiService,
    private router: Router                // ⬅️ NEW
  ) {}

  // ──────────────────────────────── Step 1: cek NIK
  checkNik() {
    if (!this.nik) {
      this.errorMessage = 'NIK wajib diisi.';
      return;
    }

    this.loading = true;
    this.api.post('/cek-nik', { nik: this.nik }).subscribe({
      next: (_res: any) => {
        this.nikValid       = true;
        this.errorMessage   = '';
        this.successMessage = 'NIK ditemukan. Silakan buat password baru.';
        this.loading        = false;
      },
      error: (err) => {
        this.errorMessage   = err.error?.message || 'NIK tidak valid';
        this.successMessage = '';
        this.loading        = false;
      },
    });
  }

  // ──────────────────────────────── Step 2: reset password
  resetPassword() {
    // Validasi dasar
    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Semua kolom password wajib diisi.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Konfirmasi password tidak cocok.';
      return;
    }

    // Request ke backend
    this.api.post('/reset-password', {
      nik: this.nik,
      password: this.newPassword,
    }).subscribe({
      next: (res: any) => {
        // Berhasil
        this.successMessage = res.message || 'Password berhasil diubah.';
        this.errorMessage   = '';

        // Bersihkan form dan state
        this.nikValid       = false;
        this.nik            = '';
        this.newPassword    = '';
        this.confirmPassword = '';

        // Redirect ke halaman login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500); // ganti 0 jika ingin langsung tanpa jeda
      },
      error: (err) => {
        // Gagal
        this.errorMessage   = err.error?.message || 'Gagal mereset password.';
        this.successMessage = '';
      }
    });
  }
}
