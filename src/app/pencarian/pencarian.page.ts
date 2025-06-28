import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pencarian',
  templateUrl: './pencarian.page.html',
  styleUrls: ['./pencarian.page.scss'],
  standalone: false,

})
export class PencarianPage implements OnInit {
  searchTerm: string = '';
  isLoading: boolean = false;

  filteredPoli: {
    nama: string;
    dokter: string;
    hari: string;
    jam_mulai: string;
    jam_selesai: string;
  }[] = [];

  filteredDokter: any[] = []; // Kalau nanti backend sudah support dokter

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.filteredPoli = [];
    this.filteredDokter = [];
  }

  onSearchChange() {
    const keyword = this.searchTerm.trim();

    if (!keyword) {
      this.filteredPoli = [];
      this.filteredDokter = [];
      return;
    }

    this.isLoading = true;

    this.api.get(`/pencarian?q=${encodeURIComponent(keyword)}`).subscribe({
      next: (res) => {
        this.filteredPoli = res.poli || [];
        this.filteredDokter = res.dokter || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Gagal ambil data pencarian:', err);
        this.isLoading = false;
      }
    });
  }
}
