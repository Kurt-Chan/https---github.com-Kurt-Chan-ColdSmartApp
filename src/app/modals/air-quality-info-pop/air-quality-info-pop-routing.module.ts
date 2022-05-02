import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AirQualityInfoPopPage } from './air-quality-info-pop.page';

const routes: Routes = [
  {
    path: '',
    component: AirQualityInfoPopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirQualityInfoPopPageRoutingModule {}
