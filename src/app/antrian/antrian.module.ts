import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AntrianPageRoutingModule } from './antrian-routing.module';
import { AntrianPage } from './antrian.page';

// ✅ Import komponen QR yang benar
import { QRCodeComponent } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AntrianPageRoutingModule,
    QRCodeComponent  // ✅ Masukkan ke imports, BUKAN declarations!
  ],
  declarations: [AntrianPage]
})
export class AntrianPageModule {}
