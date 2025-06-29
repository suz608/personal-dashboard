import { Component, OnInit } from '@angular/core';
import { TodoItem } from "../todo-item/todo-item";
import { Router } from '@angular/router';
import { TodoService } from '../shared/todo';
import { Todo } from '../shared/todo.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-todos',
  imports: [TodoItem,MatIcon],
  templateUrl: './todos.html',
  styleUrls: ['./todos.scss']
})
export class Todos implements OnInit {

  todos!: Todo[];

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  toggleCompleted(todo: Todo ){
    this.todoService.updateTodo(todo.id,{completed:!todo.completed})
  }

  navigateToAddTodo() {
    this.router.navigate(['/todos/add']);
  }
}
