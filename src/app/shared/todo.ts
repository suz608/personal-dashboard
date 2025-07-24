import { Observable, Subscription, fromEvent, filter, map } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})

export class TodoService implements OnDestroy{
  todos: Todo[] = [];

  private storageEvent$: Observable<StorageEvent>;
  private storageEventSubscription!: Subscription;

  constructor() {
    this.loadState();

    // Define the observable for listening to storage events
    this.storageEvent$ = fromEvent<StorageEvent>(window, 'storage').pipe(
      filter(event => event.key === 'todos'), // Filter for 'todos' key
      filter(event => event.newValue !== null)   // Ensure there's a new value in localStorage
    );

    // Subscribe to the storage event observable
    this.storageEventSubscription = this.storageEvent$.subscribe(event => {
      const newTodos= JSON.parse(event.newValue as string);
      if (newTodos) {
        this.todos = newTodos;
      }
    });
  }

  // Cleanup when the service is destroyed
  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.storageEventSubscription) {
      this.storageEventSubscription.unsubscribe();
    }
  }

  getTodos(){
    return this.todos
  }

  getTodo(id: string): Todo | undefined {
    return this.todos.find(t => t.id === id);
  }

  addTodo(todo :Todo){
    this.todos.push(todo)
    this.saveState();
  }

  updateTodo(id:string, updatedTodoFields: Partial<Todo>){
    const todo = this.getTodo(id);
    if (todo) {
      Object.assign(todo, updatedTodoFields);
      this.saveState();
    } else {
      console.warn(`Todo with id ${id} not found!`);
    }
  }

  deleteTodo(id:string){
    const ind = this.todos.findIndex(t => t.id === id)
    if(ind === -1) return
    this.todos.splice(ind,1)
    this.saveState();
  }

  saveState() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadState() {
    try {
      const todosInStorage = localStorage.getItem('todos');

      if (todosInStorage) {
        this.todos = JSON.parse(todosInStorage);
      } else {
        console.log('No todos found in localStorage.');
      }

    } catch (e) {
      console.error('There was an error retrieving the todos from localStorage:', e);
    }
  }
}
