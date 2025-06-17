import { NgModule } from '@angular/core';
import { DaftarPoliPage } from './daftar-poli.page';
import { DaftarPoliPageRoutingModule } from './daftar-poli-routing.module';

@NgModule({
  imports: [
    DaftarPoliPage,              // ✅ import komponen standalone
    DaftarPoliPageRoutingModule  // ✅ routing tetap
  ]
})
export class DaftarPoliPageModule {}
