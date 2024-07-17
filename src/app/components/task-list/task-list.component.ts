// src/app/components/task-list/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { CsvExportService } from '../../services/csv-export.service';
import * as TaskActions from '../../store/tasks/task.actions';
import { selectAllTasks } from '../../store/tasks/task.reducer';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private store: Store<AppState>, private csvExportService: CsvExportService) {
    this.tasks$ = this.store.select(selectAllTasks);
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }

  deleteTask(taskId: string): void {
    this.store.dispatch(TaskActions.deleteTask({ taskId }));
  }

  exportTasks(): void {
    this.tasks$.subscribe(tasks => {
      this.csvExportService.exportTasksToCSV(tasks);
    });
  }
}
