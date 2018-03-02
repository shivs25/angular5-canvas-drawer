import { CommonModule } from '@angular/common';import { NgModule, ModuleWithProviders } from '@angular/core';
import { EditorToolComponent } from './editor-tool.component';
import { SelectorToolComponent } from './selector-tool/selector-tool.component';
import { DrawerModule } from '../drawer/drawer.module';
import { DrawerComponent } from '../drawer/drawer.component';
import { EditableDrawerComponent } from '../editable-drawer/editable-drawer.component';

@NgModule({
  imports: [CommonModule, DrawerModule.forRoot()],

  declarations: [EditorToolComponent, SelectorToolComponent], 
  exports: [DrawerComponent, EditorToolComponent], 
  providers: [],
  entryComponents: [
  ]
})

export class EditorModule {
  static forRoot(): ModuleWithProviders { return {ngModule: EditorModule, providers: []}; }
}