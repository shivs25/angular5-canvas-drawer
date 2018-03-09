import { Component, OnInit } from '@angular/core';
import { DrText } from '../../models/dr-text';

@Component({
  selector: 'app-text-edit-tool',
  template: "\n    <div class=\"absolute-position fill-parent\">\n    \n      <svg\n            [ngClass]=\"'text'\"\n            class=\"absolute-position fill-parent\" xmlns=\"http://www.w3.org/2000/svg\">\n          <ng-container *ngIf=\"currentObject\" dynamic-svg [componentData]=\"currentObject\" [canInteract]=\"false\" elementId=\"1000000\">\n          </ng-container>\n      </svg>\n    </div>\n  ",
  styles: ["\n\n  "]
})
export class TextEditToolComponent implements OnInit {

  currentObject: DrText;

  constructor() { }

  ngOnInit() {
  }

}
