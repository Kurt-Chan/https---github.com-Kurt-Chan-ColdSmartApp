import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service'


@Component({
  selector: 'app-add-sched-modal',
  templateUrl: './add-sched-modal.page.html',
  styleUrls: ['./add-sched-modal.page.scss'],
})
export class AddSchedModalPage implements OnInit {
  
  addSchedForm: FormGroup
  aircMode: string
  // type: string

  Days: Array<any> = [
    {name: 'Monday', value: 'Monday'},
    {name: 'Tuesday', value: 'Tuesday'},
    {name: 'Wednesday', value: 'Wednesday'},
    {name: 'Thursday', value: 'Thursday'},
    {name: 'Friday', value: 'Friday'},
    {name: 'Saturday', value: 'Saturday'},
    {name: 'Sunday', value: 'Sunday'},
  ];

  mode = [
    {name: 'Cool Mode', value: 'COOL_MODE'},
    {name: 'Fan Mode', value: 'FAN_MODE'},
    {name: 'Auto Mode', value: 'ECO_MODE'},
  ]

  power =[
    {name: 'On', value: 'SWITCH_ON', type:'POWER'},
    {name: 'Off', value: 'SWITCH_OFF', type:'POWER'}
  ]


  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private firebaseService: FirebaseService
    
    ) {  }

  ngOnInit() {

    this.addSchedForm = this.formBuilder.group({
      schedName: new FormControl('', Validators.required),
      setDays: this.formBuilder.array([], [Validators.required]),
      startTime: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      prefTemp: new FormControl(''),
      switch: new FormControl('')
    })
    this.addSchedForm.get('type').valueChanges.subscribe(result =>{
      if(result == 'POWER' || result == 'ECO_MODE' || result == 'FAN_MODE'){
        this.addSchedForm.get('switch').setValidators(Validators.required);
        this.addSchedForm.get('prefTemp').clearValidators();
      }
      else if(result == 'PREFERRED_TEMP'){
        this.addSchedForm.get('prefTemp').setValidators(Validators.required);
        this.addSchedForm.get('switch').clearValidators();
      }
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
    const setDays: FormArray = this.addSchedForm.get('setDays') as FormArray;
    if (e.target.checked) {
      setDays.push(new FormControl(e.target.value));
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


  dismissModal(){
    this.modalCtrl.dismiss()
  }


  addSchedule(value){
    var tm1 = value.startTime

    let d1 = tm1.split('T')[1];

    /* Getting the hour of the time. */
    let m1 = d1.split(':')[0];

    /* Getting the minutes of the time. */
    let n1 = d1.split(':')[1];

    var AmOrPm1 = m1 >= 12 ? 'PM' : 'AM';

    m1 = (m1 % 12) || 12;

    var strt = m1 + ":" + n1 + " " + AmOrPm1; //will display hour and mins only

    console.log(value, value.startTime = strt);
    this.firebaseService.addSchedule(value, strt)
    this.dismissModal()
  }

}
