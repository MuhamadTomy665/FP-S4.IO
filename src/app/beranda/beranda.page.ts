import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonAccordionGroup, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-beranda',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './beranda.page.html',
  styleUrls: ['./beranda.page.scss'],
})
export class BerandaPage implements OnInit {
  @ViewChild('accordionGroup', { static: false }) accordionGroup!: IonAccordionGroup;

  poliList: { id: number; nama_poli: string; hari: string; jam_mulai: string; jam_selesai: string }[] = [];

  timeList: string[] = [];

  selectedPoli: number | null = null;
  selectedDate = '';
  selectedTime = '';
  minDate: string = '';

  allowedDays: string[] = [];

  jamMulai: string = '';
  jamSelesai: string = '';

  kuotaPerJamList: { jam: string; penuh: boolean; kuota?: number; terisi?: number; tersisa?: number }[] = [];

  constructor(
    private toastController: ToastController,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.loadPoli();
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.listenToAntrianDipanggil();
  }

  listenToAntrianDipanggil() {
    const pusher = new Pusher('e848914deeea58639b29', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('antrian-channel');

    channel.bind('antrian-dipanggil', (data: any) => {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const pasienId = userData?.id;

      if (data?.antrian?.pasien_id === pasienId) {
        this.showToast('📢 Antrian Anda sedang dipanggil. Silakan menuju ruang periksa.', 'primary');
      }
    });
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
    const selected = this.poliList.find(p => p.id === this.selectedPoli);
    if (selected) {
      this.allowedDays = this.expandHariRange(selected.hari); // 👈 perubahan disini
      this.jamMulai = selected.jam_mulai;
      this.jamSelesai = selected.jam_selesai;
      this.generateTimeList();
      this.accordionGroup.value = 'tanggal';
      this.loadKuotaPerJam();
    }
  }

  expandHariRange(hariString: string): string[] {
    const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
    const parts = hariString.toLowerCase().split(',');
    const result: string[] = [];

    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(h => h.trim());
        const startIndex = days.indexOf(start);
        const endIndex = days.indexOf(end);

        if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {
          for (let i = startIndex; i <= endIndex; i++) {
            result.push(days[i]);
          }
        }
      } else {
        const trimmed = part.trim();
        if (days.includes(trimmed)) {
          result.push(trimmed);
        }
      }
    }

    return result;
  }

  onDateSelected() {
    if (this.selectedDate) {
      this.accordionGroup.value = 'jam';
      this.loadKuotaPerJam();
    }
  }

  loadKuotaPerJam() {
    if (!this.selectedPoli || !this.selectedDate) {
      this.kuotaPerJamList = [];
      return;
    }

    const tanggalFormatted = this.formatTanggal(this.selectedDate);
    this.api.get(`/antrian/kuota?poli=${this.selectedPoli}&tanggal=${tanggalFormatted}`).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.kuotaPerJamList = res.data || [];
        } else {
          this.kuotaPerJamList = [];
          this.showToast('Gagal mengambil data kuota.', 'danger');
        }
      },
      error: (err) => {
        console.error('Gagal ambil kuota per jam:', err);
        this.kuotaPerJamList = [];
        this.showToast('Terjadi kesalahan saat mengambil kuota.', 'danger');
      }
    });
  }

  private formatTanggal(dateStr: string): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  isDateAllowed = (dateIsoString: string): boolean => {
    if (!this.allowedDays.length) return false;

    const date = new Date(dateIsoString);
    const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
    const dayName = days[date.getDay()];
    return this.allowedDays.includes(dayName);
  };

  generateTimeList() {
    if (!this.jamMulai || !this.jamSelesai) {
      this.timeList = [];
      return;
    }

    const [startHour, startMin] = this.jamMulai.split(':').map(Number);
    const [endHour, endMin] = this.jamSelesai.split(':').map(Number);

    const start = new Date();
    start.setHours(startHour, startMin, 0, 0);

    const end = new Date();
    end.setHours(endHour, endMin, 0, 0);

    const list: string[] = [];

    while (start <= end) {
      list.push(start.toTimeString().slice(0, 5));
      start.setMinutes(start.getMinutes() + 60);
    }

    this.timeList = list;
  }

  isTimeDisabled(jam: string): boolean {
    if (!this.selectedDate) return false;

    const selected = new Date(this.selectedDate);
    const now = new Date();

    const isToday =
      selected.getFullYear() === now.getFullYear() &&
      selected.getMonth() === now.getMonth() &&
      selected.getDate() === now.getDate();

    if (isToday) {
      const [hour, minute] = jam.split(':').map(Number);
      const jamDate = new Date(selected);
      jamDate.setHours(hour, minute, 0, 0);

      if (jamDate.getTime() < now.getTime()) {
        return true;
      }
    }

    const kuotaJam = this.kuotaPerJamList.find(k => k.jam === jam);
    if (kuotaJam && kuotaJam.penuh) return true;

    return false;
  }

  getJamButtonColor(jam: string): string {
    const kuotaJam = this.kuotaPerJamList.find(k => k.jam === jam);
    if (kuotaJam && kuotaJam.penuh) return 'danger';
    if (this.selectedTime === jam) return 'success';
    return 'outline';
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

    this.api.post('/antrian', dataAntrian).subscribe({
      next: (res: any) => {
        this.showToast('✅ Antrian berhasil disimpan ke server!', 'success');
        localStorage.setItem('barcode', res.barcode_image || '');
        localStorage.setItem('kode_antrian', res.kode || '');
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
