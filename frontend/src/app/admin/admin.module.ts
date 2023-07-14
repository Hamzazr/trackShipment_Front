import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { OverviewComponent } from './components/overview/overview.component';


@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        OverviewComponent
    ]
})
export class AdminModule { }
