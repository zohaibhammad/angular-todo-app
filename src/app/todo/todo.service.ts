import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  listChanged: Subject<Todo[]> = new Subject<Todo[]>();
  startEditing: Subject<number> = new Subject<number>();
  editModeDetection: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private todoList: Todo[] = [];
  constructor() {}

  get getTodoList() {
    return [...this.todoList];
  }

  getTodo(index: number) {
    return this.todoList[index];
  }

  addTodo(value: Todo) {
    this.todoList.push({ ...value, status: false });
    this.listChanged.next([...this.todoList]);
  }

  deleteTodo(index: number) {
    this.todoList.splice(index, 1);
    this.listChanged.next([...this.todoList]);
  }

  updateTodo(index: number, value: Todo) {
    this.todoList[index] = { ...value, status: this.todoList[index].status };
    this.listChanged.next([...this.todoList]);
  }

  toggleStatus(index: number) {
    this.todoList[index].status = !this.todoList[index].status;
    this.listChanged.next([...this.todoList]);
  }
}
