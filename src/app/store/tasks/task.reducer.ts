// src/app/store/tasks/task.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import * as TaskActions from './task.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface TaskState extends EntityState<Task> {
  loading: boolean;
}

export const adapter = createEntityAdapter<Task>();

export const initialState = adapter.getInitialState({
  loading: false,
});

const taskReducer = createReducer(
  initialState,
  on(TaskActions.addTask, (state, { task }) => adapter.addOne(task, state)),
  on(TaskActions.updateTask, (state, { task }) => adapter.upsertOne(task, state)),
  on(TaskActions.deleteTask, (state, { taskId }) => adapter.removeOne(taskId, state)),
  on(TaskActions.loadTasks, state => ({ ...state, loading: true })),
  on(TaskActions.tasksLoaded, (state, { tasks }) => adapter.setAll(tasks, { ...state, loading: false }))
);

export function reducer(state: TaskState | undefined, action: Action) {
  return taskReducer(state, action);
}

const { selectAll } = adapter.getSelectors();

export const selectAllTasks = selectAll;
export const selectLoading = (state: TaskState) => state.loading;
