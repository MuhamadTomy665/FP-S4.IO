import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  userName: string = 'Pasien';
  sapaan: string = '';

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userName = userData?.name || 'Pasien';

    const hour = new Date().getHours();
    if (hour < 12) this.sapaan = 'Selamat Pagi';
    else if (hour < 18) this.sapaan = 'Selamat Siang';
    else this.sapaan = 'Selamat Malam';
  }
}
