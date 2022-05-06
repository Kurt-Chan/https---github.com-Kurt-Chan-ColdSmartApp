import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute ,Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string;
  

  constructor(
    private router : Router,
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });

  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
    ]
  };


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'User Not Found',
      duration: 1500
    });
    toast.present();
  }

  async userNotFound() {
    const toast = await this.toastController.create({
      message: 'User not found',
      duration: 2000
    });
    toast.present();
  }

  
  async wrongPass() {
    const toast = await this.toastController.create({
      message: 'Wrong Password',
      duration: 2000
    });
    toast.present();
  }

  onSubmit(value){
    // console.log(values);
    // // this.router.navigate(["/login"]);
    // this.presentToast();
    // // this.validations_form.reset();

    this.authService.doLogin(value)
    .then(async res => {
      // localStorage.setItem('authenticated', '1');
      // this.router.navigateByUrl(this.loginurl);
      console.log("Sign in successful");
      console.log("Logged In", await this.authService.getUid()) // logs user uid
       this.validations_form.reset();
       this.router.navigate(["/home"]);
    }, err => {
      //this.errorMessage = err.message;
      if(err.code == "auth/user-not-found"){
        this.userNotFound();
      }
      else if(err.code == "auth/wrong-password"){
        this.wrongPass();
      }
    })

    

  }

}
