import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfilePagePageRoutingModule } from './edit-profile-page-routing.module';

import { EditProfilePagePage } from './edit-profile-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfilePagePageRoutingModule
  ],
  declarations: [EditProfilePagePage]
})
export class EditProfilePagePageModule {}
