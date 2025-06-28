import { Component, OnInit } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  userName: string = 'Pasien';
  sapaan: string = '';

  constructor(private toastController: ToastController) {}

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = userData?.name || 'Pasien';

    const hour = new Date().getHours();
    if (hour < 12) this.sapaan = 'Selamat Pagi';
    else if (hour < 18) this.sapaan = 'Selamat Siang';
    else this.sapaan = 'Selamat Malam';

    this.listenToPanggilan(userData?.id);
  }

  listenToPanggilan(pasienId: number) {
    if (!pasienId) return;

    // @ts-ignore
    window.Pusher = Pusher;

    // @ts-ignore
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: 'e848914deeea58639b29',
      cluster: 'mt1',
      forceTLS: true,
    });

    window.Echo.channel('antrian')
      .listen('PanggilAntrianEvent', async (e: any) => {
        if (e.antrian && e.antrian.pasien_id === pasienId) {
          this.showToast(`📣 Antrian Anda (${e.antrian.nomor_antrian}) sedang dipanggil!`, 'primary');
        }
      });
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'top',
      color,
    });
    await toast.present();
  }
}

