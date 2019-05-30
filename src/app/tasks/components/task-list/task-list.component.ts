import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, TasksState } from './../../../core/+store';
import * as TasksActions from './../../../core/+store/tasks/tasks.actions';

// rxjs
import { Observable } from 'rxjs';

import { TaskModel } from './../../models/task.model';


@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Promise<Array<TaskModel>>;
  tasksState$: Observable<TasksState>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    console.log('We have a store! ', this.store);
    // Подписываемся на получение данных из Store
    // При изменении State будет обновляться автоматически
    this.tasksState$ = this.store.pipe(select('tasks'));

    // Диспатчим экшен который запускает цепочку получения данных
    this.store.dispatch(new TasksActions.GetTasks());
  }

  onCompleteTask(task: TaskModel): void {
    this.store.dispatch(new TasksActions.DoneTask(task));
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  onCreateTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  onDeleteTask(task: TaskModel) {

  }

}
