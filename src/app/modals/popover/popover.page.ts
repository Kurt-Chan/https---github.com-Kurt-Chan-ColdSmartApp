import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(
    private router: Router,
    private popoverCtrl: PopoverController,
    private authService: AuthService, 
  ) { }

  ngOnInit() {
  }

  dismissModal(){
    this.popoverCtrl.dismiss()
  }

  gotoFaqsPage(){
    this.router.navigate(['/faqs'])
    this.dismissModal()
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
     localStorage.setItem('authenticated', '0');
     this.router.navigateByUrl("/");
    }, err => {
      console.log(err);
    })
    this.dismissModal();
  }

}
