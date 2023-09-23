import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MatCardModule } from '@angular/material/card';
import { ColisComponent } from './components/colis/colis.component';





import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
//import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule, NzFormLayoutType } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTableModule } from 'ng-zorro-antd/table';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ColisProfileComponent } from './components/colis-profile/colis-profile.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AjoutColisComponent } from './components/ajout-colis/ajout-colis.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { RecipientComponent } from './components/recipient/recipient.component';
import { TransporteurComponent } from './components/transporteur/transporteur.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NzRadioModule } from 'ng-zorro-antd/radio';
//import { NzFormLayoutType } from 'ng-zorro-antd/form';



registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent, UsersComponent, UserProfileComponent, ColisComponent, 
    HomePageComponent, ColisProfileComponent, AjoutColisComponent, RecipientComponent, TransporteurComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    DragDropModule,
    ScrollingModule,
    FormsModule,
        
    MatCardModule,
    MatFormFieldModule,
    
    NzButtonModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzFormModule,
    NzInputModule,
    NzToolTipModule,
    NzTableModule,
    RouterModule,
    NzPaginationModule,
    NzCardModule,
    NzAvatarModule,
    NzSkeletonModule,
    NzStepsModule,
    NzDividerModule,
    NzStatisticModule,
    NzProgressModule,
    NzDescriptionsModule,
    NzBadgeModule,
    NzIconModule,
    NzTimePickerModule,
    NzDatePickerModule,
    NzSelectModule,
    NzCascaderModule,
    NgxIntlTelInputModule,
    NzRadioModule,
 

    



   
  ],
  providers: [JwtHelperService, 
              { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, 
              { 
                provide:HTTP_INTERCEPTORS,
                useClass: JwtInterceptor,
                multi: true
              },
              { provide: NZ_ICONS, useValue: icons }, 
              { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
