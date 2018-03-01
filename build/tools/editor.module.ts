import { CommonModule } from '@angular/common';import { NgModule, ModuleWithProviders } from '@angular/core';
import { EditorToolComponent } from './editor-tool.component';
import { SelectorToolComponent } from './selector-tool/selector-tool.component';

@NgModule({
  imports: [CommonModule],

  declarations: [EditorToolComponent, SelectorToolComponent], 
  exports: [EditorToolComponent], 
  providers: [],
  entryComponents: [
  ]
})

export class EditorModule {
  static forRoot(): ModuleWithProviders { return {ngModule: EditorModule, providers: []}; }
}