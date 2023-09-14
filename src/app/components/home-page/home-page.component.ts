import { User } from 'src/app/Models/User.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  users: User[] = [];
  totalUserCount: number = 0;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getAllUserList();
  }

  getAllUserList() {
    this.userService.getAllUser().subscribe({
      next: (response) => {
        this.users = response;
        console.log(response.length);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

}
