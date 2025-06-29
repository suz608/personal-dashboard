import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../shared/bookmark';
import { FormsModule, NgForm } from '@angular/forms';
import { Bookmark } from '../shared/bookmark.model';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-bookmark',
  imports: [FormsModule,CommonModule, RouterLink],
  templateUrl: './edit-bookmark.html',
  styleUrl: './edit-bookmark.scss'
})
export class EditBookmark implements OnInit{
  bookmark!: Bookmark;

  constructor(private bookmarkService: BookmarkService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      const bookmarkId = paramMap.get('id')
      if(bookmarkId){
        const temp = this.bookmarkService.getBookmark(bookmarkId)
        if(!temp){
          this.bookmark = new Bookmark('undefined','undefined')
        }else{
          this.bookmark = temp;
        }
      }else{
        this.bookmark = new Bookmark('ID error','ID error')
        console.log('Bookmark ID does not exist')
      }
    })
  }

  onFormSubmit(form: NgForm) {
    const { name, url } = form.value

    this.bookmarkService.updateBookmark(this.bookmark.id, {
      name,
      url: new URL(url)
    })

    //this.notificationService.show('Bookmark updated!')
  }

  delete() {
    this.bookmarkService.deleteBookmark(this.bookmark.id)
    this.router.navigate(['../'], { relativeTo: this.route })

    //this.notificationService.show('Deleted Bookmark')
  }

}
