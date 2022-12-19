import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroMainComponent } from './hero-main/hero-main.component';
import { AssetsTableComponent } from './assets-table/assets-table.component';
import { CryptoService } from './crypto.service';
import { AssetPipe } from './asset.pipe';
import { SortableHeaderDirective } from './sortable-header.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeroMainComponent,
    AssetsTableComponent,
    AssetPipe,
    SortableHeaderDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  providers: [CryptoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
