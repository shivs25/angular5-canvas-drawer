import { Component, OnInit, Input } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { EditorToolType } from '../models/enums';

@Component({
  selector: 'app-editor-tool',
  template: "\n    <app-selector-tool *ngIf=\"SELECTOR_TOOL === (elementState | async)?.present.selectedTool\"></app-selector-tool>\n  ",
  styles: ["\n\n  "]
})
export class EditorToolComponent implements OnInit {

  SELECTOR_TOOL: EditorToolType = EditorToolType.SELECTOR_TOOL;

  @select() elementState;

  constructor() { }

  ngOnInit() {
    
  }

}
