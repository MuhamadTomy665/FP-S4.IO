import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaftarPoliPage } from './daftar-poli.page';

const routes: Routes = [
  {
    path: '',
    component: DaftarPoliPage // otomatis mendeteksi standalone
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaftarPoliPageRoutingModule {}
