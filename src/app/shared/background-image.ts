import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { lastValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundImage {
  private API_KEY = environment.pixabayKey;
  private API_URL = 'https://pixabay.com/api/';

  private categories = [
    'beach', 'city', 'forest', 'mountain', 'technology', 'animals', 'ocean', 'space', 'flowers'
  ];

  constructor(private http: HttpClient) {}

  async getImage(): Promise<string>{
    const query = this.categories[Math.floor(Math.random() * this.categories.length)];
    const url = `${this.API_URL}?key=${this.API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&safesearch=True&per_page=10`;

    try {
      const response: any = await lastValueFrom(this.http.get<any>(url)); 
      if (response.totalHits > 0) {
        const randomIndex = Math.floor(Math.random() * response.hits.length);
        return response.hits[randomIndex].largeImageURL;  // Return the image URL
      } else {
        return "https://cdn.pixabay.com/photo/2025/07/16/07/19/british-shorthair-9717301_1280.jpg";  // Default image
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      return "https://cdn.pixabay.com/photo/2025/07/16/07/19/british-shorthair-9717301_1280.jpg";  // Default image on error
    }
  }
}
