import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/User.model';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  userForm!: FormGroup;
  userId: number = 0;
  editMode: boolean = false;
  newUser: User = {
    userId: 0,
    firstName: '',
    lastName: '',
    department: '',
    gender: '',
    date_Of_Birth: '',
    email:'',
    password:''
  };
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      date_Of_Birth: ['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];

      this.editMode = !!this.userId;

      if (this.editMode) {
        this.loadUserDataforEdit(this.userId);
      }
    });
  }

  private loadUserDataforEdit(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (user) => {
        this.newUser = user;
        const utcDate = new Date(this.newUser.date_Of_Birth);
        const localDate = new Date(
          Date.UTC(utcDate.getFullYear(), utcDate.getMonth(), utcDate.getDate())
        );
        this.userForm.patchValue({
          ...user,
          date_Of_Birth: localDate.toISOString().substring(0, 10),
        });
      },
      (error) => {
        console.error(`Error fetching user with ID ${this.userId}: ${error}`);
      }
    );
  }

  submitForm() {
    if (this.userForm.valid) {
      if (this.editMode) {
        const updatedUser: User = this.userForm.value;
        updatedUser.userId = this.userId;

        this.userService.UpdateUser(updatedUser).subscribe(
          () => {
            console.log(`User with ID ${this.userId} updated successfully.`);
            this.router.navigate(['UserList']);
            this.toastService.showSuccess(
              'User updated successfully!',
              'Success'
            );
          },
          (error) => {
            console.error(
              `Error updating user with ID ${this.userId}: ${error}`
            );
          }
        );
      } else {
        const newUser: User = this.userForm.value;

        this.userService.AddUser(newUser).subscribe(
          () => {
            this.router.navigate(['UserList']);
            this.toastService.showSuccess(
              'User added successfully!',
              'Success'
            );
          },
          (error) => {
            console.error('Error adding user:', error);
          }
        );
      }
    } else {
      if (this.userForm.get('firstName')?.invalid) {
        this.toastService.showError(
          'Please fill in the First Name field.',
          'Error'
        );
      } else if (this.userForm.get('lastName')?.invalid) {
        this.toastService.showError(
          'Please fill in the Last Name field.',
          'Error'
        );
      } else if (this.userForm.get('gender')?.invalid) {
        this.toastService.showError('Please select a Gender.', 'Error');
      } else if (this.userForm.get('department')?.invalid) {
        this.toastService.showError(
          'Please fill in the Department field.',
          'Error'
        );
      } else if (this.userForm.get('dateOfBirth')?.invalid) {
        this.toastService.showError('Please select a Date of Birth.', 'Error');
      }else if (this.userForm.get('email')?.invalid) {
        this.toastService.showError('Please enter  email.', 'Error');
      }else if (this.userForm.get('dateOfBirth')?.invalid) {
        this.toastService.showError('Please enter Password .', 'Error');
      }
    }
  }
}
