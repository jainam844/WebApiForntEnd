import { Component } from '@angular/core';
import { User } from 'src/app/Models/User.model';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent {
  employees: User[] = [];
  employees1: User[] = [];
  userAdded = false;
  addError = false;
  _listFilter = '';

  constructor(
    private employeesservice: UserService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getAllUserList();
  }
  get listFilter(): string {
    return this._listFilter;
  }
// Inside your UserDataComponent class
set listFilter(value: string) {
  this._listFilter = value;
  // Check if the search input is empty, and if it is, show all data
  if (!this.listFilter) {
   this.getAllUserList();
  } else {
    // Filter the data based on the search input
    this.employees = this.performFilter(this.listFilter);
  }
}


  performFilter(filterBy: string): User[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.employees.filter(
      (employee: User) =>
        employee.firstName &&
        employee.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  getAllUserList() {
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
