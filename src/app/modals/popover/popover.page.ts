import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(
    private router: Router,
    private popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
  }

  dismissModal(){
    this.popoverCtrl.dismiss()
  }

  logout(){
    this.router.navigate(["/login"]);
    this.dismissModal();
  }

}
