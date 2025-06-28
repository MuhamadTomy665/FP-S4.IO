import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NavController } from '@ionic/angular';

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

  constructor(
    private router: Router,
    private api: ApiService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  ionViewDidLeave() {
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl && typeof activeEl.blur === 'function') {
      activeEl.blur();
    }
  }

  onLogin() {
    const nikTrimmed = this.nik.trim();
    const passwordTrimmed = this.password.trim();

    if (!nikTrimmed || !passwordTrimmed) {
      this.errorMessage = 'NIK dan password wajib diisi.';
      this.successMessage = '';
      return;
    }

    const loginData = {
      nik: nikTrimmed,
      password: passwordTrimmed,
    };

    console.log('Kirim data login:', loginData); // ✅ Debug

    this.api.post('/login', loginData).subscribe({
      next: (res: any) => {
        console.log('Login berhasil:', res); // ✅ Debug

        this.successMessage = 'Login berhasil!';
        this.errorMessage = '';

        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('userData', JSON.stringify(res.data));

        this.navCtrl.navigateRoot('/tabs/home', {
          animated: true,
          animationDirection: 'forward',
        });
      },
      error: (err) => {
        console.error('Login error:', err); // ✅ Debug

        this.errorMessage = err?.error?.message || 'Login gagal. Periksa kembali NIK dan password Anda.';
        this.successMessage = '';
      },
    });
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
