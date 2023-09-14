import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResourceMenuComponent } from './user-resource-menu.component';

const routes: Routes = [{ path: '', component: UserResourceMenuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserResourceMenuRoutingModule { }
