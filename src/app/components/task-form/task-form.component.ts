// src/app/components/task-form/task-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Task } from '../../models/task.model';
import * as TaskActions from '../../store/tasks/task.actions';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['low', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = {
        id: uuidv4(),
        ...this.taskForm.value,
        status: 'to-do',
        history: [`Task created on ${new Date().toISOString()}`]
      };
      this.store.dispatch(TaskActions.addTask({ task }));
      this.taskForm.reset({ priority: 'low' });
    }
  }
}
