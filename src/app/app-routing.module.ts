import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login-page/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
// import { HomePagesComponent } from './components/home-pages/home-pages.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full',
  },

  {
    path: 'Login',
    component: LoginComponent,
  },

  {
    path: 'Home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'users',
    loadChildren: () =>
      import('./components/user-data/user-data.module').then(
        (m) => m.UserDataModule
      ),
    canActivate: [AuthGuard],
  },
  { path: 'user-resource-menu', loadChildren: () => import('./components/user-resource-menu/user-resource-menu.module').then(m => m.UserResourceMenuModule) },

  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
