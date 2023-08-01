import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ColisComponent } from './components/colis/colis.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ColisProfileComponent } from './components/colis-profile/colis-profile.component';

const routes: Routes = [
  { 
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home-page',
    component: HomePageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UsersComponent
      },
      {
        path: ':id',
        component: UserProfileComponent
      },
    ]

  },
  
  {
    path: 'colis',
    children: [
      {
        path: '',
        component: ColisComponent
      },
      {
        path: ':id',
        component: ColisProfileComponent
      },
    ]
    
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
