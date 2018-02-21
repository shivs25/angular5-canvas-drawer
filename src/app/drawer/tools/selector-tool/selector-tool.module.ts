import { CommonModule } from '@angular/common';import { NgModule, ModuleWithProviders } from '@angular/core';
import { SelectorToolComponent } from './selector-tool.component';


@NgModule({
  imports: [CommonModule],
  declarations:[SelectorToolComponent],
  exports: [SelectorToolComponent]
})

export class SelectorToolModule {
  static forRoot(): ModuleWithProviders { return {ngModule: SelectorToolModule, providers: []}; }
}