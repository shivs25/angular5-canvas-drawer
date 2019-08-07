import { BrowserModule } from '@angular/platform-browser';
import { DrawerLibraryModule } from './drawer/drawer-library.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataStoreService } from './drawer/services/data-store.service';
import { DrawerObjectHelperService } from './drawer/services/drawer-object-helper.service';
import { ElementRef } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DrawerLibraryModule.forRoot()
  ],
  providers: [DrawerObjectHelperService, DataStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
//TESTING PUSH