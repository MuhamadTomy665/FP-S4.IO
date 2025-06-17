import { Routes, RouterModule } from '@angular/router';
import { BerandaPage } from './beranda.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: BerandaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BerandaPageRoutingModule {}
