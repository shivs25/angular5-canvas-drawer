import { Component, OnInit, Input } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { EditorToolType } from '../models/enums';
import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'app-editor-tool',
  template: "\n    <app-selector-tool *ngIf=\"SELECTOR_TOOL === (elementState | async)?.present.selectedTool\"></app-selector-tool>\n    <app-object-creation-tool *ngIf=\"shouldShowCreationTool()\"></app-object-creation-tool>\n  ",
  styles: ["\n\n  "]
})
export class EditorToolComponent implements OnInit {

  SELECTOR_TOOL: EditorToolType = EditorToolType.SELECTOR_TOOL;

  @select() elementState;

  constructor(private _dataService: DataStoreService) { }

  ngOnInit() {
    
  }

  shouldShowCreationTool(): boolean { 
    switch(this._dataService.selectedTool) {
      case EditorToolType.ELLIPSE_TOOL:
      case EditorToolType.RECTANGLE_TOOL:
      case EditorToolType.IMAGE_TOOL:
      case EditorToolType.TEXT_TOOL:
        return  true;
    }
    return  false;
  }

}
