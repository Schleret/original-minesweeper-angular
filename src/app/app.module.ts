import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OgMinesweeperComponent } from './og-minesweeper/og-minesweeper.component';

@NgModule({
  declarations: [
    AppComponent,
    OgMinesweeperComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
