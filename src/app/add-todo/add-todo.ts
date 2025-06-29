import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TodoService } from '../shared/todo';
import { Todo } from '../shared/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.scss'
})
export class AddTodo {
  showValidationErrors: boolean = false;

  constructor(
    private todoService: TodoService,
    private router: Router,
   // private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    // If form is invalid, show validation errors and return
    if (form.invalid) {
      this.showValidationErrors = true;
      return;
    }

    // Create the Todo object
    const todo = new Todo(form.value.text);

    // Add the new todo to the list
    this.todoService.addTodo(todo);

    // Navigate to the todos page
    this.router.navigate(['/todos']);

    // Optionally, reset the form or show success messages here
    form.reset();

    // Optionally, hide the validation errors if form is valid
    this.showValidationErrors = false;
  }

}
