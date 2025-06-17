import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  nik = '';
  password = '';
  showPassword = false;
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {}

  ionViewDidLeave() {
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl && typeof activeEl.blur === 'function') {
      activeEl.blur();
    }
  }

  onLogin() {
    if (!this.nik || !this.password) {
      this.errorMessage = 'NIK dan password wajib diisi.';
      this.successMessage = '';
      return;
    }

    const loginData = {
      nik: this.nik,
      password: this.password,
    };

    this.api.post('/login', loginData).subscribe({
      next: (res: any) => {
        // Tidak perlu cek role jika tidak ada
        this.successMessage = 'Login berhasil!';
        this.errorMessage = '';

        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('user', JSON.stringify(res.data)); // bukan res.user

        setTimeout(() => {
          this.router.navigate(['/tabs']);
        }, 300);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login gagal';
        this.successMessage = '';
      },
    });
  }
}
