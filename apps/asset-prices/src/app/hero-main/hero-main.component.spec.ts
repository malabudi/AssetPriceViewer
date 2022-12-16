import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroMainComponent } from './hero-main.component';

describe('HeroMainComponent', () => {
  let component: HeroMainComponent;
  let fixture: ComponentFixture<HeroMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroMainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading 1', () => {
    const fixture = TestBed.createComponent(HeroMainComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Asset Price Viewer'
    );
  });

  it('should render paragraph', () => {
    const fixture = TestBed.createComponent(HeroMainComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain(
      'Check out the latest prices on cryptocurrency, stocks, and precious metals'
    );
  });
});
