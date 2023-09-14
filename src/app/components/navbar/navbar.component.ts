import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    localStorage.removeItem('token');
    this.authService.setAuthenticated(false);
    this.router.navigate(['/Login']);
  }
}
