import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataStoreService } from '../../services/data-store.service';
import { DrObject } from '../../models/dr-object';
import { select } from '@angular-redux/store';
import { createDrRect, DrRect } from '../../models/dr-rect';
import { DynamicSvgDirective } from '../../dynamic-svg/dynamic-svg.directive';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';
import { BoundingBox } from '../../models/bounding-box';
import { MouseEventData } from '../../models/mouse-event-data';
import { DrPoint } from '../../models/dr-point';


@Component({
  selector: 'app-selector-tool',
  templateUrl: './selector-tool.component.html',
  styleUrls: ['./selector-tool.component.scss']
})
export class SelectorToolComponent implements OnInit, OnDestroy {

  @select() elementState;

  boundingBoxObjectUniqueId: number = 1000000;

  boundingBoxObject: DrRect = null;
  selectionTransform: string = null;
  cssBounds: any = null;
  
  invisibleStyle: any = {
    showFill: false,
    showStroke: false
  };

  selectionStyle: any = {
    showFill: true,
    fill: "rgba(255, 0, 0, 0.3)",
    dashedLine: false,
    showStroke: true,
    stroke: 'red',
    strokeWidth: 1
  };

  private _subClicked: any;
  private _subMouseDown: any;
  private _subMouseMove: any;
  private _subMouseUp: any;
  private _subRedid: any;
  private _subUndid: any;

  private _mouseDownLocation: DrPoint = null;
  private _mouseDown = false;

  constructor(
    private _dataStoreService: DataStoreService,
    private _objectHelperService: DrawerObjectHelperService) { }

  ngOnInit() {

    this._subClicked = this._dataStoreService.clickedObject.subscribe((data:DrObject) => {});
    this._subMouseDown = this._dataStoreService.mouseDownObject.subscribe((data: MouseEventData) => this.onMouseDown(data));
    this._subMouseMove = this._dataStoreService.mouseMoveObject.subscribe((data: MouseEventData) => this.onMouseMove(data));
    this._subMouseUp = this._dataStoreService.mouseUpObject.subscribe((data: MouseEventData) => this.onMouseUp(data));

    this._subRedid = this._dataStoreService.redid.subscribe(() => {
      this.setupBounds();  
    });

    this._subUndid = this._dataStoreService.undid.subscribe(() => {
      this.setupBounds();
    });
  }

  onMouseDown(data: MouseEventData): void {
    
    if (null === data.data || !data.data.clickable) {
      this._dataStoreService.selectObjects([]);
      this.setupBounds();
    }
    else {
      if (data.data.id !== this.boundingBoxObjectUniqueId) {
        //Not the selected bounds object
        if (1 === this._dataStoreService.selectedObjects.length) {
          if (this._dataStoreService.selectedObjects[0].id !== data.data.id) {
            this._dataStoreService.selectObjects([data.data]);
          }
        }
        else {
          this._dataStoreService.selectObjects([data.data]);
        }
  
        if (null !== this._dataStoreService.selectedBounds) {
          this.setupBounds();
        }
      }
      
    }
    
    
    this._dataStoreService.beginEdit();
    this._mouseDownLocation = data.location;
    this._mouseDown = true;
  }

  onMouseMove(data: MouseEventData): void {
    if (this._mouseDown && this._dataStoreService.selectedObjects.length > 0) {
      //Moving objects
      Object.assign(this.cssBounds, {
        left: this.boundingBoxObject.x + (data.location.x - this._mouseDownLocation.x),
        top: this.boundingBoxObject.y + (data.location.y - this._mouseDownLocation.y)
      });
    }
  }

  onMouseUp(data: MouseEventData): void {
    if (this._mouseDown && this._dataStoreService.selectedObjects.length > 0) {
      //Moving objects
      Object.assign(this.cssBounds, {
        left: this.boundingBoxObject.x + (data.location.x - this._mouseDownLocation.x),
        top: this.boundingBoxObject.y + (data.location.y - this._mouseDownLocation.y)
      });

      if (1 === this._dataStoreService.selectedObjects.length) {
        this._dataStoreService.moveObject(this._dataStoreService.selectedObjects[0], {
          x: this.cssBounds.left,
          y: this.cssBounds.top,
          width: this.cssBounds.width,
          height: this.cssBounds.height
        });
        this.setupBounds(); 
      }

      this._mouseDown = false;
      this._dataStoreService.endEdit();
    }
    
  }

  private setupBounds(): void {
    if (null !== this._dataStoreService.selectedBounds) {
      let b: BoundingBox = this._dataStoreService.selectedBounds;
      this.boundingBoxObject = createDrRect({
        id: this.boundingBoxObjectUniqueId,
        x: b.x,
        y: b.y,
        width: b.width,
        height: b.height,
        showFill: false,
        showStroke: true,
        stroke: 'red',
        dashedLine: false
      });
      this.selectionTransform = "translate(" + (b.x * -1) + " " + (b.y * -1) + ")";
      this.cssBounds = {
        left: b.x,
        top: b.y,
        width: b.width,
        height: b.height
      }
    }
    else {
      this.boundingBoxObject = null;
      this.selectionTransform = "translate(0 0)";
      this.cssBounds = null;
    }
    
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
    if (this._subRedid) {
      this._subRedid.unsubscribe();
    }
    if (this._subUndid) {
      this._subUndid.unsubscribe();
    }
  }
}
