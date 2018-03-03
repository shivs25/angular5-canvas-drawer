import { Component, OnInit } from '@angular/core';
import { DrObject } from '../../models/dr-object';
import { DrPoint } from '../../models/dr-point';
import { DataStoreService } from '../../services/data-store.service';
import { EditorToolType } from '../../models/enums';
import { createDrRect, DrRect } from '../../models/dr-rect';
import { DrEllipse, createDrEllipse } from '../../models/dr-ellipse';
import { createDrText } from '../../models/dr-text';
import { createDrImage } from '../../models/dr-image';

@Component({
  selector: 'app-object-creation-tool',
  templateUrl: './object-creation-tool.component.html',
  styleUrls: ['./object-creation-tool.component.scss']
})
export class ObjectCreationToolComponent implements OnInit {

  currentObject: DrObject = null;

  private _mouseDown = false;
  private _mouseDownLocation: DrPoint = null;

  constructor(private _dataService: DataStoreService) { }

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
              this.createRect(evt);
              break;
            case EditorToolType.ELLIPSE_TOOL:
              this.createEllipse(evt);
              break;
          }
        }
        else {
          switch(this._dataService.selectedTool) {
            case EditorToolType.IMAGE_TOOL:
            case EditorToolType.TEXT_TOOL:
            case EditorToolType.RECTANGLE_TOOL:
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
          case EditorToolType.RECTANGLE_TOOL: {
            Object.assign(this.currentObject, {
              x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
              y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
              width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
              height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
            });

            let r: DrRect = this.currentObject as DrRect;
            switch(this._dataService.selectedTool) {
                case EditorToolType.IMAGE_TOOL: {
                  this._dataService.addObject(createDrImage({
                    id: this.getNextId(),
                    x: r.x,
                    y: r.y,
                    width: r.width,
                    height: r.height,
                    url: "/assets/pexels-photo-705792.jpeg"
                   }));
                   
                }
                break;
                case EditorToolType.TEXT_TOOL: {
                  this._dataService.addObject(createDrText({
                    id: this.getNextId(),
                    x: r.x,
                    y: r.y,
                    width: r.width,
                    height: r.height,
                    text: "Billy Shivers"
                   }));
                   
                }
                break;
                case EditorToolType.RECTANGLE_TOOL: {

                  this._dataService.addObject(createDrRect({
                    id: this.getNextId(),
                    x: r.x,
                    y: r.y,
                    width: r.width,
                    height: r.height
                   }));
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
              this._dataService.addObject(createDrEllipse({
                id: this.getNextId(),
                x: r.x,
                y: r.y,
                rx: r.rx,
                ry: r.ry
               }));
            }
            break;
        }
        
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

  private createRect(evt): void {
    this.currentObject = createDrRect({
      id: 1000000,
      showFill: true,
      showStroke: true,
      fill: 'rgba(255,0,0,0.3)',
      stroke: 'red',
      x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
      y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
      width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
      height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
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
