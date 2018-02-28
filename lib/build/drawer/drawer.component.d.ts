import { OnInit, ElementRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { DrObject } from '../models/dr-object';
import { DrRect } from '../models/dr-rect';
import { NgRedux } from '@angular-redux/store';
import { IDrawerAppState } from '../store';
export declare class DrawerComponent implements OnInit {
    private ngRedux;
    private _componentFactoryResolver;
    container: ElementRef;
    items: any;
    widthValue: string;
    heightValue: string;
    viewBoxWidthValue: string;
    viewBoxHeightValue: string;
    viewBoxYValue: string;
    viewBoxXValue: string;
    preserveAspectRatioValue: string;
    clickedObject: EventEmitter<DrObject>;
    t: DrRect;
    constructor(ngRedux: NgRedux<IDrawerAppState>, _componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    elements: DrObject[];
    onClick(data: DrObject): void;
    getViewBoxValues(): string;
    private isNullOrEmpty(s);
}
