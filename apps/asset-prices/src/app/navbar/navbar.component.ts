import { Component } from '@angular/core';

@Component({
  selector: 'asset-price-viewer-navbar',
  template: ` 
      <div class='nav'>
        Navbar
        <div>
            <input type="checkbox" [checked]='isDarkDefault.matches' (change)='toggleDarkMode()'>
        </div>
      </div>
  `,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public isDarkDefault = window.matchMedia('(prefers-color-scheme: dark)')

  constructor() {
    document.body.classList.toggle('dark-theme', this.isDarkDefault.matches);
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
  }
}
