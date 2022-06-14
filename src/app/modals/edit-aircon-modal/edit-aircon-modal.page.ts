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

    this.editAirconForm = this.formBuilder.group({
      acBrand: new FormControl('', Validators.required),
      remoteModel: new FormControl('', Validators.required),
      minTemp: new FormControl('', Validators.required),
      maxTemp: new FormControl('', Validators.required)
    });

    let selectedAircon = this.dataService.getSelectedAirconInfo()
    selectedAircon.subscribe((result:any) =>{
      // console.log(result)
      this.editAirconForm.get('acBrand').setValue(result.brand)
      this.editAirconForm.get('remoteModel').setValue(result.remote_model)
      this.editAirconForm.get('minTemp').setValue(result.min_temp)
      this.editAirconForm.get('maxTemp').setValue(result.max_temp)
      this.editAirconForm.get('remoteModel').valueChanges.subscribe(res=>{
        if(res == 'carrier'){
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
