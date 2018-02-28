import { BrowserModule } from '@angular/platform-browser';
import { DrawerLibraryModule, DrawerObjectHelperService } from './drawer/drawer-library.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DrawerLibraryModule.forRoot()
  ],
  providers: [DrawerObjectHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
//TESTING PUSH