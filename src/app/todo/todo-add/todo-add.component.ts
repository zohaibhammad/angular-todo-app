import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
})
export class TodoAddComponent implements OnInit, OnDestroy {
  editMode: boolean = false;
  editItemIndex: number = -1;

  todoForm: FormGroup = new FormGroup({
    category: new FormControl(null, Validators.required),
    task: new FormControl(null, Validators.required),
  });

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.startEditing.subscribe((index: number) => {
      this.editMode = true;
      this.todoService.editModeDetection.next(this.editMode);
      this.editItemIndex = index;
      const todo: Todo = this.todoService.getTodo(index);
      this.todoForm.setValue({
        category: todo.category,
        task: todo.task,
      });
    });
  }

  onSubmit() {
    if (this.editMode)
      this.todoService.updateTodo(this.editItemIndex, this.todoForm.value);
    else this.todoService.addTodo(this.todoForm.value);

    this.todoForm.reset();
    this.editMode = false;
    this.todoService.editModeDetection.next(this.editMode);
  }

  onClear() {
    this.editMode = false;
    this.todoService.editModeDetection.next(this.editMode);
    this.todoForm.reset();
  }

  ngOnDestroy(): void {}
}
