import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataComponent } from './user-data.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: '', component: UserDataComponent },
  { path: 'edit/:id', component: UserDetailsComponent },
  { path: 'add', component: UserDetailsComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDataRoutingModule {}
