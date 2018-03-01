import { CommonModule } from '@angular/common';import { NgModule, ModuleWithProviders } from '@angular/core';
import { EditorToolComponent } from './editor-tool.component';

@NgModule({
  imports: [CommonModule],

  declarations: [EditorToolComponent], 
  exports: [EditorToolComponent], 
  providers: [],
  entryComponents: [
  ]
})

export class EditorModule {
  static forRoot(): ModuleWithProviders { return {ngModule: EditorModule, providers: []}; }
}