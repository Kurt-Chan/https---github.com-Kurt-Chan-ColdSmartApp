import { Component, OnInit } from '@angular/core';
import { ChangePasswordModalPage } from '../modals/change-password-modal/change-password-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.page.html',
  styleUrls: ['./edit-profile-page.page.scss'],
})
export class EditProfilePagePage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }


  async changePasswordModal(){
    const modal = await this.modalCtrl.create({
      component: ChangePasswordModalPage,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      cssClass: 'extra-small-modal',
    })
    await modal.present();
  }

}
