
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileUploaderComponentComponent } from './file-uploader.component';

const routes: Routes = [
  { path: '', component: FileUploaderComponentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPasswordRoutingModule { }
