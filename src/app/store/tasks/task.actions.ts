// src/app/store/tasks/task.actions.ts
import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ taskId: string }>());
export const loadTasks = createAction('[Task] Load Tasks');
export const tasksLoaded = createAction('[Task] Tasks Loaded', props<{ tasks: Task[] }>());
