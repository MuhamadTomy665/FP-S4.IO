import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'regist',
    loadChildren: () => import('./regist/regist.module').then(m => m.RegistPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'beranda',
    loadChildren: () => import('./beranda/beranda.module').then(m => m.BerandaPageModule)
  },
  {
    path: 'antrian',
    loadChildren: () => import('./antrian/antrian.module').then(m => m.AntrianPageModule)
  },
  {
    path: 'riwayat',
    loadChildren: () => import('./riwayat/riwayat.module').then(m => m.RiwayatPageModule)
  },
  {
    path: 'barcode',
    loadComponent: () => import('./barcode/barcode.page').then(m => m.BarcodePage)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'pencarian',
    loadChildren: () => import('./pencarian/pencarian.module').then(m => m.PencarianPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then(m => m.ProfilPageModule)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
