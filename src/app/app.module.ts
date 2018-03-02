import { BrowserModule } from '@angular/platform-browser';
import { DrawerLibraryModule } from './drawer/drawer-library.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DrawerObjectHelperService } from './drawer/services/drawer-object-helper.service';

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