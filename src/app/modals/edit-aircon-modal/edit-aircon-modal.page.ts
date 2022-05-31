import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-edit-aircon-modal',
  templateUrl: './edit-aircon-modal.page.html',
  styleUrls: ['./edit-aircon-modal.page.scss'],
})
export class EditAirconModalPage implements OnInit {

  editAirconForm: FormGroup
  deviceId;
  airconData = []

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {

    let selectedAircon = this.dataService.getSelectedAirconInfo(this.deviceId)
    selectedAircon.subscribe((result:any) =>{
      console.log(result)
    this.editAirconForm = this.formBuilder.group({
      acBrand: new FormControl(result.brand),
      remoteModel: new FormControl(result.remote_model),
      minTemp: new FormControl(result.min_temp),
      maxTemp: new FormControl(result.max_temp)
    });
    this.editAirconForm.get('remoteModel').valueChanges.subscribe(res=>{
      if(res == 'aircon'){
        res.remote_conf_url = "https://raw.githubusercontent.com/Laurence33/coldsmart-remotes/main/panasonic/VEQ1100.lircd.conf"
      }
    })

  })
  }

  dismissModal(){
    this.modalCtrl.dismiss()
  }

  editAircon(value){
    console.log(value),
    this.dismissModal()
  }

}
