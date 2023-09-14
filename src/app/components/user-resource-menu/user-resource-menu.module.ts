import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgSelectModule } from '@ng-select/ng-select';

import { UserResourceMenuRoutingModule } from './user-resource-menu-routing.module';
import { UserResourceMenuComponent } from './user-resource-menu.component';


@NgModule({
  declarations: [
    UserResourceMenuComponent
  ],
  imports: [
    CommonModule,
    UserResourceMenuRoutingModule,
    FormsModule,
    NgSelectModule
  ]
})
export class UserResourceMenuModule { }
