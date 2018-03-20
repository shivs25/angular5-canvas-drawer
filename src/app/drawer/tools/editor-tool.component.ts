import { Component, OnInit, Input } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { EditorToolType } from '../models/enums';
import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'app-editor-tool',
  templateUrl: './editor-tool.component.html',
  styleUrls: ['./editor-tool.component.scss']
})
export class EditorToolComponent implements OnInit {

  SELECTOR_TOOL: EditorToolType = EditorToolType.SELECTOR_TOOL;
  PEN_TOOL: EditorToolType = EditorToolType.PEN_TOOL;
  TEXT_EDIT_TOOL: EditorToolType = EditorToolType.TEXT_EDIT_TOOL;
  TEXT_CREATION_TOOL: EditorToolType = EditorToolType.TEXT_CREATION_TOOL;

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
      case EditorToolType.TRIANGLE_TOOL:
      case EditorToolType.STAR_TOOL:
      case EditorToolType.ARROW_TOOL:
      case EditorToolType.ROUNDED_RECTANGLE_TOOL:
      case EditorToolType.CALLOUT_SQUARE_TOOL:
        return  true;
    }
    return  false;
  }

}
