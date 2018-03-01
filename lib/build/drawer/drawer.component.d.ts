import { OnInit, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { DrObject } from '../models/dr-object';
import { DrRect } from '../models/dr-rect';
import { DataStoreService } from '../services/data-store.service';
export declare class DrawerComponent implements OnInit {
    private _dataService;
    private _componentFactoryResolver;
    elementState: any;
    clickedObject: EventEmitter<DrObject>;
    t: DrRect;
    constructor(_dataService: DataStoreService, _componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    elements: DrObject[];
    onClick(data: DrObject): void;
}
