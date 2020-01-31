import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { DrObject } from '../../models/dr-object';
import { select } from '@angular-redux/store';
import { MouseEventData } from '../../models/mouse-event-data';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';
import { BoundingBox } from '../../models/bounding-box';

@Component({
  selector: 'app-dr-object',
  templateUrl: './dr-object.component.html',
  styleUrls: ['./dr-object.component.scss']
})
export class DrObjectComponent implements OnInit {

  @ViewChild('elementTemplate', { static: true })
  public elementTemplate: TemplateRef<any>;

  @Input()
  public data: DrObject;

  @Input()
  public overrideProperties: any = null;

  @Input()
  public hoverClass: string = 'pointer';

  @Input()
  public canInteract: boolean = true;

  @Input()
  public elementId: any;

  public visualData: DrObject;

  @Output()
  public click: EventEmitter<DrObject> = new EventEmitter<DrObject>();

  @Output()
  public mouseDown: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();

  @Output()
  public mouseMove: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();

  @Output()
  public mouseUp: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();


  getRotationCenterX(): number {
    let b: BoundingBox = this._objectHelperService.getBoundingBox([this.data]);
    return  b.x + b.width / 2;
  }

  getRotationCenterY(): number {
    let b: BoundingBox = this._objectHelperService.getBoundingBox([this.data]);
    return  b.y + b.height / 2;
  }

  onClick(evt: any, data:DrObject): void {
    evt.stopPropagation();
    evt.preventDefault();

    this.click.emit(data);
  }


  onMouseDown(evt: any, data:DrObject): void {
    evt.stopPropagation();
    evt.preventDefault();
    
    this.mouseDown.emit({ 
      location: { 
        x: evt.clientX, y: evt.clientY 
      }, 
      data: data,
      shiftKey: evt.shiftKey,
      ctrlKey: evt.ctrlKey,
      altKey: evt.altKey
    });
  }

  onMouseMove(evt: any, data:DrObject): void {
    evt.stopPropagation();
    evt.preventDefault();

    this.mouseMove.emit({ 
      location: { 
        x: evt.clientX, y: evt.clientY
      }, 
      data: data,
      shiftKey: evt.shiftKey,
      ctrlKey: evt.ctrlKey,
      altKey: evt.altKey
    });
  }

  onMouseUp(evt: any, data:DrObject): void {
    evt.stopPropagation();
    evt.preventDefault();

    this.mouseUp.emit({ 
      location: { 
        x: evt.clientX, y: evt.clientY 
      }, 
      data: data,
      shiftKey: evt.shiftKey,
      ctrlKey: evt.ctrlKey,
      altKey: evt.altKey
    });
  }

  constructor(
    protected _objectHelperService: DrawerObjectHelperService) { }

  ngOnInit() {
  }

}
