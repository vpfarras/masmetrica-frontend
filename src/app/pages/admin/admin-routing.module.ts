import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'registers',
    loadChildren: () =>
      import('./registers/registers.module').then((m) => m.RegistersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
