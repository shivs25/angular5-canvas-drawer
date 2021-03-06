import { Component, OnInit, HostListener, Input } from '@angular/core';
import { DrObject } from '../../models/dr-object';
import { DrPoint } from '../../models/dr-point';
import { DataStoreService } from '../../services/data-store.service';
import { EditorToolType, DrType, DrTextAlignment } from '../../models/enums';
import { createDrRect, DrRect } from '../../models/dr-rect';
import { DrEllipse, createDrEllipse } from '../../models/dr-ellipse';
import { createDrText, DrText } from '../../models/dr-text';
import { createDrImage, DrImage } from '../../models/dr-image';
import { BoundingBox } from '../../models/bounding-box';
import { ChangeHelperService } from '../../services/change-helper.service';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';
import { createDrPolygon, DrPolygon } from '../../models/dr-polygon';
import { createDrCallout } from '../../models/dr-callout';
import { DrCallout } from '../../models/dr-callout';
import { DrStyle } from '../../models/dr-style';

@Component({
  selector: 'app-object-creation-tool',
  templateUrl: './object-creation-tool.component.html',
  styleUrls: ['./object-creation-tool.component.scss']
})
export class ObjectCreationToolComponent implements OnInit {
  @Input()
  public polygonStyle: DrStyle = null;
  @Input()
  public objectPreviewStyle: DrStyle = null;
  @Input()
  autoSelectObjects: boolean = true;

  currentObject: DrObject = null;

  private _mouseDown = false;
  private _mouseDownLocation: DrPoint = null;
  private _mouseDownClone = null;
  private _mouseDownBounds = null;

  private _modifierKeys: any = {
    shift: false,
    alt: false,
    control: false
  };

  private _lastEvent: any = null;


  constructor(
    private _dataService: DataStoreService,
    private _changeService: ChangeHelperService,
    private _drawerObjectService: DrawerObjectHelperService
  ) { }

  ngOnInit() {

  }

  onBackgroundClick(evt): void {

  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(evt): void {

    switch (this._dataService.selectedTool) {
      case EditorToolType.TRIANGLE_TOOL:
      case EditorToolType.ARROW_TOOL:
      case EditorToolType.CALLOUT_ROUNDED_TOOL:
      case EditorToolType.CALLOUT_SQUARE_TOOL:
      case EditorToolType.ELLIPSE_TOOL:
      case EditorToolType.IMAGE_TOOL:
      case EditorToolType.RECTANGLE_TOOL:
      case EditorToolType.ROUNDED_RECTANGLE_TOOL:
      case EditorToolType.STAR_TOOL:
        switch (evt.key) {
          case "Shift":
          case "Control":
          case "Alt":
            this._modifierKeys[evt.key.toLowerCase()] = true;

            if (this._mouseDown && null !== this._lastEvent) {
              this.onBackgroundMouseMove(this._lastEvent);
            }
            break;
        }
        break;
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(evt): void {
    switch (this._dataService.selectedTool) {
      case EditorToolType.TRIANGLE_TOOL:
      case EditorToolType.ARROW_TOOL:
      case EditorToolType.CALLOUT_ROUNDED_TOOL:
      case EditorToolType.CALLOUT_SQUARE_TOOL:
      case EditorToolType.ELLIPSE_TOOL:
      case EditorToolType.IMAGE_TOOL:
      case EditorToolType.RECTANGLE_TOOL:
      case EditorToolType.ROUNDED_RECTANGLE_TOOL:
      case EditorToolType.STAR_TOOL:
        switch (evt.key) {
          case "Shift":
          case "Control":
          case "Alt":
            this._modifierKeys[evt.key.toLowerCase()] = false;

            if (this._mouseDown && null !== this._lastEvent) {
              this.onBackgroundMouseMove(this._lastEvent);
            }
            break;
          case "Escape":
            this.currentObject = null;
            this._mouseDown = false;
            this._mouseDownLocation = null;
            break;
        }
        break;

    }
  }

  onBackgroundMouseDown(evt): void {
    evt.preventDefault();
    this._mouseDown = true;
    this._mouseDownLocation = {
      x: evt.offsetX,
      y: evt.offsetY
    };
  }

  onBackgroundMouseMove(evt): void {
    evt.preventDefault();
    this._lastEvent = evt;

    if (this._mouseDown) {
      if (Math.abs(evt.offsetX - this._mouseDownLocation.x) > 2 &&
        Math.abs(evt.offsetY - this._mouseDownLocation.y) > 2) {
        if (null === this.currentObject) {
          switch (this._dataService.selectedTool) {
            case EditorToolType.IMAGE_TOOL:
              this.createRect(evt, false, "Image");
              break;
            case EditorToolType.TEXT_TOOL:
              this.createRect(evt, false, "Text");
              break;
            case EditorToolType.RECTANGLE_TOOL:
              this.createRect(evt, false, "Rectangle");
              break;
            case EditorToolType.ROUNDED_RECTANGLE_TOOL:
              this.createRect(evt, true, "Rounded Rectangle");
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
              this.createCallout(evt, false);
              this._mouseDownClone = Object.assign({}, this.currentObject);
              this._mouseDownBounds = this._drawerObjectService.getBoundingBox([this._mouseDownClone]);

              break;
            case EditorToolType.CALLOUT_ROUNDED_TOOL:
              this.createCallout(evt, true);
              this._mouseDownClone = Object.assign({}, this.currentObject);
              this._mouseDownBounds = this._drawerObjectService.getBoundingBox([this._mouseDownClone]);

              break;
          }
        }
        else {
          let w: number = Math.abs(this._mouseDownLocation.x - evt.offsetX);
          let h: number = Math.abs(this._mouseDownLocation.y - evt.offsetY);

          if (this._modifierKeys.shift) {
            if (w > h) {
              h = w;
            }
            else {
              w = h;
            }
          }
          switch (this._dataService.selectedTool) {
            case EditorToolType.IMAGE_TOOL:
            case EditorToolType.TEXT_TOOL:
            case EditorToolType.RECTANGLE_TOOL:
            case EditorToolType.ROUNDED_RECTANGLE_TOOL:

              Object.assign(this.currentObject, {
                x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : this._mouseDownLocation.x - w,
                y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : this._mouseDownLocation.y - h,
                width: w,
                height: h
              });
              break;
            case EditorToolType.ELLIPSE_TOOL: {

              Object.assign(this.currentObject, {
                x: Math.round((this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : this._mouseDownLocation.x - w) + w / 2),
                y: Math.round((this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : this._mouseDownLocation.y - h) + h / 2),
                rx: Math.round(w / 2),
                ry: Math.round(h / 2)
              });
            }
              break;
            case EditorToolType.TRIANGLE_TOOL:
            case EditorToolType.STAR_TOOL:
            case EditorToolType.ARROW_TOOL:
            case EditorToolType.CALLOUT_SQUARE_TOOL:
            case EditorToolType.CALLOUT_ROUNDED_TOOL:
              Object.assign(this.currentObject,
                this._changeService.getBoundsChanges(
                  this._mouseDownClone,
                  {
                    x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : this._mouseDownLocation.x - w,
                    y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : this._mouseDownLocation.y - h,
                    width: w,
                    height: h
                  },
                  this._mouseDownBounds
                )
              );
              break;
          }
        }
      }
      else {
        this.currentObject = null;
      }
    }
  }

  onBackgroundMouseUp(evt): void {
    evt.preventDefault();

    if (this._mouseDown) {

      if (null !== this.currentObject) {
        let objectToAdd: DrObject = null;

        let w: number = Math.abs(this._mouseDownLocation.x - evt.offsetX);
        let h: number = Math.abs(this._mouseDownLocation.y - evt.offsetY);

        if (this._modifierKeys.shift) {
          if (w > h) {
            h = w;
          }
          else {
            w = h;
          }
        }

        switch (this._dataService.selectedTool) {
          case EditorToolType.IMAGE_TOOL: {
            let r: DrRect = this.currentObject as DrRect;
            let image: DrImage = createDrImage({
              id: this.getNextId(),
              name: this._dataService.getUniqueName('Image'),
              x: r.x,
              y: r.y,
              width: r.width,
              height: r.height
            });
            image.name = this.currentObject.name;


            this._dataService.addTempObjects([image]);
            if (this.autoSelectObjects) {
              this._dataService.selectObjects([image]);
            }
          }
            break;
          case EditorToolType.TEXT_TOOL: {
            let r: DrRect = this.currentObject as DrRect;
            let text: DrText = createDrText({
              id: this.getNextId(),
              name: this._dataService.getUniqueName('Text'),
              x: r.x,
              y: r.y,
              width: r.width,
              height: r.height,
              hAlignment: DrTextAlignment.CENTER
            });
            text.name = this.currentObject.name;


            this._dataService.addTempObjects([text]);
            //we need to do this becuase of how object creation works...
            this._dataService.selectObjects([text]);
          }
            break;
          case EditorToolType.RECTANGLE_TOOL:
          case EditorToolType.ROUNDED_RECTANGLE_TOOL: {
            Object.assign(this.currentObject, {
              x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : this._mouseDownLocation.x - w,
              y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : this._mouseDownLocation.y - h,
              width: w,
              height: h
            });

            let r: DrRect = this.currentObject as DrRect;
            switch (this._dataService.selectedTool) {
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

            Object.assign(this.currentObject, {
              x: Math.round((this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : this._mouseDownLocation.x - w) + w / 2),
              y: Math.round((this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : this._mouseDownLocation.y - h) + h / 2),
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
          case EditorToolType.ARROW_TOOL: {
            Object.assign(this.currentObject,
              this._changeService.getBoundsChanges(
                this._mouseDownClone,
                {
                  x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : this._mouseDownLocation.x - w,
                  y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : this._mouseDownLocation.y - h,
                  width: w,
                  height: h
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
          case EditorToolType.CALLOUT_SQUARE_TOOL:
          case EditorToolType.CALLOUT_ROUNDED_TOOL: {
            let r: DrCallout = this.currentObject as DrCallout;
            Object.assign(this.currentObject,
              this._changeService.getBoundsChanges(
                this._mouseDownClone,
                {
                  x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : this._mouseDownLocation.x - w,
                  y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : this._mouseDownLocation.y - h,
                  width: w,
                  height: h
                },
                this._mouseDownBounds
              )
            );
            objectToAdd = createDrCallout({
              id: this.getNextId(),
              x: r.x,
              y: r.y,
              width: r.width,
              height: r.height,
              basePoint1: r.basePoint1,
              basePoint2: r.basePoint2,
              pointerLocation: r.pointerLocation,
              rounded: this._dataService.selectedTool === EditorToolType.CALLOUT_ROUNDED_TOOL
            });
          }

            break;
        }

        if (null !== objectToAdd) {
          if (this.polygonStyle) {
            objectToAdd = { ...objectToAdd, ...this.polygonStyle }
          }
          objectToAdd.name = this.currentObject.name;
          this._dataService.addObjects([objectToAdd]);
          if (this.polygonStyle) {
            this._dataService.setStyles([objectToAdd], this.polygonStyle);
          }
          if (this.autoSelectObjects) {
            this._dataService.selectObjects([objectToAdd]);
          }
        }

      }
      else {
        if (EditorToolType.TEXT_TOOL === this._dataService.selectedTool) {
          let objectToAdd = createDrText({
            id: this.getNextId(),
            name: this._dataService.getUniqueName('Text'),
            x: this._mouseDownLocation.x,
            y: this._mouseDownLocation.y,
            width: 200,
            height: 100,
            hAlignment: DrTextAlignment.NEAR
          });

          this._dataService.addTempObjects([objectToAdd]);
          if (this.autoSelectObjects) {
            this._dataService.selectObjects([objectToAdd]);
          }
        }
      }
      this.currentObject = null;
      this._mouseDown = false;
      this._mouseDownLocation = null;
    }
  }

  finalize(): void {
    //Not Implemented
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
    if (this.objectPreviewStyle) {
      this.currentObject = createDrPolygon({
        id: 1000000,
        name: this._dataService.getUniqueName("Star"),
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
        ],
        ...this.objectPreviewStyle
      });
    } else {
      this.currentObject = createDrPolygon({
        id: 1000000,
        name: this._dataService.getUniqueName("Star"),
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
  }

  private createArrow(evt): void {


    let b: BoundingBox = {
      x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
      y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
      width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
      height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
    }


    //52.6,11.2 100,50 52.6,88.8 52.2,68.8 0,68.8 0,31.2 52.6,31.2
    if (this.objectPreviewStyle) {
      this.currentObject = createDrPolygon({
        id: 1000000,
        name: this._dataService.getUniqueName("Arrow"),
        points: [
          { x: b.x + b.width * 0.526, y: b.y + b.height * 0.112 },
          { x: b.x + b.width, y: b.y + b.height * 0.5 },
          { x: b.x + b.width * 0.526, y: b.y + b.height * 0.888 },
          { x: b.x + b.width * 0.522, y: b.y + b.height * 0.688 },
          { x: b.x, y: b.y + b.height * 0.688 },
          { x: b.x, y: b.y + b.height * 0.312 },
          { x: b.x + b.width * 0.526, y: b.y + b.height * 0.312 }
        ],
        ...this.objectPreviewStyle
      });

    } else {
      this.currentObject = createDrPolygon({
        id: 1000000,
        name: this._dataService.getUniqueName("Arrow"),
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

  }

  private createCallout(evt, rounded): void {
    //100,8.8 0,8.8 0,68.8 61.9,68.8 61.9,91.2 75.3,68.8 100,68.8
    let b: BoundingBox = {
      x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
      y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
      width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
      height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
    }
    if (this.objectPreviewStyle) {

      this.currentObject = createDrCallout({
        id: 1000000,
        name: this._dataService.getUniqueName("Callout"),
        ...this.objectPreviewStyle,
        x: b.x,
        y: b.y,
        width: b.width,
        height: b.height * 0.688,
        basePoint1: { x: b.x + b.width / 2 - (b.width * 0.1), y: b.y + (b.height * 0.688) / 2 },
        basePoint2: { x: b.x + b.width / 2 + (b.width * 0.1), y: b.y + (b.height * 0.688) / 2 },
        pointerLocation: { x: b.x + b.width / 2, y: b.y + b.height },
        rounded: rounded
      });
    } else {
      this.currentObject = createDrCallout({
        id: 1000000,
        name: this._dataService.getUniqueName("Callout"),
        showFill: true,
        showStroke: true,
        fill: 'rgba(255,0,0,0.3)',
        stroke: 'red',
        x: b.x,
        y: b.y,
        width: b.width,
        height: b.height * 0.688,
        basePoint1: { x: b.x + b.width / 2 - (b.width * 0.1), y: b.y + (b.height * 0.688) / 2 },
        basePoint2: { x: b.x + b.width / 2 + (b.width * 0.1), y: b.y + (b.height * 0.688) / 2 },
        pointerLocation: { x: b.x + b.width / 2, y: b.y + b.height },
        rounded: rounded
      });
    }

  }

  private createTriangle(evt): void {
    let b: BoundingBox = {
      x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
      y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
      width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
      height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
    }

    if (this.objectPreviewStyle) {
      this.currentObject = createDrPolygon({
        id: 1000000,
        name: this._dataService.getUniqueName("Triangle"),
        ...this.objectPreviewStyle,
        points: [
          { x: b.x + b.width * 0.5, y: b.y },   //Top of triangle
          { x: b.x + b.width, y: b.y + b.height },
          { x: b.x, y: b.y + b.height }
        ]
      });
    } else {
      this.currentObject = createDrPolygon({
        id: 1000000,
        name: this._dataService.getUniqueName("Triangle"),
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
  }

  private createRect(evt, rounded: boolean, name: string): void {
    if (this.objectPreviewStyle) {
      this.currentObject = createDrRect({
        id: 1000000,
        name: this._dataService.getUniqueName(name),
        ...this.objectPreviewStyle,
        x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
        y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
        width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
        height: Math.abs(this._mouseDownLocation.y - evt.offsetY),
        rounded: rounded
      });

    } else {
      this.currentObject = createDrRect({
        id: 1000000,
        name: this._dataService.getUniqueName(name),
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
  }

  private createEllipse(evt): void {
    let w: number = Math.abs(this._mouseDownLocation.x - evt.offsetX);
    let h: number = Math.abs(this._mouseDownLocation.y - evt.offsetY);
    if (this.objectPreviewStyle) {
      this.currentObject = createDrEllipse({
        id: 1000000,
        name: this._dataService.getUniqueName("Ellipse"),
        ...this.objectPreviewStyle,
        x: Math.round((this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX) + w / 2),
        y: Math.round((this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY) + h / 2),
        rx: Math.round(w / 2),
        ry: Math.round(h / 2)
      });

    } else {
      this.currentObject = createDrEllipse({
        id: 1000000,
        name: this._dataService.getUniqueName("Ellipse"),
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
}
