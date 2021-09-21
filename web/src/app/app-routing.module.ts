import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingpageComponent } from './views/landingpage/landingpage.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { CreateEventComponent } from './views/create-event/create-event.component';

const routes: Routes = [
  { path: '', component:  LandingpageComponent, redirectTo: '', pathMatch: 'full' },
  { path: 'home', component:  HomeComponent},
  { path: 'login', component:  LoginComponent},
  { path: 'event', component: CreateEventComponent },
  { path: 'register', loadChildren: () => import('./views/register/register.module').then(m => m.RegisterModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
