import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-aircon-modal',
  templateUrl: './add-aircon-modal.page.html',
  styleUrls: ['./add-aircon-modal.page.scss'],
})
export class AddAirconModalPage implements OnInit {

  addAirconForm: FormGroup
  // checkboxArrayList: FormGroup

  Mode: Array<any> = [
    {name: 'Fan Mode', value: 'fan'},
    {name: 'Eco Mode', value: 'eco'},
    {name: 'Auto Mode', value: 'auto'},
  ];

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
  ) {   }

  ngOnInit() {

    this.addAirconForm = this.formBuilder.group({
      raspId: new FormControl('', Validators.required),
      rasPassword: new FormControl('', Validators.required),
      acBrand: new FormControl('', Validators.required),
      acType: new FormControl('', Validators.required),
      remoteModel: new FormControl('', Validators.required),
      minTemp: new FormControl('', Validators.required),
      maxTemp: new FormControl('', Validators.required),
      acmodes: this.formBuilder.array([], [Validators.required])
    });;
  }

  validation_messages = {
    'raspId': [
      { type: 'required', message: 'Id is Required' }
    ],
    'rasPassword': [
      { type: 'required', message: 'Password is required.' }
    ],
    'acBrand': [
      { type: 'required', message: 'Aircon Brand is required.' }
    ],
    'acType': [
      { type: 'required', message: 'Aircon Type is required.' }
    ],
    'remoteModel': [
      { type: 'required', message: 'Remote Model is required.' }
    ],
    'minTemp': [
      { type: 'required', message: 'Min Temp is required.' }
    ],
    'maxTemp': [
      { type: 'required', message: 'Max Temp is required.' }
    ],
  };

  onCheckboxChange(e) {
    const acmodes: FormArray = this.addAirconForm.get('acmodes') as FormArray;
    if (e.target.checked) {
      acmodes.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      acmodes.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          acmodes.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  addAircon(value){
    console.log(value);
  }

  dismissModal(){
    this.modalCtrl.dismiss()
  }

}
