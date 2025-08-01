import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { LoaderService } from '../shared/loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss'
})
export class Loader implements OnInit {
  loading:boolean = false;
  private loadingSubscription: Subscription | null = null;
  constructor(private loaderService: LoaderService) {}
  ngOnInit(): void {
    this.loadingSubscription = this.loaderService.loading$.subscribe((loading) => {
        this.loading = loading;
    });
  }
  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
