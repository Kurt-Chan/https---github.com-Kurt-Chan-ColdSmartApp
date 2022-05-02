import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSchedModalPage } from './edit-sched-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditSchedModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSchedModalPageRoutingModule {}
