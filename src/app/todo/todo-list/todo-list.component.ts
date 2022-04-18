import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  list: Todo[] = [];
  completed: number = -1;
  isSingleClick: boolean = true;
  editMode: boolean = false;
  addSub: Subscription = new Subscription();
  editModeSub: Subscription = new Subscription();
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.addSub = this.todoService.listChanged.subscribe((list) => {
      this.list = list;
    });
    this.editModeSub = this.todoService.editModeDetection.subscribe((mode) => {
      this.editMode = mode;
    });
  }
  ngOnDestroy(): void {
    this.addSub.unsubscribe();
  }

  onComplete(index: number): void {
    this.isSingleClick = true;
    setTimeout(() => {
      if (this.isSingleClick) {
        if (!this.editMode) this.todoService.toggleStatus(index);
      }
    }, 250);
  }
  onDblClick(index: number) {
    this.isSingleClick = false;
    this.todoService.startEditing.next(index);
  }

  onDelete(index: number): void {
    this.todoService.deleteTodo(index);
  }
}
