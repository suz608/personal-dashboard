import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { Tabs } from './tabs/tabs';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ThemeService } from './shared/theme-color';
import { DarkmodeService } from './shared/darkmode';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Loader } from './loader/loader';
import { environment } from '../environments/environment.development';
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
              transform: 'scale(1.1)'
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
  fallbackIndex = 0;
  private themeSubscription: Subscription | null = null;
  private darkmodeSubscription: Subscription | null = null;
  loadingImage: boolean=false;

  backgrounds: string[] = [
    "https://cdn.pixabay.com/photo/2017/08/01/11/38/sea-2564601_1280.jpg",
  ]
  
  constructor(private themeService: ThemeService, private darkmodeService:DarkmodeService, private renderer: Renderer2) {}

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
    this.loadingImage = true;

    const maxRetries = 5;
    const timeoutMs = 1000;

    const fallbackImages = [
      "https://cdn.pixabay.com/photo/2025/07/08/06/59/grass-9702166_1280.jpg",
      "https://cdn.pixabay.com/photo/2025/03/07/13/11/flower-9453062_1280.jpg",
      "https://cdn.pixabay.com/photo/2021/11/25/20/52/river-6824576_1280.jpg"
    ];

    const API_KEY = environment.pixabayKey;
    const API_URL = 'https://pixabay.com/api/';
    const categories = [
      'beach', 'city', 'forest', 'mountain', 'technology', 'animals', 'ocean', 'space', 'flowers'
    ];

    const loadImage = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          this.renderer.setStyle(document.body, 'backgroundImage', `url(${url})`);
          this.backgrounds.push(url);
          resolve();
        };
        img.onerror = reject;
        img.src = url;
      });
    };

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // Construct API request
        const query = categories[Math.floor(Math.random() * categories.length)];
        const url = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&safesearch=True&per_page=10`;

        const request = fetch(url).then(res => res.json());

        const response: any = await Promise.race([
          request,
          new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeoutMs))
        ]);

        if (response.totalHits > 0) {
          const randomIndex = Math.floor(Math.random() * response.hits.length);
          const imageUrl = response.hits[randomIndex].largeImageURL;

          if (this.backgrounds.includes(imageUrl)) {
            continue; // Duplicate — retry
          }

          await loadImage(imageUrl); // Load image
          this.loadingImage = false;
          return;
        }

      } catch (err) {
        console.warn(`Attempt ${attempt + 1} failed:`, err);
      }
    }

    // All retries failed — use fallback
    const fallbackUrl = fallbackImages[this.fallbackIndex];
    this.fallbackIndex = (this.fallbackIndex + 1) % fallbackImages.length;

    try {
      await loadImage(fallbackUrl);
    } catch (err) {
      console.error("Fallback image failed to load as well:", err);
    } finally {
      this.loadingImage = false;
    }
  }

}