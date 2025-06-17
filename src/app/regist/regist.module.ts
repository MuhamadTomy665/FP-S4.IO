import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { RegistPageRoutingModule } from './regist-routing.module';
import { RegistPage } from './regist.page'; // Komponen ini harus standalone

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    RegistPageRoutingModule,
    RegistPage // ✅ Pindahkan ke `imports`, bukan `declarations`
  ],
  // declarations: [RegistPage] ❌ Jangan dideklarasikan di sini
})
export class RegistPageModule {}
