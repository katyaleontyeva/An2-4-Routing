import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'; // Навигация по истории браузера

// rxjs
import { Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { UserModel } from './../../models/user.model';
import { UserArrayService, UserObservableService } from './../../services';
import { DialogService, CanComponentDeactivate } from './../../../core';


@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  user: UserModel; // юзер который мутируется
  originalUser: UserModel; // оригинальный юзер

  private sub: Subscription;

  // private sub: Subscription;

  constructor(
    // private userArrayService: UserArrayService,
    private userObservableService: UserObservableService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    // this.user = new UserModel(null, '', '');

    // we should recreate component because this code runs only once
    // const id = +this.route.snapshot.paramMap.get('userID');
    // this.sub = this.userArrayService.getUser(id)
    //   .subscribe( // подписка на Observable
    //     user => {
    //       this.user = {...user};
    //       this.originalUser = {...user};
    //     },
    //     err => console.log(err)
    //   );

    this.route.data.pipe(pluck('user')).subscribe((user: UserModel) => {
      this.user = { ...user };
      this.originalUser = { ...user };
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = Object.keys(this.originalUser).map(key => {
      if (this.originalUser[key] === this.user[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    return this.dialogService.confirm('Discard changes?');
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSaveUser() {
    const user = {...this.user};

    // if (user.id) {
    //   this.userArrayService.updateUser(user);
    //   // When go back to users list will show what user was edited
    //   this.router.navigate(['/users', {editedUserID: user.id}]);
    // } else {
    //   this.userArrayService.createUser(user);
    //   this.onGoBack();
    // }
    // this.originalUser = {...this.user};

    // version with Observable
    const method = user.id ? 'updateUser' : 'createUser';
    this.sub = this.userObservableService[method](user)
      .subscribe(
        savedUser => {
          this.originalUser = { ...savedUser };
          user.id
            // optional parameter: http://localhost:4200/users;editedUserID=2
            ? this.router.navigate(['users', { editedUserID: user.id }])
            : this.onGoBack();
        },
        error => console.log(error)
      );

  }

  onGoBack() {
    // это не понятно!
    // this.router.navigate(['./../../'], { relativeTo: this.route});

    // так лучше
    // this.router.navigate(['/users']);

    // еще один вариант
    this.location.back();
  }
}
