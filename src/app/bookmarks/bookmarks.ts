import { Component } from '@angular/core';
import { BookmarkTile } from '../bookmark-tile/bookmark-tile';
import { BookmarkService } from '../shared/bookmark';
import { Bookmark } from '../shared/bookmark.model';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-bookmarks',
  imports: [BookmarkTile,MatIcon,RouterLink],
  templateUrl: './bookmarks.html',
  styleUrls: ['./bookmarks.scss']
})
export class Bookmarks {
  bookmarks: Bookmark[] = []

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit() {
    this.bookmarkService.getBookmarks().subscribe((bookmarks: Bookmark[]) => {
      this.bookmarks = bookmarks;
    });
  }
}
