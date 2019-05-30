import { Action } from '@ngrx/store';

import { TaskModel } from './../../../tasks/models/task.model';

// [Tasks]- namespace
export enum TasksActionTypes {
  GET_TASKS = '[Tasks] GET_TASKS',
  GET_TASKS_SUCCESS = '[Tasks] GET_TASKS_SUCCESS',
  GET_TASKS_ERROR   = '[Tasks] GET_TASKS_ERROR',

  GET_TASK = '[Tasks] GET_TASK',
  GET_TASK_SUCCESS = '[Tasks] GET_TASK_SUCCESS',
  GET_TASK_ERROR = '[Tasks] GET_TASK_ERROR',

  CREATE_TASK = '[Tasks] CREATE_TASK',

  UPDATE_TASK = '[Tasks] UPDATE_TASK',
  UPDATE_TASK_SUCCESS = '[Tasks] UPDATE_TASK_SUCCESS',
  UPDATE_TASK_ERROR   = '[Tasks] UPDATE_TASK_ERROR',

  DONE_TASK = '[Tasks] DONE_TASK',
  DELETE_TASK = '[Tasks] DELETE_TASK'
}

export class GetTasks implements Action {
  readonly type = TasksActionTypes.GET_TASKS;
}

export class GetTasksSuccess implements Action {
  readonly type = TasksActionTypes.GET_TASKS_SUCCESS;
  constructor(public payload: TaskModel[]) { }
}

export class GetTasksError implements Action {
  readonly type = TasksActionTypes.GET_TASKS_ERROR;
  constructor(public  payload: Error | string) { }
}

export class GetTask implements Action {
  readonly type = TasksActionTypes.GET_TASK;
  constructor(public payload: number) { } // id
}

export class GetTaskSuccess implements Action {
  readonly type = TasksActionTypes.GET_TASK_SUCCESS;
  constructor(public payload: TaskModel) { }
}

export class GetTaskError implements Action {
  readonly type = TasksActionTypes.GET_TASK_ERROR;
  constructor(public  payload: Error | string) { }
}

export class CreateTask implements Action {
  readonly type = TasksActionTypes.CREATE_TASK;
  constructor(public payload: TaskModel) { }
}

export class UpdateTask implements Action {
  readonly type = TasksActionTypes.UPDATE_TASK;
  constructor(public payload: TaskModel) { }
}

export class UpdateTaskSuccess implements Action {
  readonly type = TasksActionTypes.UPDATE_TASK_SUCCESS;
  constructor(public payload: TaskModel) { }
}

export class UpdateTaskError implements Action {
  readonly type = TasksActionTypes.UPDATE_TASK_ERROR;
  constructor(public payload: Error | string) { }
}

export class DoneTask implements Action {
  readonly type = TasksActionTypes.DONE_TASK;
  constructor(public payload: TaskModel) { }
}

export class DeleteTask implements Action {
  readonly type = TasksActionTypes.DELETE_TASK;
  constructor(public payload: TaskModel) { }
}

export type TasksActions
  = GetTasks
  | GetTasksSuccess
  | GetTasksError

  | GetTask
  | GetTaskSuccess
  | GetTaskError

  | CreateTask
  | UpdateTask
  | UpdateTaskSuccess
  | UpdateTaskError
  | DoneTask
  | DeleteTask;
