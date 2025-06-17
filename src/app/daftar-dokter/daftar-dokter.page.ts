import { Component } from '@angular/core';

@Component({
  selector: 'app-daftar-dokter',
  templateUrl: './daftar-dokter.page.html',
  styleUrls: ['./daftar-dokter.page.scss'],
  standalone: false,
})
export class DaftarDokterPage {
  dokterList = [
    {
      nama: 'dr. Andi Santoso',
      spesialis: 'Umum',
      jadwal: 'Senin - Jumat, 08.00 - 12.00'
    },
    {
      nama: 'drg. Rina Maharani',
      spesialis: 'Gigi',
      jadwal: 'Senin, Rabu, Jumat, 09.00 - 13.00'
    },
    {
      nama: 'dr. Lisa Anggraini, Sp.A',
      spesialis: 'Anak',
      jadwal: 'Selasa & Kamis, 10.00 - 14.00'
    }
  ];
}
