import { Injectable} from '@angular/core';
import { Bookmark } from './bookmark.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService{

  bookmarks: Bookmark[] = [
    new Bookmark('Pixabay','https://pixabay.com'),
    new Bookmark('Angular Design Icons','https://jossef.github.io/material-design-icons-iconfont/'),
    new Bookmark('Angular Dev','https://angular.dev/')
  ]

  constructor() {

  }

  getBookmarks(): Observable<Bookmark[]> {
    return of(this.bookmarks);
  }

  getBookmark(id: string) {
    return this.bookmarks.find(b => b.id === id)
    /* Return null when can't find anything */
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark)
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    const bookmark = this.getBookmark(id)
    if (bookmark) {
      Object.assign(bookmark, updatedFields)
    } else {
      console.error(`Bookmark with id ${id} not found.`)
    }
  }

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex(b => b.id === id)
    if (bookmarkIndex == -1) return
    this.bookmarks.splice(bookmarkIndex, 1)
  }

}
