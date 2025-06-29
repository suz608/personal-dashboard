import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [
    new Todo("Make a cup of coffee"), new Todo("Check emails"), new Todo("Buy groceries")
  ];

  constructor() {}

  getTodos(){
    return this.todos
  }

  getTodo(id: string): Todo | undefined {
    return this.todos.find(t => t.id === id);
  }

  addTodo(todo :Todo){
    this.todos.push(todo)
  }

  updateTodo(id:string, updatedTodoFields: Partial<Todo>){
    const todo = this.getTodo(id);
    if (todo) {
      Object.assign(todo, updatedTodoFields);
    } else {
      console.warn(`Todo with id ${id} not found!`);
    }
  }

  deleteTodo(id:string){
    const ind = this.todos.findIndex(t => t.id === id)
    if(ind === -1) return
    this.todos.splice(ind,1)
  }

//   deleteTodo(id: number): void {
//   // Assuming you handle the todo deletion logic here
//   this.todos = this.todos.filter(todo => todo.id !== id); // Example
// }
}
