import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { EditorToolComponent } from './editor-tool.component';
import { SelectorToolComponent } from './selector-tool/selector-tool.component';
import { DrawerModule } from '../drawer/drawer.module';
import { DrawerComponent } from '../drawer/drawer.component';
import { EditableDrawerComponent } from '../editable-drawer/editable-drawer.component';
import { ObjectCreationToolComponent } from './object-creation-tool/object-creation-tool.component';
import { PenToolComponent } from './pen-tool/pen-tool.component';
import { TextEditToolComponent } from './text-edit-tool/text-edit-tool.component';
import { EditableTextAreaComponent } from './editable-text-area/editable-text-area.component';
import { CalloutPointToolComponent } from './callout-point-tool/callout-point-tool.component';


@NgModule({
  imports: [CommonModule, DrawerModule.forRoot()],

  declarations: [EditorToolComponent, SelectorToolComponent, ObjectCreationToolComponent, PenToolComponent, TextEditToolComponent, EditableTextAreaComponent, CalloutPointToolComponent], 
  exports: [DrawerComponent, EditorToolComponent], 
  providers: [],
  entryComponents: [
  ]
})

export class EditorModule {
  static forRoot(): ModuleWithProviders { return {ngModule: EditorModule, providers: []}; }
}