import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tabs } from './tabs/tabs';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ThemeService } from './shared/theme-color';
import { DarkmodeService } from './shared/darkmode';

@Component({
  selector: 'app-root',
  imports: [ CommonModule,Tabs,RouterOutlet,],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [
    trigger('fadeInOut', [

      // Catch all route changes (* <=> *).
      // Catch only when index increase ':increment'.
      transition(':increment', [
        // Before enter and leave, set the position of elements
        query(':enter, :leave', [
          style({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' })
        ], { optional: true }),

        group([
        // Leave animation - Fade out
          query(':leave', [
            style({ opacity: 1 }), // Start with opacity 1
            animate('0.2s ease-in', style({ opacity: 0, transform:'translateX(-80px)' }))  // Fade to opacity 0
            /* Ease in: The animation starts slow and then speeds up as it progresses. */
          ], { optional: true }),

          // Enter animation - Fade in
          query(':enter', [
            style({ opacity: 0, transform:'translateX(80px)' }), // Start with opacity 0
            animate('0.2s 0.1s', style({ opacity: 1,  transform:'translateX(0)'}))  // Fade to opacity 1
            // The second param is the delay time.
          ], { optional: true }),
        ])
      ]),

      // ':decrement' counterpart
      transition(':decrement', [
        query(':enter, :leave', [
          style({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' })
        ], { optional: true }),

        group([
          query(':leave', [
            style({ opacity: 1 }),
            animate('0.2s ease-in', style({ opacity: 0, transform:'translateX(80px)' }))
          ], { optional: true }),

          query(':enter', [
            style({ opacity: 0, transform:'translateX(-80px)' }),
            animate('0.2s 0.1s', style({ opacity: 1,  transform:'translateX(0)'}))
          ], { optional: true }),
        ])
      ])

    ])
  ]
})
export class App  implements OnInit, OnDestroy {
  currentTime: Date = new Date();
  currentTheme: string = '';
  darkmodeOn: boolean = true;
  private intervalId: any;
  private themeSubscription: Subscription | null = null;
  private darkmodeSubscription: Subscription | null = null;

  constructor(private themeService: ThemeService, private darkmodeService:DarkmodeService) {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentTime = new Date();
    }, 1000); // Update every second

    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });

    this.darkmodeSubscription = this.darkmodeService.darkMode$.subscribe((darkmode) => {
      this.darkmodeOn = darkmode;
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.darkmodeSubscription) {
      this.darkmodeSubscription.unsubscribe();
    }
  }

  // Method to check if an outlet is activated
  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      // return outlet.activatedRoute.snapshot.url;  // Returns the URL of the activated route
      return outlet.activatedRouteData['tab']; // To go thru pages like a book, get index of it.
    }
    return '';
  }

}
