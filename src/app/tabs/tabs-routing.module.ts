import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'pencarian',
        loadChildren: () =>
          import('../pencarian/pencarian.module').then(m => m.PencarianPageModule),
      },
      {
        path: 'beranda',
        loadChildren: () =>
          import('../beranda/beranda.module').then(m => m.BerandaPageModule),
      },
      {
        path: 'riwayat',
        loadChildren: () =>
          import('../riwayat/riwayat.module').then(m => m.RiwayatPageModule),
      },
      {
        path: 'profil',
        loadChildren: () =>
          import('../profil/profil.module').then(m => m.ProfilPageModule),
      },
      {
        path: 'antrian',
        loadChildren: () =>
          import('../antrian/antrian.module').then(m => m.AntrianPageModule),
      },
      {
        path: '',
        redirectTo: 'home', // ✅ fix di sini
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
