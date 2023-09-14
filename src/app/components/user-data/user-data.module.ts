import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDataRoutingModule } from './user-data-routing.module';
import { UserDataComponent } from './user-data.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserDataComponent, UserDetailsComponent],
  imports: [CommonModule, UserDataRoutingModule, ReactiveFormsModule],
})
export class UserDataModule {}
