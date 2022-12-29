import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AssetsTableComponent } from './assets-table.component';
import { CryptoService } from '../crypto.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AssetPipe } from '../asset.pipe';

describe('AssetsTableComponent', () => {
  let component: AssetsTableComponent;
  let fixture: ComponentFixture<AssetsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AssetsTableComponent,
        AssetPipe
      ],
      imports: [
        HttpClientTestingModule,
        NgxPaginationModule
      ],
      providers: [CryptoService]
    }).compileComponents();

    fixture = TestBed.createComponent(AssetsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table headings', () => {
    const fixture = TestBed.createComponent(AssetsTableComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('thead')?.textContent).toContain(
      'Name'
    );
  });
});
