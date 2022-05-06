import { Component, OnInit } from '@angular/core';
import { ChangePasswordModalPage } from '../modals/change-password-modal/change-password-modal.page';
import { ModalController } from '@ionic/angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidator } from '../validators/username.validator';
import { PhoneValidator } from '../validators/phone.validator';
import { CountryPhone } from '../signup/country-phone.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.page.html',
  styleUrls: ['./edit-profile-page.page.scss'],
})
export class EditProfilePagePage implements OnInit {

  validations_form: FormGroup;
  country_phone_group: FormGroup;

  countries: Array<CountryPhone>;

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

    this.countries = [
      new CountryPhone('PH', 'Philippines'),
    ];

    let country = new FormControl(this.countries[0], Validators.required);
    let phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
    this.country_phone_group = new FormGroup({
      phone: phone
    });

    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        // UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      name: new FormControl('', Validators.required),
      address: new FormControl(''),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      country_phone: this.country_phone_group,
    });
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Must contain numbers and letters only.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Contact number is required.' },
      { type: 'validCountryPhone', message: 'Contact number is not from the Philippines.' }
    ],
  };


  onSubmit(values){
    console.log(values);
    // this.router.navigate(["/login"]);
    this.validations_form.reset();
  }


  async changePasswordModal(){
    const modal = await this.modalCtrl.create({
      component: ChangePasswordModalPage,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      cssClass: 'extra-small-modal',
    })
    await modal.present();
  }

}
