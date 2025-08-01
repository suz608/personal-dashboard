import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../shared/theme-color';
import { DarkmodeService } from '../shared/darkmode';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
  imports:[FormsModule]
})
export class Settings implements OnInit{
  darkmode!: boolean;

  constructor(private themeService: ThemeService, private darkmodeService: DarkmodeService) {}

  ngOnInit(): void {
    this.darkmode = this.darkmodeService.getCurrent();
    if(!this.darkmode){
      this.darkmode = false;
    }
  }

  changeTheme(theme: string) {
    this.themeService.setTheme(theme);  // Change theme globally using the service
  }

  toggleDarkmode() {
    this.darkmode = !this.darkmode;
    this.darkmodeService.toggleDarkmode();
  }

}
