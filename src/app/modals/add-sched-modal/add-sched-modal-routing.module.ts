import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSchedModalPage } from './add-sched-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddSchedModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSchedModalPageRoutingModule {}
