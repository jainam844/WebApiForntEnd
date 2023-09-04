import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserDetailsComponent } from './components/user-list/components/user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full',
  },

  {
    path: 'Login',
    loadChildren: () =>
      import('./components/login-page/login.module').then((m) => m.LoginModule),
  },

  { path: 'edit/:id', component: UserDetailsComponent },

  {
    path: 'Home',
    loadChildren: () =>
      import('./components/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },

  {
    path: 'UserList',
    loadChildren: () =>
      import('./components/user-list/user-list.module').then(
        (m) => m.UserListModule
      ),
  },
  {
    path: 'AddUser',
    loadChildren: () =>
      import(
        './components/user-list/components/user-details/user-details.module'
      ).then((m) => m.UserDetailsModule),
  },
  
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
