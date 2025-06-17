import { Component, OnInit } from '@angular/core';

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
      this.nomorAntrian = '#' + antrianData.nomor_antrian;
      this.barcode = barcodeData;
      this.kode = kodeAntrian;
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
