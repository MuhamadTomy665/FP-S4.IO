import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-barcode',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
})
export class BarcodePage implements OnInit {
  kode: string = '';
  barcodeImage: string = '';
  antrian: any = null; // 🆕 Menyimpan data antrian lengkap, termasuk nomor_antrian

  constructor(private api: ApiService) {}

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');

    if (!userData.id) {
      console.error('User belum login.');
      return;
    }

    this.api.get(`/antrian/terakhir/${userData.id}`).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.kode = res.kode;
          this.barcodeImage = res.barcode_image;
          this.antrian = res.data; // 🆕 Menyimpan detail antrian ke komponen
        } else {
          console.warn('Antrian tidak ditemukan.');
        }
      },
      error: (err) => {
        console.error('Gagal ambil data antrian:', err);
      },
    });
  }
}
