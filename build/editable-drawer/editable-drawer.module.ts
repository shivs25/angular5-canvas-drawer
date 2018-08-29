import { CommonModule } from '@angular/common';import { NgModule, ModuleWithProviders } from '@angular/core';

import { EditableDrawerComponent } from "./editable-drawer.component";
import { EditorModule } from '../tools/editor.module';

@NgModule({
  imports: [CommonModule, EditorModule.forRoot()],

  declarations: [
    EditableDrawerComponent
  ], 
  exports: [EditableDrawerComponent], 
  providers: [],
  entryComponents: [
  ]
})

export class EditableDrawerModule {
  static forRoot(): ModuleWithProviders { return {ngModule: EditableDrawerModule, providers: []}; }
}