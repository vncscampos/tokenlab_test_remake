import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingpageComponent } from './views/landingpage/landingpage.component';
import { HomeComponent } from './views/home/home.component';
import { CreateEventComponent } from './views/create-event/create-event.component';
import { AuthGuard } from './core/guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: LandingpageComponent,
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'event',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: CreateEventComponent,
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./views/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./views/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
