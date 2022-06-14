import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

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
    private firebaseService: FirebaseService
  ) {   }

  ngOnInit() {

    this.addAirconForm = this.formBuilder.group({
      id: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      remote_model: new FormControl('', Validators.required),
      min_temp: new FormControl('', Validators.required),
      max_temp: new FormControl('', Validators.required)
    });
  }

  validation_messages = {
    'id': [
      { type: 'required', message: 'Id is Required' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' }
    ],
    'brand': [
      { type: 'required', message: 'Aircon Brand is required.' }
    ],
    // 'acType': [
    //   { type: 'required', message: 'Aircon Type is required.' }
    // ],
    'remote_model': [
      { type: 'required', message: 'Remote Model is required.' }
    ],
    'min_temp': [
      { type: 'required', message: 'Min Temp is required.' }
    ],
    'max_temp': [
      { type: 'required', message: 'Max Temp is required.' }
    ],
  };

  // onCheckboxChange(e) {
  //   const acmodes: FormArray = this.addAirconForm.get('acmodes') as FormArray;
  //   if (e.target.checked) {
  //     acmodes.push(new FormControl(e.target.value));
  //   } else {
  //     let i: number = 0;
  //     acmodes.controls.forEach((item: FormControl) => {
  //       if (item.value == e.target.value) {
  //         acmodes.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  // }

  addAircon(value){
    console.log(value);
    this.dismissModal()
    this.firebaseService.addAircon(value)
  }

  dismissModal(){
    this.modalCtrl.dismiss()
  }

}
