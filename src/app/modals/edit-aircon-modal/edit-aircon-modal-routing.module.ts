import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAirconModalPage } from './edit-aircon-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditAirconModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAirconModalPageRoutingModule {}
