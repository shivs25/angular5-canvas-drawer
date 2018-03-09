import { Component, OnInit } from '@angular/core';
import { DrObject } from '../../models/dr-object';
import { DrPoint } from '../../models/dr-point';
import { DataStoreService } from '../../services/data-store.service';
import { EditorToolType } from '../../models/enums';
import { createDrRect, DrRect } from '../../models/dr-rect';
import { DrEllipse, createDrEllipse } from '../../models/dr-ellipse';
import { createDrText } from '../../models/dr-text';
import { createDrImage } from '../../models/dr-image';
import { BoundingBox } from '../../models/bounding-box';
import { ChangeHelperService } from '../../services/change-helper.service';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';
import { createDrPolygon, DrPolygon } from '../../models/dr-polygon';

@Component({
  selector: 'app-object-creation-tool',
  templateUrl: './object-creation-tool.component.html',
  styleUrls: ['./object-creation-tool.component.scss']
})
export class ObjectCreationToolComponent implements OnInit {

  currentObject: DrObject = null;

  private _mouseDown = false;
  private _mouseDownLocation: DrPoint = null;
  private _mouseDownClone = null;
  private _mouseDownBounds = null;

  constructor(
    private _dataService: DataStoreService, 
    private _changeService: ChangeHelperService, 
    private _drawerObjectService: DrawerObjectHelperService
  ) { }

  ngOnInit() {
  }

  onBackgroundClick(evt): void {
    
  }

  onBackgroundMouseDown(evt): void {
    this._mouseDown = true;
    this._mouseDownLocation = {
      x: evt.offsetX,
      y: evt.offsetY
    };
  }

  onBackgroundMouseMove(evt): void {
    
    if (this._mouseDown) {
      if (Math.abs(evt.offsetX - this._mouseDownLocation.x) > 2 && 
          Math.abs(evt.offsetY - this._mouseDownLocation.y) > 2) {
        if (null === this.currentObject) {
          switch(this._dataService.selectedTool) {
            case EditorToolType.IMAGE_TOOL:
            case EditorToolType.TEXT_TOOL:
            case EditorToolType.RECTANGLE_TOOL:
              this.createRect(evt, false);
              break;
            case EditorToolType.ROUNDED_RECTANGLE_TOOL:
              this.createRect(evt, true);
              break;
            case EditorToolType.ELLIPSE_TOOL:
              this.createEllipse(evt);
              break;
            case EditorToolType.STAR_TOOL:
              this.createStar(evt);
              this._mouseDownClone = Object.assign({}, this.currentObject);
              this._mouseDownBounds = this._drawerObjectService.getBoundingBox([this._mouseDownClone]);
              break;
            case EditorToolType.TRIANGLE_TOOL:
              this.createTriangle(evt);
              this._mouseDownClone = Object.assign({}, this.currentObject);
              this._mouseDownBounds = this._drawerObjectService.getBoundingBox([this._mouseDownClone]);
              break;
            case EditorToolType.ARROW_TOOL:
              this.createArrow(evt);
              this._mouseDownClone = Object.assign({}, this.currentObject);
              this._mouseDownBounds = this._drawerObjectService.getBoundingBox([this._mouseDownClone]);
              break;
            case EditorToolType.CALLOUT_SQUARE_TOOL:
              this.createCallout(evt);
              this._mouseDownClone = Object.assign({}, this.currentObject);
              this._mouseDownBounds = this._drawerObjectService.getBoundingBox([this._mouseDownClone]);

              break;
          }
        }
        else {
          switch(this._dataService.selectedTool) {
            case EditorToolType.IMAGE_TOOL:
            case EditorToolType.TEXT_TOOL:
            case EditorToolType.RECTANGLE_TOOL:
            case EditorToolType.ROUNDED_RECTANGLE_TOOL:
              Object.assign(this.currentObject, {
                x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
                y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
                width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
                height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
              });
              break;
            case EditorToolType.ELLIPSE_TOOL: {
                let w: number = Math.abs(this._mouseDownLocation.x - evt.offsetX);
                let h: number = Math.abs(this._mouseDownLocation.y - evt.offsetY);

                Object.assign(this.currentObject, {
                  x: Math.round((this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX) + w / 2),
                  y: Math.round((this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY) + h / 2),
                  rx: Math.round(w / 2),
                  ry: Math.round(h / 2)
                });
              }
              break;
            case EditorToolType.TRIANGLE_TOOL:
            case EditorToolType.STAR_TOOL:
            case EditorToolType.ARROW_TOOL:
            case EditorToolType.CALLOUT_SQUARE_TOOL: {
              let w: number = Math.abs(this._mouseDownLocation.x - evt.offsetX);
              let h: number = Math.abs(this._mouseDownLocation.y - evt.offsetY);
              Object.assign(this.currentObject, 
                this._changeService.getBoundsChanges(
                  this._mouseDownClone, 
                  {
                    x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
                    y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
                    width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
                    height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
                  },
                  this._mouseDownBounds
                )
              );
              break;
            }
              
          }
        }
      }
      else {
        this.currentObject = null;
      }
    }
  }

