import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-riwayat',
  templateUrl: './riwayat.page.html',
  styleUrls: ['./riwayat.page.scss'],
  standalone: false,
})
export class RiwayatPage implements OnInit {
  riwayatList: any[] = [];

  /* --- Data untuk modal QR --- */
  selectedQR: string | null = null;
  selectedItem: any = null;
  qrNomorAntrian: string = '';      // ✅ Nomor antrian ditampung terpisah

  showModal = false;

  constructor(
    private api: ApiService,
    private toastCtrl: ToastController
  ) {}

  /* ------------------------------------------------------------
     Ambil riwayat antrian saat halaman dibuat
  ------------------------------------------------------------ */
  ngOnInit() {
    this.api.getWithAuth('/user').subscribe({
      next: (user) => {
        const pasienId = user.id;
        this.api.getRiwayatAntrian(pasienId).subscribe({
          next: (res) => {
            this.riwayatList = res.success
              ? res.data
                  .filter((i: any) => i.status !== 'dibatalkan')
                  .reverse()
              : [];
          },
          error: (err) => console.error('❌ Gagal ambil riwayat:', err)
        });
      },
      error: (err) => console.error('❌ Gagal ambil user:', err)
    });
  }

  /* ------------------------------------------------------------
     Warna badge status
  ------------------------------------------------------------ */
  getBadgeColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'selesai':   return 'success';
      case 'antri':     return 'primary';
      case 'menunggu':  return 'warning';
      case 'dipanggil': return 'tertiary';
      case 'dibatalkan':return 'danger';
      case 'terlewat':  return 'medium';
      default:          return 'medium';
    }
  }

  /* ------------------------------------------------------------
     Tampilkan QR
  ------------------------------------------------------------ */
  lihatQR(item: any) {
    const code = item.barcode_code || '';

    if (!code || typeof code !== 'string') {
      this.toastCtrl.create({
        message: 'QR Code tidak tersedia.',
        duration: 2000,
        color: 'warning'
      }).then(t => t.present());
      return;
    }

    /* Bersihkan fokus sebelum modal muncul */
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl && typeof activeEl.blur === 'function') activeEl.blur();

    /* Pastikan format data:image/png;base64 */
    this.selectedQR = code.startsWith('data:image')
      ? code
      : `data:image/png;base64,${code}`;

    this.selectedItem      = item;
    this.qrNomorAntrian    = item.nomor_antrian;   // ✅ simpan manual

    /* Delay singkat agar <img> sempat render */
    setTimeout(() => (this.showModal = true), 100);
  }

  /* ------------------------------------------------------------
     Tutup modal & reset data
  ------------------------------------------------------------ */
  closeModal() {
    this.showModal        = false;
    this.selectedQR       = null;
    this.selectedItem     = null;
    this.qrNomorAntrian   = '';      // ✅ reset
  }

  /* ------------------------------------------------------------
     Highlight item sebentar saat diketuk
  ------------------------------------------------------------ */
  selectItem(item: any) {
    this.selectedItem = item;
    setTimeout(() => (this.selectedItem = null), 1000);
  }

  /* ------------------------------------------------------------
     Batalkan antrian
  ------------------------------------------------------------ */
  batalkanAntrian(item: any, event: Event) {
    event.stopPropagation();

    if (!window.confirm(
        `Yakin ingin membatalkan antrian nomor ${item.nomor_antrian}?`)
    ) return;

    this.api.postWithAuth(`/antrian/${item.id}/batal`, {}).subscribe({
      next: () => {
        /* hapus dari list */
        this.riwayatList = this.riwayatList.filter((i: any) => i.id !== item.id);

        this.toastCtrl.create({
          message: 'Antrian berhasil dibatalkan.',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
      },
      error: () => {
        this.toastCtrl.create({
          message: 'Gagal membatalkan antrian.',
          duration: 2000,
          color: 'danger'
        }).then(t => t.present());
      }
    });
  }
}
