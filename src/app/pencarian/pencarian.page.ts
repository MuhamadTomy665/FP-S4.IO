import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pencarian',
  templateUrl: './pencarian.page.html',
  styleUrls: ['./pencarian.page.scss'],
  standalone: false,
})
export class PencarianPage implements OnInit {
  searchTerm: string = '';
  isLoading: boolean = false;

  // Data statis (simulasi API)
  dataPoli: { nama: string; deskripsi: string }[] = [
    { nama: 'Poli Umum', deskripsi: 'Pemeriksaan umum dan konsultasi' },
    { nama: 'Poli Gigi', deskripsi: 'Perawatan gigi dan mulut' },
    { nama: 'Poli Anak', deskripsi: 'Kesehatan anak dan imunisasi' },
    { nama: 'Poli Ibu & Kandungan', deskripsi: 'Konsultasi kehamilan dan wanita' },
  ];

  dataDokter: { nama: string; spesialis: string }[] = [
    { nama: 'dr. Andi Santoso', spesialis: 'Umum' },
    { nama: 'drg. Rina Maharani', spesialis: 'Gigi' },
    { nama: 'dr. Lisa Anggraini, Sp.A', spesialis: 'Anak' },
    { nama: 'dr. Nurul Hidayati, Sp.OG', spesialis: 'Kandungan' },
  ];

  // Data yang ditampilkan
  filteredPoli: { nama: string; deskripsi: string }[] = [];
  filteredDokter: { nama: string; spesialis: string }[] = [];

  constructor() {}

  ngOnInit() {
    this.filteredPoli = [];
    this.filteredDokter = [];
  }

  onSearchChange() {
    this.isLoading = true;

    // Simulasi loading data dengan delay 500ms
    setTimeout(() => {
      const keyword = this.searchTerm.toLowerCase().trim();

      if (keyword) {
        this.filteredPoli = this.dataPoli.filter(poli =>
          poli.nama.toLowerCase().includes(keyword) || poli.deskripsi.toLowerCase().includes(keyword)
        );

        this.filteredDokter = this.dataDokter.filter(dokter =>
          dokter.nama.toLowerCase().includes(keyword) || dokter.spesialis.toLowerCase().includes(keyword)
        );
      } else {
        this.filteredPoli = [];
        this.filteredDokter = [];
      }

      this.isLoading = false;
    }, 500);
  }
}