  onBackgroundMouseUp(evt): void {
    if (this._mouseDown) {
      
      if (null !== this.currentObject) {
        let objectToAdd: DrObject = null;

        switch(this._dataService.selectedTool) {
          case EditorToolType.IMAGE_TOOL:
          case EditorToolType.TEXT_TOOL:
          case EditorToolType.RECTANGLE_TOOL: 
          case EditorToolType.ROUNDED_RECTANGLE_TOOL: {
            Object.assign(this.currentObject, {
              x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
              y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
              width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
              height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
            });

            let r: DrRect = this.currentObject as DrRect;
            switch(this._dataService.selectedTool) {
                case EditorToolType.IMAGE_TOOL: {
                  objectToAdd = createDrImage({
                    id: this.getNextId(),
                    x: r.x,
                    y: r.y,
                    width: r.width,
                    height: r.height
                   });
                   
                }
                break;
                case EditorToolType.TEXT_TOOL: {
                  objectToAdd = createDrText({
                    id: this.getNextId(),
                    x: r.x,
                    y: r.y,
                    width: r.width,
                    height: r.height
                   });
                   
                }
                break;
                case EditorToolType.RECTANGLE_TOOL: 
                case EditorToolType.ROUNDED_RECTANGLE_TOOL: {
                  objectToAdd = createDrRect({
                    id: this.getNextId(),
                    x: r.x,
                    y: r.y,
                    width: r.width,
                    height: r.height,
                    rounded: EditorToolType.ROUNDED_RECTANGLE_TOOL === this._dataService.selectedTool
                   });
                }
                break;
            }
            break;
          }
          case EditorToolType.ELLIPSE_TOOL: {
              let w: number = Math.abs(this._mouseDownLocation.x - evt.offsetX);
              let h: number = Math.abs(this._mouseDownLocation.y - evt.offsetY);

              Object.assign(this.currentObject, {
                x: Math.round((this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX) + w / 2),
                y: Math.round((this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY) + h / 2),
                rx: Math.round(w / 2),
                ry: Math.round(h / 2)
              });

              let r: DrEllipse = this.currentObject as DrEllipse;
              objectToAdd = createDrEllipse({
                id: this.getNextId(),
                x: r.x,
                y: r.y,
                rx: r.rx,
                ry: r.ry
               });
            }
            break;
            case EditorToolType.TRIANGLE_TOOL:
            case EditorToolType.STAR_TOOL: 
            case EditorToolType.ARROW_TOOL: 
            case EditorToolType.CALLOUT_SQUARE_TOOL: {
              Object.assign(this.currentObject, 
                this._changeService.getBoundsChanges(
                  this._mouseDownClone, 
                  {
                    x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
                    y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
                    width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
                    height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
                  },
                  this._mouseDownBounds
                )
              );
              objectToAdd = createDrPolygon({
                id: this.getNextId(),
                points: (this.currentObject as DrPolygon).points
              });
              break;
            }
              
        }
        
        this._dataService.addObjects([objectToAdd]);
        this._dataService.selectObjects([objectToAdd]);
      }
      
      this.currentObject = null;
      this._mouseDown = false;
      this._mouseDownLocation = null;

      
    }
  }

  private getNextId(): number {
    return 0 === this._dataService.elements.length ? 1 :
          Math.max(...this._dataService.elements.map(o => o.id)) + 1;
  }

  private createStar(evt): void {
    let b: BoundingBox = { 
      x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
      y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
      width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
      height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
    }


    //50,2.4 62.4,37.9 100,38.8 70.1,61.5 80.9,97.6 50,76.1 19.1,97.6 29.9,61.5 0,38.8

    this.currentObject = createDrPolygon({
      id: 1000000,
      showFill: true,
      showStroke: true,
      fill: 'rgba(255,0,0,0.3)',
      stroke: 'red',
      points: [
        { x: b.x + b.width * 0.5, y: b.y },   //Top of star
        { x: b.x + b.width * 0.624, y: b.y + b.height * 0.373 },
        { x: b.x + b.width, y: b.y + b.height * 0.382 },
        { x: b.x + b.width * 0.701, y: b.y + b.height * 0.621 },
        { x: b.x + b.width * 0.809, y: b.y + b.height },
        { x: b.x + b.width * 0.5, y: b.y + b.height * 0.774 },
        { x: b.x + b.width * 0.191, y: b.y + b.height },
        { x: b.x + b.width * 0.299, y: b.y + b.height * 0.621 },
        { x: b.x, y: b.y + b.height * 0.382 },
        { x: b.x + b.width * 0.376, y: b.y + b.height * 0.373 },
      ]
    });
  }

  private createArrow(evt): void {
    

    let b: BoundingBox = { 
      x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
      y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
      width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
      height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
    }


    //52.6,11.2 100,50 52.6,88.8 52.2,68.8 0,68.8 0,31.2 52.6,31.2

    this.currentObject = createDrPolygon({
      id: 1000000,
      showFill: true,
      showStroke: true,
      fill: 'rgba(255,0,0,0.3)',
      stroke: 'red',
      points: [
        { x: b.x + b.width * 0.526, y: b.y + b.height * 0.112 },
        { x: b.x + b.width, y: b.y + b.height * 0.5 },
        { x: b.x + b.width * 0.526, y: b.y + b.height * 0.888 },
        { x: b.x + b.width * 0.522, y: b.y + b.height * 0.688 },
        { x: b.x, y: b.y + b.height * 0.688 },
        { x: b.x, y: b.y + b.height * 0.312 },
        { x: b.x + b.width * 0.526, y: b.y + b.height * 0.312 }
      ]
    });

  }

  private createCallout(evt): void {
    //100,8.8 0,8.8 0,68.8 61.9,68.8 61.9,91.2 75.3,68.8 100,68.8
    let b: BoundingBox = { 
      x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
      y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
      width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
      height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
    }

    this.currentObject = createDrPolygon({
      id: 1000000,
      showFill: true,
      showStroke: true,
      fill: 'rgba(255,0,0,0.3)',
      stroke: 'red',
      points: [
        { x: b.x + b.width * 1, y: b.y + b.height * 0.08 },   //Top of star
        { x: b.x + b.width * 0, y: b.y + b.height * 0.08 },
        { x: b.x + b.width * 0, y: b.y + b.height * 0.688 },
        { x: b.x + b.width * 0.619, y: b.y + b.height * 0.688 },
        { x: b.x + b.width * 0.619, y: b.y + b.height * 0.912 },
        { x: b.x + b.width * 0.753, y: b.y + b.height * 0.688 },
        { x: b.x + b.width * 1, y: b.y + b.height * 0.688 }
      ]
    });

  }

  private createTriangle(evt): void {
    let b: BoundingBox = { 
      x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
      y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
      width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
      height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
    }


    this.currentObject = createDrPolygon({
      id: 1000000,
      showFill: true,
      showStroke: true,
      fill: 'rgba(255,0,0,0.3)',
      stroke: 'red',
      points: [
        { x: b.x + b.width * 0.5, y: b.y },   //Top of triangle
        { x: b.x + b.width, y: b.y + b.height }, 
        { x: b.x, y: b.y + b.height }
      ]
    });
  }

  private createRect(evt, rounded: boolean): void {
    this.currentObject = createDrRect({
      id: 1000000,
      showFill: true,
      showStroke: true,
      fill: 'rgba(255,0,0,0.3)',
      stroke: 'red',
      x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
      y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
      width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
      height: Math.abs(this._mouseDownLocation.y - evt.offsetY),
      rounded: rounded
    });
  }

  private createEllipse(evt): void {
    let w: number = Math.abs(this._mouseDownLocation.x - evt.offsetX);
    let h: number = Math.abs(this._mouseDownLocation.y - evt.offsetY);

    this.currentObject = createDrEllipse({
      id: 1000000,
      showFill: true,
      showStroke: true,
      fill: 'rgba(255,0,0,0.3)',
      stroke: 'red',
      x: Math.round((this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX) + w / 2),
      y: Math.round((this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY) + h / 2),
      rx: Math.round(w / 2),
      ry: Math.round(h / 2)
    });
  }
}
