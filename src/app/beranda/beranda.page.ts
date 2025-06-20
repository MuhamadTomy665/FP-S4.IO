import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonAccordionGroup, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-beranda',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './beranda.page.html',
  styleUrls: ['./beranda.page.scss'],
})
export class BerandaPage implements OnInit {
  @ViewChild('accordionGroup', { static: false }) accordionGroup!: IonAccordionGroup;

  poliList: { id: number; nama_poli: string }[] = [];

  // ✅ Jam diperluas sampai 21:00
  timeList: string[] = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00'
  ];

  selectedPoli: number | null = null;
  selectedDate = '';
  selectedTime = '';

  minDate: string = '';

  constructor(
    private toastController: ToastController,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.loadPoli();
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  loadPoli() {
    this.api.get('/poli').subscribe({
      next: (res: any) => {
        this.poliList = res;
      },
      error: (err) => {
        console.error('Gagal ambil data poli:', err);
        this.showToast('❌ Gagal memuat data poli', 'danger');
      }
    });
  }

  onPoliSelected() {
    if (this.selectedPoli) {
      this.accordionGroup.value = 'tanggal';
    }
  }

  onDateSelected() {
    if (this.selectedDate) {
      this.accordionGroup.value = 'jam';
    }
  }

  private formatTanggal(dateStr: string): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // ✅ Cek apakah jam sudah lewat
  isTimeDisabled(jam: string): boolean {
    if (!this.selectedDate) return false;

    const selected = new Date(this.selectedDate);
    const now = new Date();

    const isToday =
      selected.getFullYear() === now.getFullYear() &&
      selected.getMonth() === now.getMonth() &&
      selected.getDate() === now.getDate();

    if (!isToday) return false;

    const [hour, minute] = jam.split(':').map(Number);
    const jamDate = new Date(selected);
    jamDate.setHours(hour, minute, 0, 0);

    return jamDate.getTime() < now.getTime();
  }

  ambilAntrian() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');

    if (!this.selectedPoli || !this.selectedDate || !this.selectedTime) {
      this.showToast('❗ Lengkapi semua data terlebih dahulu.', 'danger');
      return;
    }

    if (new Date(this.selectedDate) < new Date(this.minDate)) {
      this.showToast('❗ Tanggal tidak boleh sebelum hari ini.', 'danger');
      return;
    }

    if (!userData.id) {
      this.showToast('❗ Pengguna belum login.', 'danger');
      return;
    }

    const selectedPoliObj = this.poliList.find(p => p.id === this.selectedPoli);
    if (!selectedPoliObj) {
      this.showToast('❗ Poli tidak ditemukan.', 'danger');
      return;
    }

    const dataAntrian = {
      pasien_id: userData.id,
      poli: selectedPoliObj.nama_poli,
      tanggal: this.formatTanggal(this.selectedDate),
      jam: this.selectedTime,
    };

    console.log('Data antrian yang dikirim:', dataAntrian);

    this.api.post('/antrian', dataAntrian).subscribe({
      next: (res: any) => {
        this.showToast('✅ Antrian berhasil disimpan ke server!', 'success');
        localStorage.setItem('barcode', res.barcode);
        localStorage.setItem('kode_antrian', res.kode);
        localStorage.setItem('antrian', JSON.stringify(res.data));
        setTimeout(() => this.router.navigate(['/barcode']), 1000);
      },
      error: (err) => {
        const pesan = err?.error?.message || '❌ Gagal menyimpan antrian!';
        this.showToast(pesan, 'danger');
        console.error('Error saat kirim antrian:', err);
      },
    });
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1600,
      color,
      position: 'top'
    });
    await toast.present();
  }

  ionViewDidLeave() {
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl && typeof activeEl.blur === 'function') {
      activeEl.blur();
    }
  }
}
