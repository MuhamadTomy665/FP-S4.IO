import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-antrian',
  templateUrl: './antrian.page.html',
  styleUrls: ['./antrian.page.scss'],
  standalone: false,
})
export class AntrianPage implements OnInit {
  nomorAntrian = '';
  nama = '';
  poli = '';
  tanggal = '';
  jam = '';
  kode = '';
  barcode = '';

  toastOpen = false; // 🔔 untuk menampilkan notifikasi

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const antrianData = JSON.parse(localStorage.getItem('antrian') || '{}');
    const barcodeData = localStorage.getItem('barcode') || '';
    const kodeAntrian = localStorage.getItem('kode_antrian') || '';

    if (antrianData && antrianData.nomor_antrian) {
      this.nama = user.name || 'Pasien';
      this.poli = antrianData.poli;
      this.tanggal = this.formatTanggal(antrianData.tanggal);
      this.jam = antrianData.jam;
      this.nomorAntrian = antrianData.nomor_antrian;
      this.barcode = barcodeData;
      this.kode = kodeAntrian;

      const pusher = new Pusher('e848914deeea58639b29', {
        cluster: 'mt1',
      });

      const channel = pusher.subscribe('antrian-channel');
      channel.bind('PasienDipanggil', (event: any) => {
        if (event.antrian.nomor_antrian === this.nomorAntrian) {
          this.toastOpen = true; // 🔔 tampilkan notifikasi
        }
      });
    }
  }

  formatTanggal(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  ionViewDidLeave() {
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl && typeof activeEl.blur === 'function') {
      activeEl.blur();
    }
  }
}
