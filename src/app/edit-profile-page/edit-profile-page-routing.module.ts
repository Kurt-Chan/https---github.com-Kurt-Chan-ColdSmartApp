import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfilePagePage } from './edit-profile-page.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfilePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfilePagePageRoutingModule {}
