import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { DrObject } from '../../models/dr-object';
import { select } from '@angular-redux/store';

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

  //@select()
  @Output()
  public click: EventEmitter<DrObject> = new EventEmitter<DrObject>();

  @Output()
  public mouseDown: EventEmitter<DrObject> = new EventEmitter<DrObject>();

  @Output()
  public mouseMove: EventEmitter<DrObject> = new EventEmitter<DrObject>();


  @Output()
  public mouseUp: EventEmitter<DrObject> = new EventEmitter<DrObject>();


  onClick(evt: any, data:DrObject): void {
    evt.stopPropagation();
    this.click.emit( data);
  }

  onMouseDown(evt: any, data:DrObject): void {
    evt.stopPropagation();
    console.log(evt);
    this.mouseDown.emit(data);
  }

  onMouseMove(evt: any, data:DrObject): void {
    evt.stopPropagation();
    this.mouseMove.emit(data);
  }

  onMouseUp(evt: any, data:DrObject): void {
    evt.stopPropagation();
    this.mouseUp.emit(data);
  }

  constructor() { }

  ngOnInit() {
  }

}
