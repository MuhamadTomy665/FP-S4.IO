import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-riwayat',
  templateUrl: './riwayat.page.html',
  styleUrls: ['./riwayat.page.scss'],
  standalone: false,
})
export class RiwayatPage implements OnInit {
  riwayatList: any[] = [];

  // ✅ Modal QR
  selectedQR: string | null = null;
  showModal = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getWithAuth('/user').subscribe({
      next: (user) => {
        const pasienId = user.id;
        this.api.getRiwayatAntrian(pasienId).subscribe({
          next: (res) => {
            this.riwayatList = res.success ? res.data.reverse() : [];
          },
          error: (err) => console.error('Gagal ambil riwayat:', err)
        });
      },
      error: (err) => console.error('Gagal ambil user dari token:', err)
    });
  }

  getBadgeColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'selesai': return 'success';
      case 'antri': return 'primary';
      case 'menunggu': return 'warning';
      case 'dipanggil': return 'tertiary';
      default: return 'medium';
    }
  }

  lihatQR(item: any) {
    this.selectedQR = item.barcode_code?.startsWith('data:image')
      ? item.barcode_code
      : `data:image/png;base64,${item.barcode_code}`;
    this.showModal = true;
  }

  ionViewDidLeave() {
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl && typeof activeEl.blur === 'function') {
      activeEl.blur();
    }
  }
}
