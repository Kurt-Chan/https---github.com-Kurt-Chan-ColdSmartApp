import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAirconModalPage } from './add-aircon-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddAirconModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAirconModalPageRoutingModule {}
