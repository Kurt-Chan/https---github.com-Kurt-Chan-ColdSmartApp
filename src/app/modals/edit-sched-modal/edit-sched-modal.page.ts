import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service'
import { DataService } from '../../services/data.service';

import { first } from 'rxjs/operators';


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
    var tm1 = res.time
    let m1 = tm1.split(':')[0];
    let m2 = tm1.split(':')[1];
    let m3 = tm1.split("")[5];
    var newHr = (m1 % 12) + (12)
    var removeAmPm = m3 == 'P' ?  newHr : (m1 >= 9 ? m1 : '0'+m1);
    var formatTime = removeAmPm + ":" + m2.trim(" ")[0] + m2.trim(" ")[1];
    // console.log(formatTime)

    this.editSchedForm = this.formBuilder.group({
      setDays: this.formBuilder.array([], [Validators.required]), //array to ng selected days, need dapat makuha yung nakasave na days sa firebase
      startTime: new FormControl(formatTime, Validators.required), //nag bubug yung time, minsan nadedetect yung time sa firestore, minsan yung computer time
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
    var tm1 = value.startTime
    let m1 = tm1.split(':')[0];
    let m2 = tm1.split(':')[1];
    var AmOrPm1 = m1 >= 12 ? 'PM' : 'AM';
    m1 = (m1 % 12) || 12;
    var strt = m1 + ":" + m2 + " " + AmOrPm1;
    // console.log(strt)
    console.log(value, strt);
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
