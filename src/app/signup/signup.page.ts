import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { PhoneValidator } from '../validators/phone.validator';
import { PasswordValidator } from '../validators/password.validator';
import { CountryPhone } from './country-phone.model';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;

  errorMessage: string = '';
  successMessage: string = '';
  

  countries: Array<CountryPhone>;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private auth: AngularFireAuth,
    private afFirestore: AngularFirestore,
  ) { }

  ngOnInit() {

    this.countries = [
      new CountryPhone('PH', 'Philippines'),
    ];

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

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
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      country_phone: this.country_phone_group,
      matching_passwords: this.matching_passwords_group,
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
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Must contain at least uppercase and lowercase letter, and a number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: "Passwords doesn't match." }
    ],
  };

  onSubmit(value){

    this.authService.doRegister({email: value.email, password: value.matching_passwords.password})
    .then(res => {
      console.log(value);
      this.errorMessage = "";
      this.router.navigate(["/login"]);
      if (res && res.user) {
           /* Creating a new collection in the firestore database. */
           this.afFirestore.collection("users").doc(res.user.uid)
             .set({
               uid: res.user.uid,
               /* A spread operator. It is used to spread the values of an object into another object. */
               ...value
             });
      this.validations_form.reset()
    }}, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })

  }


}
