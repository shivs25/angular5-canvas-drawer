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

  onClick(data:DrObject): void {
    if (data.clickable) {
      this.click.emit(data);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
