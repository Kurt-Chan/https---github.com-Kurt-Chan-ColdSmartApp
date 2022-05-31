import { Component, OnInit } from '@angular/core';
import { PopoverPage } from '../modals/popover/popover.page';
import { ModalController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

import { first, map } from 'rxjs/operators';
import firebase from 'firebase/compat/app'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Contact } from 'src/app/models/user';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  userData: Contact[];
  location: string;

  constructor(
    private popoverCtrl: PopoverController,
    private angularFire: AngularFirestore,
    private authService: AuthService,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    let airconDataRef = this.dataService.getAirconData()
    airconDataRef.subscribe(result =>{
      this.location = result.location
    })

    let uid= this.authService.getUid();
    /* This is a function that is called when the user is logged in. It gets the user's document from
    the firestore database and assigns the user's data to the userData variable. */
    firebase.auth().onAuthStateChanged( async user =>{
      if(user){
      /* Getting the user's document from the firestore database. */
      const result=  this.angularFire.collection('users').doc(await uid);
       var userprofile = result.valueChanges();
       /* Assigning the user's data to the userData variable. */
       userprofile.pipe(first()).toPromise().then(user =>{
         this.userData = [user];
        })
      }
    })


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
