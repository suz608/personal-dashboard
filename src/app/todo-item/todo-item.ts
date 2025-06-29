import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.html',
  styleUrls: ['./todo-item.scss'],
  imports:[MatIcon],
})
export class TodoItem implements OnInit {
  @Input() todo!: Todo;

  constructor() {}

  ngOnInit(): void {}

}
