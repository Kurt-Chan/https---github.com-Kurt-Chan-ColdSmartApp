import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-aircon-modal',
  templateUrl: './add-aircon-modal.page.html',
  styleUrls: ['./add-aircon-modal.page.scss'],
})
export class AddAirconModalPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  dismissModal(){
    this.modalCtrl.dismiss()
  }

}
