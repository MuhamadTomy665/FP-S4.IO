import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-daftar-poli',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './daftar-poli.page.html',
  styleUrls: ['./daftar-poli.page.scss'],
})
export class DaftarPoliPage implements OnInit {
  poliList: any[] = [];
  selectedPoli: any = null;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.api.get('/poli').subscribe({
      next: (res) => this.poliList = res,
      error: (err) => console.error('Gagal load poli', err)
    });
  }

  lihatDetail(id: number) {
    this.api.get(`/poli/${id}`).subscribe({
      next: (res) => this.selectedPoli = res.data,
      error: (err) => console.error('Gagal ambil detail', err)
    });
  }

  kembaliKeList() {
    this.selectedPoli = null;
  }

  daftarAntrian() {
    // Navigasi ke halaman beranda
    this.router.navigate(['/beranda']);
  }
}
