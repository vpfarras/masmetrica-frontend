import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckLoginGuard } from '@shared/guards/check-login.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'notFound',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./pages/perfil/perfil.module').then((m) => m.PerfilModule),
      canActivate: [CheckLoginGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'loadFile',
    loadChildren: () =>
      import('./pages/FileUploaderComponent/file-uploader.module').then((m) => m.FileUploaderComponentModule),
    canActivate: [CheckLoginGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/auth/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'recoveryPassword',
    loadChildren: () =>
      import('./pages/recoveryPass/recoveryPass.module').then(
        (m) => m.RecoveryPassModule
      ),
  },
  {
    path: 'register/register-landing/:token',
    loadChildren: () =>
      import('./pages/auth/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'new-password/:token',
    loadChildren: () =>
      import('./pages/new-password/new-password.module').then(
        (m) => m.NewPasswordModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
