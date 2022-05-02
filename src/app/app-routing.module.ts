import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'add-sched-modal',
    loadChildren: () => import('./modals/add-sched-modal/add-sched-modal.module').then( m => m.AddSchedModalPageModule)
  },
  {
    path: 'edit-sched-modal',
    loadChildren: () => import('./modals/edit-sched-modal/edit-sched-modal.module').then( m => m.EditSchedModalPageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./modals/popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'add-aircon-modal',
    loadChildren: () => import('./modals/add-aircon-modal/add-aircon-modal.module').then( m => m.AddAirconModalPageModule)
  },
  {
    path: 'air-quality-info-pop',
    loadChildren: () => import('./modals/air-quality-info-pop/air-quality-info-pop.module').then( m => m.AirQualityInfoPopPageModule)
  },
  {
    path: 'edit-profile-page',
    loadChildren: () => import('./edit-profile-page/edit-profile-page.module').then( m => m.EditProfilePagePageModule)
  },
  {
    path: 'change-password-modal',
    loadChildren: () => import('./modals/change-password-modal/change-password-modal.module').then( m => m.ChangePasswordModalPageModule)
  },
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
