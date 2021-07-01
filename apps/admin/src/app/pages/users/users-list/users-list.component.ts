import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '@dwll/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'dwll-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  updateUser(userId: string) {}

  deleteUser(userId: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this user?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(
          (response) => {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is deleted!'
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User is not deleted!'
            });
          }
        );
      },
      reject: (type: any) => {}
    });
  }

  private _getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    })
  }

}
