import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AntrianPage } from './antrian.page';

const routes: Routes = [
  {
    path: '',
    component: AntrianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AntrianPageRoutingModule {}
