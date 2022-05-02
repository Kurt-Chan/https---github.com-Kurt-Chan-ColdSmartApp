import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-aircon-modal',
  templateUrl: './add-aircon-modal.page.html',
  styleUrls: ['./add-aircon-modal.page.scss'],
})
export class AddAirconModalPage implements OnInit {

  addAirconForm: FormGroup
  checkboxArrayList: FormGroup

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
  ) { 

    // this.addAirconForm = this.formBuilder.group({
    //   checkboxArrayList: this.formBuilder.array([], [Validators.required])
    // });

  }

  ngOnInit() {

    this.addAirconForm = this.formBuilder.group({
      raspId: new FormControl('', Validators.required),
      rasPassword: new FormControl('', Validators.required),
      acBrand: new FormControl('', Validators.required),
      acType: new FormControl('', Validators.required),
      remoteModel: new FormControl('', Validators.required),
      minTemp: new FormControl('', Validators.required),
      maxTemp: new FormControl('', Validators.required),
      checkboxArrayList: this.formBuilder.group({
        //list of the modes
      })
    });
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

  modes = [
    {name: 'Fan Mode', value: 'fan', checked: true},
    {name: 'Eco Mode', value: 'eco'},
    {name: 'Power Mode', value: 'power'},
    {name: 'Auto Mode', value: 'Power'},
  ];

  // updateCheckControl(cal, o) {
  //   if (o.checked) {
  //     cal.push(new FormControl(o.value));
  //   } else {
  //     cal.controls.forEach((item: FormControl, index) => {
  //       if (item.value == o.value) {
  //         cal.removeAt(index);
  //         return;
  //       }
  //     });
  //   }
  // }

  // onSelectionChange(e, i) {
  //   const checkboxArrayList: FormArray = this.addAirconForm.get('checkboxArrayList') as FormArray;
  //   this.modes[i].checked = e.target.checked;

  // }

  addAircon(value){
    console.log(value);
  }

  dismissModal(){
    this.modalCtrl.dismiss()
  }

}
