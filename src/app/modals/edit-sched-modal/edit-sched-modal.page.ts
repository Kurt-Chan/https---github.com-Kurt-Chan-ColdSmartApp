import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service'
import { DataService } from '../../services/data.service';
import { Data } from '@angular/router';
import { first } from 'rxjs/operators';
import { ProtractorBrowser } from 'protractor';

@Component({
  selector: 'app-edit-sched-modal',
  templateUrl: './edit-sched-modal.page.html',
  styleUrls: ['./edit-sched-modal.page.scss'],
})
export class EditSchedModalPage implements OnInit {

  editSchedForm: FormGroup
  aircMode: string

  schedId; //sched id of the clicked item in the schedule

  Days: Array<any> = [
    {name: 'Monday', value: 'Monday'},
    {name: 'Tuesday', value: 'Tuesday'},
    {name: 'Wednesday', value: 'Wednesday'},
    {name: 'Thursday', value: 'Thursday'},
    {name: 'Friday', value: 'Friday'},
    {name: 'Saturday', value: 'Saturday'},
    {name: 'Sunday', value: 'Sunday'},
  ];

  
  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private dataService: DataService
  ) { }

  ngOnInit() {

    // console.log(this.schedId)
    let schedRef = this.dataService.getSelectedSchedule(this.schedId)
    schedRef.pipe(first()).toPromise().then((res)=>{
      // console.log(res.days)

    this.editSchedForm = this.formBuilder.group({
      setDays: this.formBuilder.array([], [Validators.required]), //array to ng selected days, need dapat makuha yung nakasave na days sa firebase
      startTime: new FormControl(res.time, Validators.required), //nag bubug yung time, minsan nadedetect yung time sa firestore, minsan yung computer time
      type: new FormControl(res.type, Validators.required),
      prefTemp: new FormControl(res.type == 'PREFERRED_TEMP' ? res.value : ''),
      switch: new FormControl(res.type == 'POWER' ? res.value : ''),
      airconMode: new FormControl(res.type == 'MODE' ? res.value : ''),
      ecoMode: new FormControl(res.type == 'ECO_MODE' ? res.value : ''),
    })

    this.editSchedForm.get('type').valueChanges.subscribe(result =>{
      if(result == 'POWER'){
        this.editSchedForm.get('switch').setValidators(Validators.required);
        this.editSchedForm.get('prefTemp').clearValidators();
        this.editSchedForm.get('airconMode').clearValidators();
        this.editSchedForm.get('ecoMode').clearValidators();
      }
      else if(result == 'PREFERRED_TEMP'){
        this.editSchedForm.get('prefTemp').setValidators(Validators.required);
        this.editSchedForm.get('switch').clearValidators();
        this.editSchedForm.get('airconMode').clearValidators();
        this.editSchedForm.get('ecoMode').clearValidators();
      }
      else if(result == 'MODE'){
        this.editSchedForm.get('airconMode').setValidators(Validators.required);
        this.editSchedForm.get('prefTemp').clearValidators();
        this.editSchedForm.get('switch').clearValidators();
        this.editSchedForm.get('ecoMode').clearValidators();
      }
      else if(result == 'ECO_MODE'){
        this.editSchedForm.get('ecoMode').setValidators(Validators.required);
        this.editSchedForm.get('airconMode').clearValidators();
        this.editSchedForm.get('switch').clearValidators();
        this.editSchedForm.get('prefTemp').clearValidators();
      }
    })

    })
  }

  validation_messages = {
    'schedName': [
      { type: 'required', message: 'Id is Required' }
    ],
    'setDays': [
      { type: 'required', message: 'Password is required.' }
    ],
    'startTime': [
      { type: 'required', message: 'Aircon Brand is required.' }
    ],
    'prefTemp': [
      { type: 'required', message: 'Remote Model is required.' }
    ],
    'airconMode': [
      { type: 'required', message: 'Aircon Mode is required.' }
    ],
   };

   onCheckboxChange(e) {
     
    const setDays: FormArray = this.editSchedForm.get('setDays') as FormArray;
    if (e.target.checked) {
      setDays.push(new FormControl(e.target.value));
      // console.log(e.target.value)
    } else {
      let i: number = 0;
      setDays.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          setDays.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  updateSchedule(value){
    // var tm1 = value.startTime
    // var tm2 = value.endTime

    // let d1 = tm1.split('T')[1];
    // let d2 = tm2.split('T')[1];

    // let m1 = d1.split(':')[0];
    // let m2 = d2.split(':')[0];

    // let n1 = d1.split(':')[1];
    // let n2 = d2.split(':')[1];

    // var AmOrPm1 = m1 >= 12 ? 'pm' : 'am';
    // var AmOrPm2 = m2 >= 12 ? 'pm' : 'am';

    // m1 = (m1 % 12) || 12;
    // m2 = (m2 % 12) || 12;

    // var strt = m1 + ":" + n1 + " " + AmOrPm1; //will display hour and mins only
    // var end = m2 + ":" + n2 + " " + AmOrPm2; //will display hour and mins only

    console.log(value);
  }

  dismissModal(){
    this.modalCtrl.dismiss()
  }

  deleteSchedule(){
    this.firebaseService.deleteSchedule(this.schedId)
    console.log(this.schedId," deleted")
    this.dismissModal()
  }
  
}
