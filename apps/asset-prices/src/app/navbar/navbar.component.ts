import { ElementRef, ViewChild, Component, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'asset-price-viewer-navbar',
  template: ` 
      <div class='nav'>
        <div>
          <a href=''>
            <img class='main-nav-img' 
            src='https://www.reshot.com/preview-assets/icons/DUCN7XW5P4/analytics-chart-DUCN7XW5P4.svg' 
            alt='main navbar image'>
          </a>
        </div>
        <div #themeContainer class='theme-container'>
          <img #themeIcon id='theme-icon'
          src='{{ isDarkMode ? lightURL : darkURL }}' 
          alt='dark/light mode'
          title='{{ isDarkMode ? "Light Mode" : "Dark Mode" }}'>
        </div>
      </div>
  `,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit, OnInit {
  public isDarkDefault = window.matchMedia('( prefers-color-scheme: dark )');
  public darkURL = 'https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg';
  public lightURL = 'https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg';
  public isDarkMode = false;

  @ViewChild('themeContainer')
  themeContainer!: ElementRef;
  @ViewChild('themeIcon')
  themeIcon!: ElementRef;

  ngOnInit() {
    this.isDarkMode = this.isDarkDefault.matches;
  }

  ngAfterViewInit() {
    document.body.classList.toggle('dark-theme', this.isDarkDefault.matches);
    this.themeContainer.nativeElement.addEventListener('click', this.setTheme.bind(this));

    if (this.isDarkMode) {
      this.themeContainer.nativeElement.classList.add("shadow-dark");
    }
    else {
      this.themeContainer.nativeElement.classList.add("shadow-light");
    }
  }

  setTheme() {
    document.body.classList.toggle('dark-theme');

    if (this.isDarkMode) {
      this.themeContainer.nativeElement.classList.remove("shadow-dark");

      setTimeout(() => {
        this.themeContainer.nativeElement.classList.add("shadow-light");
        this.themeIcon.nativeElement.classList.remove("change");
      }, 300);

      this.themeIcon.nativeElement.classList.add("change");
      this.isDarkMode = false;
    }
    else if (this.isDarkMode == false) {
      this.themeContainer.nativeElement.classList.remove("shadow-light");
      setTimeout(() => {
        this.themeContainer.nativeElement.classList.add("shadow-dark");
        this.themeIcon.nativeElement.classList.remove("change");
      }, 300);

      this.themeIcon.nativeElement.classList.add("change");
      this.isDarkMode = true;
    }
  }
}
