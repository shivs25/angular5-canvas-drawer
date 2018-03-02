import { CommonModule } from '@angular/common';import { NgModule, ModuleWithProviders } from '@angular/core';
import { EditorToolComponent } from './editor-tool.component';
import { SelectorToolComponent } from './selector-tool/selector-tool.component';
import { DynamicSvgDirective } from '../dynamic-svg/dynamic-svg.directive';

@NgModule({
  imports: [CommonModule],

  declarations: [EditorToolComponent, SelectorToolComponent, DynamicSvgDirective], 
  exports: [EditorToolComponent, DynamicSvgDirective], 
  providers: [DynamicSvgDirective],
  entryComponents: [
  ]
})

export class EditorModule {
  static forRoot(): ModuleWithProviders { return {ngModule: EditorModule, providers: [DynamicSvgDirective]}; }
}