import { Component, ViewChild } from '@angular/core';
import { User } from 'src/app/Models/User.model';
import { UserResource } from 'src/app/Models/UserResource.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-resource-menu',
  templateUrl: './user-resource-menu.component.html',
  styleUrls: ['./user-resource-menu.component.css'],
})
export class UserResourceMenuComponent {
  users: UserResource[] = [];
  allUsers: User[] = [];
  resorceOptions: UserResource[] = [];
  selectedUserId: number = 0; // for add resource
  selectedResourceId: number = 0; //for add resource
  resources: UserResource[] = [];
  selectedUserName: string = '';
  selectedResourceIds: { [key: number]: number } = {};
  selectedUserResources: UserResource[] = [];
  selectedUser: UserResource | null = null;

  constructor(
    private employeesservice: UserService,
    private modalService: NgbModal
  ) {}

  @ViewChild('viewResourceModal') viewResourceModal: any;

  ngOnInit(): void {
    this.getUserResource();
    this.getResourceList();
    this.getAllUserList();
  }
  getAllUserList() {
    this.employeesservice.getAllUser().subscribe({
      next: (allUsers) => {
        this.allUsers = allUsers;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  openViewResourceModal(user: UserResource) {
    this.selectedUserName = user.firstName ?? '';
    this.selectedUserId = user.userId;
    this.employeesservice.getResourceByUserId(user.userId).subscribe({
      next: (resources) => {
        this.selectedUserResources = resources;

        for (const resource of resources) {
          this.selectedResourceIds[resource.resourceId] = resource.resourceId;
        }

        const modalRef = this.modalService.open(this.viewResourceModal, {
          centered: true,
        });
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  saveResource(resource: UserResource) {
    const userId = this.selectedUserId;
    const oldResourceId = resource.resourceId;
    const newResourceId = this.selectedResourceIds[oldResourceId];

    if (userId !== 0 && oldResourceId !== 0 && newResourceId !== undefined) {
      this.employeesservice
        .updateResource(userId, oldResourceId, newResourceId)
        .subscribe(
          (response) => {
            console.log('API Response:', response);
            this.modalService.dismissAll();
            this.getUserResource();
          },
          (error) => {
            console.error('API Error:', error);
          }
        );
    } else {
      console.error('Invalid user or resource selection');
    }
  }

  deleteResource(resource: UserResource) {
    const userId = this.selectedUserId;
    const resourceId = resource.resourceId;
    this.employeesservice.deleteResource(userId, resourceId).subscribe(
      (response) => {
        this.modalService.dismissAll();
        this.getUserResource();
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  getUserResource() {
    this.employeesservice.getUserResourses().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (respose) => {
        console.log(respose);
      },
    });
  }

  getResourceList() {
    this.employeesservice.getUserResourceList().subscribe({
      next: (users) => {
        this.resorceOptions = users;
      },
      error: (respose) => {
        console.log(respose);
      },
    });
  }

  openAddResourceModal(content: any) {
    const modalRef = this.modalService.open(content);
    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.employeesservice
            .addUpdateResource(this.selectedUserId, this.selectedResourceId)
            .subscribe(
              (response) => {
                console.log('API Response:', response);
                this.getUserResource();
              },
              (error) => {
                console.error('API Error:', error);
              }
            );
        }
      },
      (reason) => {}
    );
  }
}
