import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaftarDokterPage } from './daftar-dokter.page';

const routes: Routes = [
  {
    path: '',
    component: DaftarDokterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaftarDokterPageRoutingModule {}
