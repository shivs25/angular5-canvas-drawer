import { BrowserModule } from '@angular/platform-browser';
import { DrawerLibraryModule } from './drawer/drawer-library.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DrTextComponent } from './dr-text/dr-text.component';

@NgModule({
  declarations: [
    AppComponent,
    DrTextComponent
  ],
  imports: [
    BrowserModule,
    DrawerLibraryModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//TESTING PUSH