import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroMainComponent } from './hero-main/hero-main.component';
import { AssetsTableComponent } from './assets-table/assets-table.component';
import { CryptoService } from './crypto.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroMainComponent,
    AssetsTableComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [CryptoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
