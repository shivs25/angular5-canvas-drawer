import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DrObject } from '../models/dr-object';
import { DataStoreService } from '../services/data-store.service';
import { BoundingBox } from '../models/bounding-box';

@Component({
  selector: 'app-editable-drawer',
  templateUrl: './editable-drawer.component.html',
  styleUrls: ['./editable-drawer.component.scss']
})
export class EditableDrawerComponent implements OnInit {

  @ViewChild('drawer', { static: true }) drawer;

  @Input()
  itemViewBox: BoundingBox = null;
  @Input()
  penDblClick: string = "";
  
  @Output() 
  public selectionChanged: EventEmitter<DrObject[]> = new EventEmitter<DrObject[]>();

  @Output()
  public editingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public objectsAdded: EventEmitter<DrObject[]> = new EventEmitter<DrObject[]>();
  

  constructor(private _dataService: DataStoreService) { }

  getSvgAsText(): string {
    return this.drawer.getSvgAsText();
  }

  ngOnInit() {
    this._dataService.selectionChanged.subscribe((selectedObjects:DrObject[]) => {
      this.selectionChanged.emit(selectedObjects);
    });
    this._dataService.editingChanged.subscribe((isEditing: boolean) => {
      this.editingChanged.emit(isEditing);
    })
    this._dataService.objectsAdded.subscribe((addedObjects:DrObject[]) => {
      this.objectsAdded.emit(addedObjects);
    });
  }

}
