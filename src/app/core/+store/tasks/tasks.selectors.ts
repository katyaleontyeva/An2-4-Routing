// Селекторы позволяют получить срезы информации
// Это мемоизированные функции, т.е. если не меняются параметры, то возвращают закэшированные значения,
// поэтому выборка проивходит быстро

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TasksState } from './tasks.state';

export const getTasksState = createFeatureSelector<TasksState>('tasks');

export const getTasksData = createSelector(
  getTasksState, // возвращает state
  (state: TasksState) => state.data // из state возвращает необходимые данные
);

export const getTasksError = createSelector(
  getTasksState,
  (state: TasksState) => state.error
);

export const getSelectedTask = createSelector(
  getTasksState,
  (state: TasksState) => state.selectedTask
);

export const getTasksLoaded = createSelector(
  getTasksState,
  (state: TasksState) => state.loaded
);
