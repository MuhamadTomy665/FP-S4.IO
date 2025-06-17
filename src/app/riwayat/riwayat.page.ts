import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-riwayat',
  templateUrl: './riwayat.page.html',
  styleUrls: ['./riwayat.page.scss'],
  standalone: false,
})
export class RiwayatPage implements OnInit {
  riwayatList: any[] = [];

  ngOnInit() {
    const data = localStorage.getItem('riwayatAntrian');
    if (data) {
      this.riwayatList = JSON.parse(data).reverse(); // Riwayat terbaru muncul di atas
    }
  }

  ionViewDidLeave() {
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl && typeof activeEl.blur === 'function') {
      activeEl.blur();
    }
  }
}
