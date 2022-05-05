import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-sched-modal',
  templateUrl: './add-sched-modal.page.html',
  styleUrls: ['./add-sched-modal.page.scss'],
})
export class AddSchedModalPage implements OnInit {
  
  addSchedForm: FormGroup

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
    
    ) {  }

     



  ngOnInit() {

    this.addSchedForm = this.formBuilder.group({
      schedName: new FormControl('', Validators.required),
      setDays: this.formBuilder.array([], [Validators.required]),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      prefTemp: new FormControl('', Validators.required)
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
    'endTime': [
      { type: 'required', message: 'Aircon Type is required.' }
    ],
    'prefTemp': [
      { type: 'required', message: 'Remote Model is required.' }
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
    var tm2 = value.endTime

    let d1 = tm1.split('T')[1];
    let d2 = tm2.split('T')[1];

    let m1 = d1.split(':')[0];
    let m2 = d2.split(':')[0];

    let n1 = d1.split(':')[1];
    let n2 = d2.split(':')[1];

    var AmOrPm1 = m1 >= 12 ? 'pm' : 'am';
    var AmOrPm2 = m2 >= 12 ? 'pm' : 'am';

    m1 = (m1 % 12) || 12;
    m2 = (m2 % 12) || 12;

    var strt = m1 + ":" + n2 + " " + AmOrPm1; //will display hour and mins only
    var end = m2 + ":" + n2 + " " + AmOrPm2; //will display hour and mins only

    console.log(value, value.startTime = strt, value.endTime = end);
  }

}
