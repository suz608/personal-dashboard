import { Injectable, OnDestroy} from '@angular/core';
import { Observable, Subscription, fromEvent, filter, map, of } from 'rxjs';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService implements OnDestroy{

bookmarks: Bookmark[] = []

  private storageEvent$: Observable<StorageEvent>;
  private storageEventSubscription!: Subscription;

  constructor() {
    this.loadState();

    // Define the observable for listening to storage events
    this.storageEvent$ = fromEvent<StorageEvent>(window, 'storage').pipe(
      filter(event => event.key === 'bookmarks'), // Filter for 'bookmarks' key
      filter(event => event.newValue !== null)   // Ensure there's a new value in localStorage
    );

    // Subscribe to the storage event observable
    this.storageEventSubscription = this.storageEvent$.subscribe(event => {
      const newbookmarks= JSON.parse(event.newValue as string);
      if (newbookmarks) {
        this.bookmarks = newbookmarks;
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

  getBookmarks(){
    return this.bookmarks
  }

  getBookmark(id: string) {
    return this.bookmarks.find(b => b.id === id)
    /* Return null when can't find anything */
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark)
    this.saveState();
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    const bookmark = this.getBookmark(id)
    if (bookmark) {
      Object.assign(bookmark, updatedFields)
      this.saveState();
    } else {
      console.error(`Bookmark with id ${id} not found.`)
    }
  }

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex(b => b.id === id)
    if (bookmarkIndex == -1) return
    this.bookmarks.splice(bookmarkIndex, 1)
    this.saveState();
  }

  saveState() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  loadState() {
    try {
      const bookmarksInStorage = localStorage.getItem('bookmarks');

      if (bookmarksInStorage) {
        this.bookmarks = JSON.parse(bookmarksInStorage);
      } else {
        console.log('No bookmarks found in localStorage.');
      }

    } catch (e) {
      console.error('There was an error retrieving the bookmarks from localStorage:', e);
    }
  }
}
