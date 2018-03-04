import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrObject } from '../../models/dr-object';
import { MouseEventData } from '../../models/mouse-event-data';

@Component({
  selector: 'app-dr-grouped-object',
  templateUrl: './dr-grouped-object.component.html',
  styleUrls: ['./dr-grouped-object.component.scss']
})
export class DrGroupedObjectComponent extends DrObjectComponent {


  onChildMouseDown(data:MouseEventData): void {
    this.mouseDown.emit(Object.assign(data, { data: this.data }));

  }

  onChildMouseMove(data:MouseEventData): void {
    this.mouseMove.emit(Object.assign(data, { data: this.data }));
  }

  onChildMouseUp(data:MouseEventData): void {
    this.mouseUp.emit(Object.assign(data, { data: this.data }));
  }
}
