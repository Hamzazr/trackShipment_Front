import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ColisComponent } from './components/colis/colis.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ColisProfileComponent } from './components/colis-profile/colis-profile.component';
import { AjoutColisComponent } from './components/ajout-colis/ajout-colis.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecipientComponent } from './components/recipient/recipient.component';

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
    path: '',
    component : HomePageComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'colis',
        children: [
          {
            path: '',
            component: ColisComponent,
            // canActivate: [authGuard]
          },
          {
            path: ':id',
            component: ColisProfileComponent,
            // canActivate: [authGuard]
          },
          
        ],
      },

      {
        path: 'recipient',
        component: RecipientComponent,
        // canActivate: [authGuard]
      }

    ]
    // canActivate: [authGuard]
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [authGuard]

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
        component: UsersComponent,
        canActivate: [authGuard]
      },
      {
        path: ':id',
        component: UserProfileComponent,
        canActivate: [authGuard]
      },
    
    ]

  },
  {
    path: 'createColis',
    component: AjoutColisComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'colis',
    children: [
      {
        path: '',
        component: ColisComponent,
        // canActivate: [authGuard]
      },
      {
        path: ':id',
        component: ColisProfileComponent,
        // canActivate: [authGuard]
      },
      
    ],
  },


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
