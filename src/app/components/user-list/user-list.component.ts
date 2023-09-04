import { Component } from '@angular/core';
import { User } from 'src/app/Models/User.model';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  employees: User[] = [];

  userAdded = false;
  addError = false;

  constructor(
    private employeesservice: UserService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.employeesservice.getAllUser().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (respose) => {
        console.log(respose);
      },
    });
  }



  openDeleteConfirmationModal(userId: number, content: any) {
    const modalRef = this.modalService.open(content);
    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.deleteUser(userId);
        }
      },
      (reason) => {}
    );
  }
 
  
  deleteUser(userId: number): void {
    this.employeesservice.deleteUser(userId).subscribe(
      () => {
        this.employees = this.employees.filter(
          (employees) => employees.userId != userId
        );
        console.log(`User with ID ${userId} deleted successfully.`);
        this.toastService.showSuccess('User deleted successfully!', 'Success');
      },
      (error) => {
        console.error(`Error deleting user with ID ${userId}: ${error}`);
      }
    );
  }
}
