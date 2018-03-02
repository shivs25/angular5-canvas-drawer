import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { DrObject } from '../../models/dr-object';
import { select } from '@angular-redux/store';
import { MouseEventData } from '../../models/mouse-event-data';

@Component({
  selector: 'app-dr-object',
  templateUrl: './dr-object.component.html',
  styleUrls: ['./dr-object.component.scss']
})
export class DrObjectComponent implements OnInit {

  @ViewChild('elementTemplate')
  public elementTemplate: TemplateRef<any>;

  @Input()
  public data: DrObject;

  @Input()
  public visualData: DrObject;

  @Input()
  public hoverClass: string;

  //@select()
  @Output()
  public click: EventEmitter<DrObject> = new EventEmitter<DrObject>();

  @Output()
  public mouseDown: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();

  @Output()
  public mouseMove: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();


  @Output()
  public mouseUp: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();


  onClick(evt: any, data:DrObject): void {
    evt.stopPropagation();
    this.click.emit(data);
  }

  onMouseDown(evt: any, data:DrObject): void {
    evt.stopPropagation();
    this.mouseDown.emit({ location: { x: evt.clientX, y: evt.clientY }, data: data });
  }

  onMouseMove(evt: any, data:DrObject): void {
    evt.stopPropagation();
    this.mouseMove.emit({ location: { x: evt.clientX, y: evt.clientY }, data: data });
  }

  onMouseUp(evt: any, data:DrObject): void {
    evt.stopPropagation();
    this.mouseUp.emit({ location: { x: evt.clientX, y: evt.clientY }, data: data });
  }

  constructor() { }

  ngOnInit() {
  }

}
