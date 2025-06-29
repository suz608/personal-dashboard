import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Bookmark } from '../shared/bookmark.model';
import { Router, RouterLink } from '@angular/router';
import { BookmarkService } from '../shared/bookmark';

@Component({
  selector: 'app-add-bookmark',
  imports: [FormsModule, RouterLink],
  templateUrl: './add-bookmark.html',
  styleUrl: './add-bookmark.scss'
})

export class AddBookmark {
  constructor(
    private bookmarkService: BookmarkService,
    private router: Router) { }

  onFormSubmit(form: NgForm) {
    const { name, url } = form.value
    const bookmark = new Bookmark(name, url)
    this.bookmarkService.addBookmark(bookmark)
    this.router.navigateByUrl("/bookmarks")
  }
}
