import { TasksActionTypes, TasksActions } from './tasks.actions';
import { TasksState, initialTasksState } from './tasks.state';

import { TaskModel } from './../../../tasks/models/task.model';

export function tasksReducer(
  state = initialTasksState,
  action: TasksActions
): TasksState {
  console.log(`Reducer: Action came in! ${action.type}`);

  switch (action.type) {
    case TasksActionTypes.GET_TASKS: {
      console.log('GET_TASKS action being handled!');
      return {
        ...state,
        loading: true
      };
    }

    case TasksActionTypes.GET_TASKS_SUCCESS: {
      console.log('GET_TASKS_SUCCESS action being handled!');
      const data = [...<Array<TaskModel>>action.payload];
      return {
        ...state,
        data,
        loading: false,
        loaded: true
      };

    }

    case TasksActionTypes.GET_TASKS_ERROR: {
      console.log('GET_TASKS_ERROR action being handled!');
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }

    case TasksActionTypes.GET_TASK: {
      console.log('GET_TASK action being handled!');
      return {
        ...state,
        loading: true
      };
    }

    case TasksActionTypes.GET_TASK_SUCCESS: {
      console.log('GET_TASK_SUCCESS action being handled!');
      const selectedTask = { ...<TaskModel>action.payload };
      return {
        ...state,
        loading: false,
        loaded: true,
        selectedTask
      };
    }

    case TasksActionTypes.GET_TASK_ERROR: {
      console.log('GET_TASK_ERROR action being handled!');
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }

    case TasksActionTypes.CREATE_TASK: {
      console.log('CREATE_TASK action being handled!');
      return {...state};
    }

    case TasksActionTypes.UPDATE_TASK: {
      console.log('UPDATE_TASK action being handled!');

      const id = (<TaskModel>action.payload).id;
      const data = state.data.map(task => {
        if (task.id === id) {
          return {...action.payload, done: true};
        }

        return task;
      });

      return {
        ...state,
        data
      };

    }

    case TasksActionTypes.DONE_TASK: {
      console.log('DONE_TASK action being handled!');
      return {...state};
    }

    case TasksActionTypes.DELETE_TASK: {
      console.log('DELETE_TASK action being handled!');
      return {...state};
    }

    default: {
      console.log('UNKNOWN_TASK action being handled!');
      return state;
    }
  }
}
