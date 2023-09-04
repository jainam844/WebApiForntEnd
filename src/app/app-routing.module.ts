import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserDetailsComponent } from './components/user-list/components/user-details/user-details.component';
import { AuthGuard } from './auth.guard';

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

  {
    path: 'edit/:id',
    loadChildren: () =>
      import(
        './components/user-list/components/user-details/user-details.module'
      ).then((m) => m.UserDetailsModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'Home',
    loadChildren: () =>
      import('./components/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'UserList',
    loadChildren: () =>
      import('./components/user-list/user-list.module').then(
        (m) => m.UserListModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'AddUser',
    loadChildren: () =>
      import(
        './components/user-list/components/user-details/user-details.module'
      ).then((m) => m.UserDetailsModule),
    canActivate: [AuthGuard],
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
