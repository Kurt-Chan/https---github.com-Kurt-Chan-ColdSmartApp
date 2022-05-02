import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-sched-modal',
  templateUrl: './edit-sched-modal.page.html',
  styleUrls: ['./edit-sched-modal.page.scss'],
})
export class EditSchedModalPage implements OnInit {

  everyday: boolean;
  
  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  masterCheck(){
    if(this.everyday == true){
      this.everyday = false
      console.log(this.everyday)
    }
    else{
      this.everyday = true
      console.log(this.everyday)
    }
    
    
  }

  dismissModal(){
    this.modalCtrl.dismiss()
  }
  
}
