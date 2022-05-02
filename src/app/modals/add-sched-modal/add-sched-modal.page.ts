import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-add-sched-modal',
  templateUrl: './add-sched-modal.page.html',
  styleUrls: ['./add-sched-modal.page.scss'],
})
export class AddSchedModalPage implements OnInit {

  everyday: boolean;

  constructor(
    private modalCtrl: ModalController,
    
    ) {  }

     



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
