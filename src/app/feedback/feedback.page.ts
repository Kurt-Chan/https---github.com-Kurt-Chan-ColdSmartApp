import { Component, OnInit } from '@angular/core';
import { PopoverPage } from '../modals/popover/popover.page';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'
import { first } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  userInfo: any={
    uid: '',
    name:'',
    email: ''
  };

  userId: string
  disableButton: boolean = false;
  showFeedback: boolean = true;
  feedbackForm: FormGroup;

  constructor(
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private angularFire: AngularFirestore,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    let uid= this.authService.getUid();

    firebase.auth().onAuthStateChanged( async user =>{
      if(user){
      /* Getting the user's document from the firestore database. */
      const result=  this.angularFire.collection('users').doc(await uid);
       var userprofile = result.valueChanges();
       this.userId = await uid
       /* Assigning the user's data to the userData variable. */
       userprofile.pipe(first()).toPromise().then((user: any) =>{
         this.userInfo = user;
         if(this.userId == user.uid){
           this.showFeedback = false
         }
        })  
      }
    })
  
    this.feedbackForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      message: new FormControl('', Validators.required)
    });


  }

  async openMenuPopover(ev: any){
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: ev,
      cssClass: 'menuPopover'
    })
    await popover.present();
  }


  onSubmit(value, uid){
    this.disableButton = true
    uid = this.userId
    this.firebaseService.sendFeedback(value, uid).then(()=>{
      this.disableButton = false
      this.showFeedback = false
      
      this.feedbackForm.reset()
      this.feedbackForm.get('name').clearValidators()
      this.feedbackForm.get('email').clearValidators()
      this.feedbackForm.get('message').clearValidators()
    });
    console.log('submit')
  }

}
