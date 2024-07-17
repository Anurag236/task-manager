// src/app/services/csv-export.service.ts
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class CsvExportService {
  exportTasksToCSV(tasks: Task[]): void {
    const csvData = this.convertTasksToCSV(tasks);
    const blob = new Blob([csvData], { type: 'text/csv' });
    saveAs(blob, 'tasks.csv');
  }

  private convertTasksToCSV(tasks: Task[]): string {
    const header = 'ID,Title,Description,Due Date,Priority,Status\n';
    const rows = tasks.map(task =>
      `${task.id},${task.title},${task.description},${task.dueDate},${task.priority},${task.status}`
    );
    return header + rows.join('\n');
  }
}
