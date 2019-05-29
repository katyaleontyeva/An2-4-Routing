import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';


// rxjs
import { Observable, of } from 'rxjs';

import { UserModel } from './../../models/user.model';
import { UserArrayService, UserObservableService } from './../../services';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<Array<UserModel>>; // $ означает что это Observable
  private editedUser: UserModel;

  constructor(
    // private userArrayService: UserArrayService,
    private userObservableService: UserObservableService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.users$ = this.userArrayService.getUsers();
    // version with Observable
    this.users$ = this.userObservableService.getUsers();

    this.route.paramMap
      .pipe(
        // switchMap((params: Params) => this.userArrayService.getUser(+params.get('editedUserID')))
        // version with Observable
        switchMap((params: Params) => {
          return params.get('editedUserID')
            ? this.userObservableService.getUser(+params.get('editedUserID'))
            : of(null);
        })
      )
      .subscribe(
        (user: UserModel) => {
          this.editedUser = {...user};
          console.log(`Last time you edited user ${JSON.stringify(this.editedUser)}`);
        },
        err => console.log(err)
      );
  }

  onEditUser(user: UserModel) {
    const link = ['/users/edit', user.id];
    this.router.navigate(link);
    // or
    // const link = ['edit', user.id];
    // this.router.navigate(link, {relativeTo: this.route});
  }

  onDeleteUser(user: UserModel) {
    // переписываем пользователей после удаления
    this.users$ = this.userObservableService.deleteUser(user);
  }

  isEdited(user: UserModel) {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }
}
