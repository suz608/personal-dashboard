import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { Tabs } from './tabs/tabs';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ThemeService } from './shared/theme-color';
import { DarkmodeService } from './shared/darkmode';
import { BackgroundImage} from './shared/background-image';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Loader } from './loader/loader';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatIcon, Tabs, RouterOutlet, MatProgressSpinnerModule, Loader],
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
      ]),

      // Animation for non-tab elements
      transition('* => secondary', [
        style({
          position: 'relative',
        }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(0.8)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              transform: 'scale(1.2)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ]),

      transition('secondary => *', [
        query(':enter, :leave', [
          style({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' })
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(1.25)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              transform: 'scale(0.8)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ])

    ]),
    
  ]
})

export class App implements OnInit, OnDestroy {
  currentTime: Date = new Date();
  currentTheme: string = '';
  darkmodeOn: boolean = true;
  private intervalId: any;
  private themeSubscription: Subscription | null = null;
  private darkmodeSubscription: Subscription | null = null;
  loadingImage: boolean=false;

  backgrounds: string[] = [
    "https://cdn.pixabay.com/photo/2017/08/01/11/38/sea-2564601_1280.jpg"
  ]
  
  constructor(private themeService: ThemeService, private darkmodeService:DarkmodeService, private bgService: BackgroundImage, private renderer: Renderer2) {}

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

    let imgUrl = this.backgrounds[0]
    const img = new Image();
    img.onload = () => { //The onload event handler will only be triggered when the image is fully loaded
      this.renderer.setStyle(document.body, 'backgroundImage', `url(${imgUrl})`);
    };
    img.src = imgUrl;
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

  // // Method to check if an outlet is activated
  // prepareRoute(outlet: RouterOutlet) {
  //   if (outlet.isActivated) {
  //     // return outlet.activatedRoute.snapshot.url;  // Returns the URL of the activated route
  //     return outlet.activatedRouteData['tab']; // To go thru pages like a book, get index of it.
  //   }
  //   return '';
  // }

  // Updated method: returns the index of tab or 'secondary'
  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tab']
      if (!tab) return 'secondary'
      return tab
    }
  }


  async refreshImage() {
    this.loadingImage = true; // Set loading to true before loading the image

    // Limit the number of retries to prevent an infinite loop in case all images are already used
    const maxRetries = 5;
    let retries = 0;

    while (retries < maxRetries) {
      const imgUrl = await this.bgService.getImage(); // Get the image URL

      // Check if the image URL already exists in the backgrounds array
      const alreadyGot = this.backgrounds.includes(imgUrl);
      if (alreadyGot) {
        retries++; // Increment retry counter if the image is already in the list
        continue; // Skip to next iteration to try a new image
      }

      const img = new Image();
      img.onload = () => {
         // Set the background image once the image is loaded
        this.renderer.setStyle(document.body, 'backgroundImage', `url(${imgUrl})`);

        // Add the new unique image URL to the backgrounds list
        this.backgrounds.push(imgUrl);

        // Stop loading once the image is successfully applied
        this.loadingImage = false;
      };

      img.onerror = (error) => {
        console.error('Error loading image:', error);
        retries++; // Increment retry counter on image load failure
        if (retries >= maxRetries) {
          console.warn('Max retries reached, no new image found.');
          this.loadingImage = false; // Stop loading if no new image is found
        }
      };

      img.src = imgUrl; // Start loading the image
      return;  // Exit the function as we have a new unique image
    }
  }

}
