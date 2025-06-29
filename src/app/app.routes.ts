import { Routes } from '@angular/router';
import { Bookmarks } from './bookmarks/bookmarks';
import { Settings } from './settings/settings';
import { Todos } from './todos/todos';
import { AddTodo } from './add-todo/add-todo';
import { AddBookmark } from './add-bookmark/add-bookmark';
import { ManageBookmarks } from './manage-bookmarks/manage-bookmarks';
import { EditBookmark } from './edit-bookmark/edit-bookmark';
import { Timer } from './timer/timer';

export const routes: Routes = [
  { path: '',  component: Bookmarks, data: {tab: 1}},
  { path: 'bookmarks', component: Bookmarks, data: {tab: 1}},
  { path: 'bookmarks/add', component: AddBookmark},
  { path: 'bookmarks/manage', component: ManageBookmarks, children:[
    { path: ':id', component: EditBookmark},
  ]},
  { path: 'todos', component: Todos, data: {tab: 2}},
  { path: 'todos/add', component: AddTodo},
  { path: 'timer', component: Timer, data: {tab: 3}},
  { path: 'settings', component: Settings, data: {tab: 4}},
];
