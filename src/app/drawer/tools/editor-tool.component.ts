import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { EditorToolType } from '../models/enums';
import { DataStoreService } from '../services/data-store.service';
import { DrStyle } from '../models/dr-style';
import { MouseEventData } from '../models/mouse-event-data';
import { SelectionModifierStylers } from '../models/selection-modifier-stylers';

@Component({
  selector: 'app-editor-tool',
  templateUrl: './editor-tool.component.html',
  styleUrls: ['./editor-tool.component.scss']
})
export class EditorToolComponent implements OnInit {
  @Input()
  pointStyle: DrStyle = null;
  @Input()
  polygonStyle: DrStyle = null;
  @Input()
  lineStyle: DrStyle = null;
  @Input()
  emitMouseEvents: boolean = false;
  @Input()
  objectPreviewStyle: DrStyle = null;
  @Input()
  allowLines: boolean = true;
  @Input()
  penDblClick: string = "";
  @Input()
  canModifyShapes: boolean = true;
  @Input()
  multiClickEnabled: boolean = false;
  @Input()
  emitBackgroundClick: boolean = false;
  @Input()
  rotaterStyle: SelectionModifierStylers = { fill: "red", stroke: "red", strokeWidth: 0 };
  @Input()
  resizerStyle: SelectionModifierStylers = { fill: "green", stroke: "green", strokeWidth: 0 };
  @Input()
  traceSelectionStyle: any = null;
  @Input()
  bbSelectionStyle: any = null;
  @Input()
  autoSelectObjects: boolean = true;
  @Output()
  public mouseAction: EventEmitter<{ type: string, pt: any }> = new EventEmitter<{ type: string, pt: any }>();
  @Output()
  selectorDoubleClick: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();
  @Output()
  selectorMouseUp: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();

  SELECTOR_TOOL: EditorToolType = EditorToolType.SELECTOR_TOOL;
  PEN_TOOL: EditorToolType = EditorToolType.PEN_TOOL;
  POINT_TOOL: EditorToolType = EditorToolType.POINT_TOOL;
  TEXT_EDIT_TOOL: EditorToolType = EditorToolType.TEXT_EDIT_TOOL;
  CALLOUT_POINTER_TOOL: EditorToolType = EditorToolType.CALLOUT_POINTER_TOOL;

  @select() elementState;

  constructor(private _dataService: DataStoreService) { }

  ngOnInit() {

  }

  shouldShowCreationTool(): boolean {
    switch (this._dataService.selectedTool) {
      case EditorToolType.ELLIPSE_TOOL:
      case EditorToolType.RECTANGLE_TOOL:
      case EditorToolType.IMAGE_TOOL:
      case EditorToolType.TEXT_TOOL:
      case EditorToolType.TRIANGLE_TOOL:
      case EditorToolType.STAR_TOOL:
      case EditorToolType.ARROW_TOOL:
      case EditorToolType.ROUNDED_RECTANGLE_TOOL:
      case EditorToolType.CALLOUT_SQUARE_TOOL:
      case EditorToolType.CALLOUT_ROUNDED_TOOL:
        return true;
    }
    return false;
  }

}
