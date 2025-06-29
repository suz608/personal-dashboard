import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmark-tile',
  imports: [CommonModule],
  templateUrl: './bookmark-tile.html',
  styleUrls: ['./bookmark-tile.scss']
})
export class BookmarkTile implements OnInit {
  @Input() bookmark!: Bookmark;
  icon!: string;
  faviconError: boolean = false;

  ngOnInit(): void {
    if (this.bookmark && this.bookmark.url) {
      try {
        const url = new URL(this.bookmark.url);  // Ensuring it's a valid URL
        this.icon = `${url.origin}/favicon.ico`;  // Using the origin to construct favicon URL

        // Check if the favicon exists by trying to load it
        const image = new Image();
        image.onload = () => {
          // Favicon exists
          this.faviconError = false;
        };
        image.onerror = () => {
          // Favicon doesn't exist
          this.faviconError = true;
        };
        image.src = this.icon;  // Trigger favicon loading
      } catch (e) {
        this.faviconError = true;
        console.error('Invalid URL:', this.bookmark.url);
      }
    }
  }

  openBookmark(): void {
    if(this.bookmark.url){
       window.open(this.bookmark.url, '_blank'); // '_blank' opens the URL in a new tab or window
    }else{
      console.log('URL error')
    }
  }
}
