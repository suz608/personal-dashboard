import { Component} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tabs',
  imports: [RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss'
})

export class Tabs {

}
