import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { DrObject } from '../../models/dr-object';

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

  @Output()
  public clickedItem: EventEmitter<DrObject> = new EventEmitter<DrObject>();

  onClick(data:DrObject): void {
    if (data.clickable) {
      this.clickedItem.emit(data);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
