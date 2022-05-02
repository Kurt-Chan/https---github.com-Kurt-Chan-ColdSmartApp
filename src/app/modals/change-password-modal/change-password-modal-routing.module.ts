import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePasswordModalPage } from './change-password-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePasswordModalPageRoutingModule {}
