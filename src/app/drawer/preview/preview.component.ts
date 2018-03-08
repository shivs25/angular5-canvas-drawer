import { Component, OnInit, Input } from '@angular/core';
import { select } from '@angular-redux/store';
import { IEditingState } from '../store';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @select()
  editingState: IEditingState;
  
  @Input()
  hoverClass: any = '';

  @Input()
  overrideProperties: any = null;

  constructor() { }

  ngOnInit() {
  }

}
