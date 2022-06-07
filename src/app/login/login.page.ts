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
  loginurl = '';

  constructor(
    private router : Router,
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit() {
    
    
    this.loginurl = this.activatedRoute.snapshot.queryParamMap.get('returnto') || 'login';

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

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Incorrect Email or Password',
      duration: 2000
    });
    toast.present();
  }

  onSubmit(value){
    this.authService.doLogin(value).then(async res => {
      localStorage.setItem('authenticated', '1');
      this.router.navigateByUrl(this.loginurl);

      /* Getting the user id of the user that is logged in. */
      console.log("Logged In", res.user.uid),
      this.validations_form.reset();
      this.router.navigate(["/home"]);
    }, err => {
      if(err.code == "auth/user-not-found"){
        this.errorToast();
      }
      else if(err.code == "auth/wrong-password"){
        this.errorToast();
      }
    })

    

  }

}
