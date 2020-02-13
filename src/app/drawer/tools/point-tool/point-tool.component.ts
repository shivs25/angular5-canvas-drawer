import { Component, OnInit, Input } from '@angular/core';
import { DataStoreService } from '../../services/data-store.service';
import { Observable } from 'rxjs';
import { DrEllipse, createDrEllipse } from '../../models/dr-ellipse';
import { createDrStyle, DrStyle } from '../../models/dr-style';
import { DrPointCircle, createDrPointCircle } from '../../models/dr-point-circle';



const DOUBLE_CLICK_TIME: number = 100;
@Component({
  selector: 'app-point-tool',
  templateUrl: './point-tool.component.html',
  styleUrls: ['./point-tool.component.scss']
})
export class PointToolComponent implements OnInit {
  @Input()
  public pointStyle: DrStyle = null;

  private _delay: any;
  constructor(private _dataService: DataStoreService) { }

  ngOnInit() { }


  onBackgroundClick(evt): void {
    let x: number = evt.offsetX;
    let y: number = evt.offsetY;
    evt.stopPropagation();
    evt.preventDefault();
    if (this._delay) {//Don't add points on double click
      if (this._delay) { //clean up observable
        this._delay.unsubscribe();
        this._delay = null;
      }
    } else {
      this._delay = Observable.of(null).delay(DOUBLE_CLICK_TIME).subscribe(() => {
        this.createPoint(x, y);
      });
    }
  }

  private createPoint(x: number, y: number): void {
    if (this._delay) { //clean up observable
      this._delay.unsubscribe();
      this._delay = null;
    }
    let circle: DrPointCircle;
    if(this.pointStyle) {
      circle = createDrPointCircle({ x: x, y: y, rx: 5, ry: 5, ...this.pointStyle });
    } else {
      circle = createDrPointCircle({ x: x, y: y, rx: 5, ry: 5 });
    }
    this._dataService.addObjects([circle]);
    if(this.pointStyle){
      this._dataService.setStyles([circle], this.pointStyle)
    }
    this._dataService.selectObjects([circle]);
  }
}
