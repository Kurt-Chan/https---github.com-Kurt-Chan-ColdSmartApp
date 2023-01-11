import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-air-quality-info-pop',
  templateUrl: './air-quality-info-pop.page.html',
  styleUrls: ['./air-quality-info-pop.page.scss'],
})
export class AirQualityInfoPopPage implements OnInit {

  pm2_5: number
  pm10: number
  constructor() { }

  ngOnInit() {
    this.pm10 = 10,
    this.pm2_5 = 10
  }

}
