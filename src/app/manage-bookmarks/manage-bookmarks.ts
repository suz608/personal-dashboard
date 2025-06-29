import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark';

@Component({
  selector: 'app-manage-bookmarks',
  imports: [RouterOutlet, RouterLink,RouterLinkActive],
  templateUrl: './manage-bookmarks.html',
  styleUrl: './manage-bookmarks.scss'
})
export class ManageBookmarks implements OnInit{
  bookmarks: Bookmark[] = []

  constructor(private bookmarkService: BookmarkService){}

  ngOnInit() {
    this.bookmarkService.getBookmarks().subscribe((bookmarks: Bookmark[]) => {
      this.bookmarks = bookmarks;
    });
  }
}
