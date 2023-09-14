
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'WebApiCRUD';
  isAuthenticated: boolean = false;
  isLoading$!: Observable<boolean>;
  constructor(
    private authService: AuthService,
   
  ) {}


  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });

  }
}
