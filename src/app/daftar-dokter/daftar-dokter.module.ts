import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaftarDokterPageRoutingModule } from './daftar-dokter-routing.module';

import { DaftarDokterPage } from './daftar-dokter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaftarDokterPageRoutingModule
  ],
  declarations: [DaftarDokterPage]
})
export class DaftarDokterPageModule {}
