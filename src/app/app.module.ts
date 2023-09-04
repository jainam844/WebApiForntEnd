import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-list/components/user-details/user-details.component';
import { LoginComponent } from './components/login-page/login.component';
import { NavbarComponent } from './components/home-page/navbar/navbar.component';
import { UserListModule } from './components/user-list/user-list.module';
import { HomePageModule } from './components/home-page/home-page.module';
import { LoginModule } from './components/login-page/login.module';
import { UserDetailsModule } from './components/user-list/components/user-details/user-details.module';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    HomePageComponent,
    PageNotFoundComponent,
    UserDetailsComponent,
    LoginComponent,
    NavbarComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    UserListModule,
    HomePageModule,
    LoginModule,
    UserDetailsModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
