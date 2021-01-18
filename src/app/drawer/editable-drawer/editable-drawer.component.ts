import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DrObject } from '../models/dr-object';
import { DataStoreService } from '../services/data-store.service';
import { BoundingBox } from '../models/bounding-box';
import { DrStyle } from '../models/dr-style';
import { MouseEventData } from '../models/mouse-event-data';

@Component({
  selector: 'app-editable-drawer',
  templateUrl: './editable-drawer.component.html',
  styleUrls: ['./editable-drawer.component.scss']
})
export class EditableDrawerComponent implements OnInit {

  @Input()
  pointStyle: DrStyle = null;
  @Input()
  polygonStyle: DrStyle = null;
  @Input()
  lineStyle: DrStyle = null;
  @Input()
  objectPreviewStyle: DrStyle = null;
  @Input()
  allowLines: boolean = true;
  @Input()
  canModifyShapes: boolean = true;
  @Input()
  multiClickEnabled: boolean = false;

  @ViewChild('drawer', { static: true }) drawer;

  @Input()
  itemViewBox: BoundingBox = null;
  @Input()
  penDblClick: string = "";
  @Input()
  emitMouseEvents: boolean = false;
  @Input()
  emitBackgroundClick: boolean = false;

  @Output()
  public mouseAction: EventEmitter<{ type: string, pt: any }> = new EventEmitter<{ type: string, pt: any }>();

  @Output()
  public selectionChanged: EventEmitter<DrObject[]> = new EventEmitter<DrObject[]>();

  @Output()
  public editingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public objectsAdded: EventEmitter<DrObject[]> = new EventEmitter<DrObject[]>();

  @Output()
  backgroundMouseUp: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();


  constructor(private _dataService: DataStoreService) { }

  getSvgAsText(): string {
    return this.drawer.getSvgAsText();
  }

  ngOnInit() {
    this._dataService.selectionChanged.subscribe((selectedObjects: DrObject[]) => {
      this.selectionChanged.emit(selectedObjects);
    });
    this._dataService.editingChanged.subscribe((isEditing: boolean) => {
      this.editingChanged.emit(isEditing);
    })
    this._dataService.objectsAdded.subscribe((addedObjects: DrObject[]) => {
      this.objectsAdded.emit(addedObjects);
    });
  }

}
