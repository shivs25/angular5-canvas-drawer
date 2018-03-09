import { Component, OnInit } from '@angular/core';
import { DrText } from '../../models/dr-text';

@Component({
  selector: 'app-text-edit-tool',
  templateUrl: './text-edit-tool.component.html',
  styleUrls: ['./text-edit-tool.component.scss']
})
export class TextEditToolComponent implements OnInit {

  currentObject: DrText;

  constructor() { }

  ngOnInit() {
  }

}
