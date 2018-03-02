import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataStoreService } from '../../services/data-store.service';
import { DrObject } from '../../models/dr-object';
import { select } from '@angular-redux/store';
import { createDrRect, DrRect } from '../../models/dr-rect';
import { DynamicSvgDirective } from '../../dynamic-svg/dynamic-svg.directive';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';
import { BoundingBox } from '../../models/bounding-box';


@Component({
  selector: 'app-selector-tool',
  templateUrl: './selector-tool.component.html',
  styleUrls: ['./selector-tool.component.scss']
})
export class SelectorToolComponent implements OnInit, OnDestroy {

  @select() elementState;

  private _subClicked: any;
  private _subMouseDown: any;
  private _subMouseMove: any;
  private _subMouseUp: any;
  private _selectedObject: DrObject = null;
  private _selectedBounds: DrRect = null;

  constructor(
    private _dataStoreService: DataStoreService,
    private _objectHelperService: DrawerObjectHelperService) { }

  ngOnInit() {

    this._subClicked = this._dataStoreService.clickedObject.subscribe((data:DrObject) => {
      console.log("clicked");
    });

    this._subMouseDown = this._dataStoreService.mouseDownObject.subscribe((data:DrObject) => {
      if (null === data) {
        this._dataStoreService.selectObjects([])
      }
      else {
        if (1 === this._dataStoreService.selectedIds.length) {
          if (this._dataStoreService.selectedIds[0] !== data.id) {
            this._dataStoreService.selectObjects([data]);
          }
        }
        else {
          this._dataStoreService.selectObjects([data]);
        }
      }
      
    });

    this._subMouseMove = this._dataStoreService.mouseMoveObject.subscribe((data:DrObject) => {
      if (null !== this._selectedObject) {

      }
    });

    this._subMouseUp = this._dataStoreService.mouseUpObject.subscribe((data:DrObject) => {
      console.log("mouseup");
    });
  }

  getCssBoundsOfAll(): any {
    let selected: DrObject[] = this.getObjects(this._dataStoreService.selectedIds);

    let b: BoundingBox = this._objectHelperService.getBoundingBox(selected);

    return {
      left: b.x,
      top: b.y,
      width: b.width,
      height: b.height
    }
  }

  getObjectById(id: number): DrObject {
    if (null === this._selectedObject || this._selectedObject.id === id) {
      let selected: DrObject[] = this.getObjects(this._dataStoreService.selectedIds);
      let bounds: BoundingBox = this._objectHelperService.getBoundingBox(selected);
  
      let i: DrObject = Object.assign({}, this._dataStoreService.elements.find((t: any) => t.id === id), {
        showFill: true,
        showStroke: true,
        strokeWidth: 1,
        stroke: 'red',
        fill: 'rgba(255,0,0,0.3)',
        dashedLine: true
      });
  
      this._objectHelperService.projectObject(i, bounds, 0, 0);
      this._selectedObject = i;
    }
    
    
    return this._selectedObject;
  }

  getBoundingObjectById(id: number): DrRect {
    if (null === this._selectedBounds || this._selectedBounds.id !== id) {
      let o: DrObject = this._dataStoreService.elements.find((t: any) => t.id === id);
      let b: BoundingBox = this._objectHelperService.getBoundingBox([o]);
  
      let bounds: BoundingBox = this._objectHelperService.getBoundingBox(
        this.getObjects(this._dataStoreService.selectedIds)
      );
  
      let newO: DrRect = Object.assign({}, createDrRect({
        showFill: false,
        showStroke: true,
        strokeWidth: 1,
        stroke: 'red',
        dashedLine: true
      }), {
        x: b.x,
        y: b.y,
        width: b.width,
        height: b.height
       });
  
       this._objectHelperService.projectObject(newO, bounds, 0, 0);  
       this._selectedBounds = newO;
    }
    
     return this._selectedBounds;
  }

  private getObjects(ids: number[]): DrObject[] {
    let selected: DrObject[] = [];

    for(let i of ids) {
      selected.push(this._dataStoreService.elements.find((t: any) => t.id === i));
    }
    return  selected;
  }

  ngOnDestroy() {
    if (this._subClicked) {
      this._subClicked.unsubscribe();
    }
    if (this._subMouseDown) {
      this._subMouseDown.unsubscribe();
    }
    if (this._subMouseMove) {
      this._subMouseMove.unsubscribe();
    }
    if (this._subMouseUp) {
      this._subMouseUp.unsubscribe();
    }

  }
}
