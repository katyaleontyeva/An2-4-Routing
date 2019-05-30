import { TaskModel } from './../../../tasks/models/task.model';

export interface TasksState {
  data: ReadonlyArray<TaskModel>; // ReadonlyArray - из массива убраны методы, которые мутируют данные
  selectedTask: Readonly<TaskModel>; // Еще можно хранить индекс или id задачи
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialTasksState: TasksState = {
  data: [],
  selectedTask: null,
  loading: false,
  loaded: false,
  error: null
};
