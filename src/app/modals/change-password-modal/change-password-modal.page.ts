import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.page.html',
  styleUrls: ['./change-password-modal.page.scss'],
})
export class ChangePasswordModalPage implements OnInit {

  changePasswordForm: FormGroup;
  matching_passwords_group: FormGroup;

  
  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

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

    this.changePasswordForm = this.formBuilder.group({
      matching_passwords: this.matching_passwords_group,
    });
  }

  validation_messages = {
    'password': [
      { type: 'required', message: 'Required.' },
      { type: 'minlength', message: 'Must be at least 5 characters long.' },
      { type: 'pattern', message: 'Must contain at least uppercase and lowercase letter, and a number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: "Passwords doesn't match." }
    ],
  }

  dismissModal(){
    this.modalCtrl.dismiss()
  }

  onSubmit(values){
    console.log(values);
    // this.router.navigate(["/login"]);
    this.changePasswordForm.reset();
    this.dismissModal();
  }

}
