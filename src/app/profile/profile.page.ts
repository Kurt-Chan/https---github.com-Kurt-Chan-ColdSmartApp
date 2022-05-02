import { Component, OnInit } from '@angular/core';
import { PopoverPage } from '../modals/popover/popover.page';
import { ModalController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 

  constructor(
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async openMenuPopover(ev: any){
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: ev,
      cssClass: 'menuPopover'
    })
    await popover.present();
  }

  async changePic(){
    // console.log("change pic");

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      promptLabelHeader: 'Change Picture',
      promptLabelPhoto: 'Upload a photo',
      promptLabelPicture: 'Take a new photo',
    });
    var imageUrl = image.webPath;
    console.log(imageUrl)

  }


}
